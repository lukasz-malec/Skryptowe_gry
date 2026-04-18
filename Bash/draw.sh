# !bin/bash

# funkcja rysująca plansze wiersz po wierszu


draw_board(){
    cell=-1
    printf "\n"

    for((i=1; i<=3; i++)); do
        ((cell++))
        if [[ "${board[cell]}" == "taken" ]]; then
            printf "%2s" ${playersMoves[cell]}
        else
            printf "%2s" " "
        fi

            printf "%2s" "|"

        
        ((cell++))
        if [[ "${board[cell]}" == "taken" ]]; then
            printf "%2s" ${playersMoves[cell]}
        else
            printf "%2s" " "
        fi

            printf "%2s" "|"


        ((cell++))
        if [[ "${board[cell]}" == "taken" ]]; then
            printf "%2s" ${playersMoves[cell]}
        else
            printf "%2s" " "
        fi

        printf "\n"
    done
    
    printf "\n"
}