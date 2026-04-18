# !bin/bash

board=("not" "not" "not" "not" "not" "not" "not" "not" "not")
playersMoves=("" "" "" "" "" "" "" "" "")
player=1
text="x"
gameOver=0
round=0


source handler.sh
source draw.sh


game_loop(){
    gameOver=0

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
