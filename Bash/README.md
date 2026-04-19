## Uruchomienie programu – tryby pracy

- `bash main.sh`  
  Zwykła gra turowa pomiędzy użytkownikami

- `bash main.sh --computer`  
  Gra z komputerem

- `bash main.sh --load`  
  Wczytanie zapisanej gry


</br>

## Zapisywanie i wczytywanie gry

W trakcie gry, podczas wykonywania ruchu, można wpisać komendę `save`.  
Spowoduje to zapisanie stanu gry do pliku `game.txt`.

Zapisaną grę można później wczytać za pomocą flagi `--load`.  
Działa to zarówno dla gry z komputerem, jak i między użytkownikami.


## Plansza
Ruch polega na wpisaniu numeru od 0 - 8, zgodnie z planszą:
</br>
0 | 1 | 2   </br>
3 | 4 | 5   </br>
6 | 7 | 8