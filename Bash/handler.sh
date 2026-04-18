#!/bin/bash
handle_input() {

    if (( round % 2 == 0 )); then
        text="x"
        player=1
    else
        text="o"
        player=2
    fi

    # walidacja danych 
    while true; do
        read -p "Player ${player} move (0-8): " move


        if [[ "$move" == "save" ]]; then
            save_game
            exit 0         # konczymy program
        fi
        
        # czy poprawna liczba
        if ! [[ "$move" =~ ^[0-8]$ ]]; then
            echo "Enter the number between 0-8"
            continue
        fi

        # czy pole wolne
        if [[ "${board[move]}" == "taken" ]]; then
            echo "It's taken"
            continue
        fi

        break
    done


    board[move]="taken"
    playersMoves[move]="$text"

    if [[ $player -eq 1 ]]; then
        player=2
    else
        player=1
    fi
}


check_if_won(){
    #  -n string nie jest pusty,

    # 1 row
    if [[   -n "${playersMoves[0]}" &&
            "${playersMoves[0]}" == "${playersMoves[1]}" &&
            "${playersMoves[0]}" == "${playersMoves[2]}" ]]; then
        gameOver=1
    fi

    # 2 row
    if [[   -n "${playersMoves[3]}" &&
            "${playersMoves[3]}" == "${playersMoves[4]}" &&
            "${playersMoves[3]}" == "${playersMoves[5]}" ]]; then
        gameOver=1
    fi

    # 3 row
     if [[   -n "${playersMoves[6]}" &&
            "${playersMoves[6]}" == "${playersMoves[7]}" &&
            "${playersMoves[6]}" == "${playersMoves[8]}" ]]; then
        gameOver=1
    fi

    # 1 column
     if [[   -n "${playersMoves[0]}" &&
            "${playersMoves[0]}" == "${playersMoves[3]}" &&
            "${playersMoves[0]}" == "${playersMoves[6]}" ]]; then
        gameOver=1
    fi

     # 2 column
     if [[   -n "${playersMoves[1]}" &&
            "${playersMoves[1]}" == "${playersMoves[4]}" &&
            "${playersMoves[1]}" == "${playersMoves[7]}" ]]; then
        gameOver=1
    fi

     # 3 column
     if [[   -n "${playersMoves[2]}" &&
            "${playersMoves[2]}" == "${playersMoves[5]}" &&
            "${playersMoves[2]}" == "${playersMoves[8]}" ]]; then
        gameOver=1
    fi

     # 1 diagonal
     if [[   -n "${playersMoves[0]}" &&
            "${playersMoves[0]}" == "${playersMoves[4]}" &&
            "${playersMoves[0]}" == "${playersMoves[8]}" ]]; then
        gameOver=1
    fi

     # 2 diagonal
     if [[   -n "${playersMoves[2]}" &&
            "${playersMoves[2]}" == "${playersMoves[4]}" &&
            "${playersMoves[2]}" == "${playersMoves[6]}" ]]; then
        gameOver=1
    fi    


}

save_game() {
    # wyczysci/stworzy game.txt
    > game.txt
    declare -p board playersMoves player text gameOver round >> game.txt  # dopisanie do game.txt
}
