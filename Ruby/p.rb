require 'nokogiri'
require 'net/http'
require 'uri'
require 'zlib'
require 'stringio'
require 'sequel'

class Crawler
  USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  ]

  def initialize(*keywords)
    @keywords = keywords
    @url = "https://www.amazon.pl/s?k=#{URI.encode_www_form_component(keywords.join(' '))}"
  end

  def run
    setup_db 
    puts "Pobieram #{@keywords}:\n"
    products = scrape
    print_products(products)
    print_links(products)
    save_products(products)
  end

  private

  def setup_db
    @db = Sequel.connect('sqlite://products.db')

    @db.create_table?(:products) do
      primary_key :id
      String  :title
      String  :price
      String  :rating
      String  :reviews
      String  :description, text: true
      String  :url
      String  :tech_details, text: true 
    end
  end


  def scrape
    doc = fetch_page(@url)
    return [] if doc.nil?
    parse(doc)
  end

  def fetch_page(url)
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(uri.request_uri)
    request["User-Agent"]                = USER_AGENTS.sample
    request["Accept"]                    = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    request["Accept-Language"]           = "pl-PL,pl;q=0.9,en-US;q=0.8"
    request["Accept-Encoding"]           = "gzip, deflate"
    request["Connection"]                = "keep-alive"
    request["Upgrade-Insecure-Requests"] = "1"
    request["Referer"]                   = "https://www.google.com/"

    response = http.request(request)
    body = response.body
    body = Zlib::GzipReader.new(StringIO.new(body)).read if response["content-encoding"] == "gzip"

    Nokogiri::HTML(body)
    rescue => e
        puts "Błąd pobierania: #{e.message}"
        nil
    end

  def parse(doc)
    doc.css("div[data-component-type='s-search-result']").first(5).filter_map do |item|
      title       = item.css("h2 span").text.strip
      price_whole = item.css("span.a-price-whole").first&.text&.gsub(/[^\d]/, "")
      price_frac  = item.css("span.a-price-fraction").first&.text&.strip
      asin        = item["data-asin"]

      next if title.empty? || asin.nil?

      product_url = "https://www.amazon.pl/dp/#{asin}"
      sleep rand(1..3)
      details = fetch_product_details(product_url)



      {
        title:        title,
        price:        price_whole ? "#{price_whole},#{price_frac || '00'} PLN" : "brak ceny",
        url:          product_url,
        description:  details[:description],
        rating:       details[:rating],
        reviews:      details[:reviews],
        tech_details: details[:tech_details]
      }
    end
  end


  def fetch_product_details(url)
    doc = fetch_page(url)
    return { description: "brak", rating: "brak", reviews: "brak", tech_details: {} } if doc.nil?

    description  = find_description(doc)
    rating       = find_rating(doc)
    reviews      = find_reviews(doc)
    tech_details = find_all_details(doc)

    {
      description:  description,
      rating:       rating,
      reviews:      reviews,
      tech_details: tech_details
    }
  end


  def find_description(doc)
    doc.css("script, style, nav, header, footer").each(&:remove)

    candidates = doc.css("p, div, span").map(&:text).map(&:strip)
    candidates.select! { |t| t.length > 100 && t.length < 2000 }
    candidates.reject! { |t| t.match?(/cookie|regulamin|polityka|javascript/i) }

    candidates.first || "brak opisu"
  end



  def find_rating(doc)
    doc.text.match(/(\d[,\.]\d)\s*z\s*5/)&.captures&.first ||
      doc.text.match(/(\d[,\.]\d)\s*out of\s*5/)&.captures&.first ||
      "brak"
  end


  def find_reviews(doc)
    doc.text.match(/\((\d[\d\s,\.]+)\s*(ocen|ratings?|recenzji)\)/i)&.captures&.first || "brak"
  end


  def find_all_details(doc)
    details = {}

    # para klucz-wartość w tabelach
    doc.css("table tr").each do |row|
      cells = row.css("th, td").map(&:text).map { |t| t.strip.gsub(/\s+/, " ") }
      next if cells.size < 2
      key, value = cells[0], cells[1]
      next if key.empty? || value.empty? || key.length > 60
      details[key] = value
    end


    #  para klucz-wartość w listach
    doc.css("li, span, div").each do |el|
      text = el.text.strip.gsub(/\s+/, " ")
      next unless text.match?(/\A[^:]{3,40}:\s*.{1,100}\z/)
      key, value = text.split(":", 2).map(&:strip)
      next if value.empty? || key.match?(/https?/i)
      details[key] = value
    end

    details
  end

  def save_products(products)
    products.each do |p|
      @db[:products].insert(
        title:        p[:title],
        price:        p[:price],
        rating:       p[:rating],
        reviews:      p[:reviews],
        description:  p[:description],
        url:          p[:url],
        tech_details: p[:tech_details].to_s
      )
    end
    puts "\n Zapisano #{products.size} produktów do products.db"
  end



  def print_products(products)
    if products.empty?
      puts "Brak wyników"
      return
    end

    puts "=" * 60
    puts "Znaleziono #{products.size} produktów:"
    puts "=" * 60

    products.each_with_index do |p, i|
      puts "\n#{i + 1}. #{p[:title]}"
      puts "Cena: #{p[:price]}"
      puts "Ocena: #{p[:rating]}"
      puts "Recenzje: #{p[:reviews]}"
      puts "Opis: #{p[:description]&.slice(0, 150)}..."
      unless p[:tech_details]&.empty?
        puts "Szczegóły:"
        p[:tech_details].first(5).each { |k, v| puts "      #{k}: #{v}" }
      end
      puts "URL: #{p[:url]}"
    end
  end

def print_links(products)
  return if products.empty?

  puts "\n" + "=" * 60
  puts "Linki do produktów:"
  puts "=" * 60

  products.each_with_index do |p, i|
    puts "#{i + 1}. #{p[:url]}"
  end
end

end

Crawler.new(*ARGV).run