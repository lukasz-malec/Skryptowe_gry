import requests
import json

with open("config.json", "r", encoding="utf-8") as f:
    config = json.load(f)



menu_tekst = "\n".join(
    f"- {danie['nazwa']} - {danie['cena']}zł" 
    for danie in config["menu"]
)

SYSTEM_PROMPT = f"""Jesteś asystentem restauracji. 
Mówisz WYŁĄCZNIE po polsku. Nigdy nie używasz angielskiego.
Odpowiedzi są krótkie i konkretne.

ZASADY:
1. NIE wymyślaj żadnych dań spoza poniższego menu
2. NIE dodawaj własnych opisów do dań
3. Używaj DOKŁADNIE tych nazw i cen które są poniżej

MENU (tylko te dania istnieją, żadnych innych):
{menu_tekst}

GODZINY OTWARCIA: {config['godziny_otwarcia']}

INSTRUKCJE:
- Powitanie: odpowiedz TYLKO "Witaj w restauracji! W czym mogę pomóc?" i nic więcej
- Pytanie o menu: odpowiedz TYLKO listą dań z cenami, bez żadnych dodatkowych komentarzy:
- Klient chce zamówić ale nie powiedział co: zapytaj "Co chciałbyś zamówić? Oto nasze menu:" i wylistuj dania
- Zamówienie konkretnego dania: odpowiedz "Przyjąłem zamówienie: [nazwa dania] - [cena]zł. Dziękujemy!" i nic więcej nie dodawaj
- Inne tematy: TYLKO gdy klient pyta o rzeczy niezwiązane z restauracją (np. polityka, pogoda) odpowiedz: "Przepraszam, mogę pomóc tylko w kwestiach restauracji"
"""

historia = [{"role": "system", "content": SYSTEM_PROMPT}]

def wyslij_wiadomosc(wiadomosc):
    historia.append({"role": "user", "content": wiadomosc})
    
  
    wiadomosci = [historia[0]] + historia[-20:]
    
    try:
        response = requests.post("http://localhost:11434/api/chat", json={
            "model": "llama3.2:1b",   
            "messages": wiadomosci,
            "stream": False
        })
        odpowiedz = response.json()["message"]["content"]
    except Exception as e:
        historia.pop()
        return f"Błąd połączenia z modelem: {e}"
    
    historia.append({"role": "assistant", "content": odpowiedz})
    return odpowiedz



print("Asystent restauracyjny")
print("wpisz 'quit' aby wyjść")


while True:
    wiadomosc = input("Ty: ")
    if wiadomosc.lower() == "quit":
        break
    odpowiedz = wyslij_wiadomosc(wiadomosc)
    print(f"Bot: {odpowiedz}\n")