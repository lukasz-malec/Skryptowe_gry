import requests


SYSTEM_PROMPT = """Jesteś asystentem restauracji. 
Mówisz WYŁĄCZNIE po polsku. Nigdy nie używasz angielskiego.
Odpowiedzi są krótkie i konkretne.

ZASADY:
1. NIE wymyślaj żadnych dań spoza poniższego menu
2. NIE dodawaj własnych opisów do dań
3. Używaj DOKŁADNIE tych nazw i cen które są poniżej

MENU (tylko te dania istnieją, żadnych innych):
- Pizza Margherita - 25zł
- Pizza Capriciosa - 26zł
- Burger Klasyczny - 28zł
- Makaron Carbonara - 28zł

GODZINY OTWARCIA: poniedziałek-niedziela 12:00-20:00

INSTRUKCJE:
- Powitanie: powiedz "Witaj w restauracji! W czym mogę pomóc?"
- Pytanie o menu: wylistuj DOKŁADNIE powyższe dania z cenami
- Klient chce zamówić ale nie powiedział co: zapytaj "Co chciałbyś zamówić? Oto nasze menu:" i wylistuj dania
- Zamówienie konkretnego dania: odpowiedz "Przyjąłem zamówienie: [nazwa dania] - [cena]zł. Dziękujemy!" i nic więcej nie dodawaj
- Inne tematy: odpowiedz: "Przepraszam, ale moją kompetencją jest tylko obsługa gości w naszej restauracji"
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