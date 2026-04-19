#!/bin/bash

source handler.sh
source draw.sh

init_game() {
    board=("not" "not" "not" "not" "not" "not" "not" "not" "not")
    playersMoves=("" "" "" "" "" "" "" "" "")
    player=1
    text="x"
    gameOver=0
    round=0
    computer=0
}

# opcja odczytania poprzedniej gry niezaleznie czy komputer czy nie
if [[ "$1" == "--load" ]]; then
    source game.txt
else
    init_game
fi

# opcja gry z komputerem
if [[ "$1" == "--computer" ]]; then
    computer=1
fi

game_loop(){
    echo "Tic-tac-toe game"
   
        
   while [[ "$round" -lt 9 && "$gameOver" -eq 0 ]]; do
        draw_board
        handle_input
        check_if_won
        round=$((round+1))
    done

    draw_board

    if [[ "$gameOver" -eq 1 ]]; then
        echo "Game over!"
    else
        echo "Draw"
    fi
}


game_loop
