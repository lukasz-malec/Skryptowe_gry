require 'nokogiri'
require 'net/http'
require 'uri'
require 'zlib'
require 'stringio'


class Crawler
  CATEGORY_URL = "https://www.amazon.pl/s?k=iphone+17"

  USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  ]


  def run
    puts "Pobieram produkty:\n"
    products = scrape
    print_products(products)
  end


  private

  def scrape
    doc = fetch_page(CATEGORY_URL)
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
    doc.css("div[data-component-type='s-search-result']").filter_map do |item|
      title       = item.css("h2 span").text.strip
      price_whole = item.css("span.a-price-whole").first&.text&.gsub(/[^\d]/, "")
      price_frac  = item.css("span.a-price-fraction").first&.text&.strip

      next if title.empty?

      {
        title: title,
        price: price_whole ? "#{price_whole},#{price_frac || '00'} PLN" : "brak ceny"
      }
    end
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
      puts "#{p[:price]}"
    end
  end
end

Crawler.new.run