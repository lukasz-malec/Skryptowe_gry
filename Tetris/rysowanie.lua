local Rysowanie = {}


-- pomocnicza funkcja wyswietla siakte kwadratow na planszy
function Rysowanie.siatka()
    love.graphics.setColor(1, 1, 1, 1)

    local y = 50
    for i = 1, 9 do
        love.graphics.line(0, y, 400, y)
        y = y + 50
    end

    local x = 50
    for i = 1, 7 do
        love.graphics.line(x, 0, x, 500)
        x = x + 50
    end
end


-- rysuje ksztalt figury
function Rysowanie.figura(fig, gx, gy, kolor)
    love.graphics.setColor(kolor[1], kolor[2], kolor[3], 1)

    for i = 1, #fig do
        local blok = fig[i]
        local px = (gx + blok[1]) * 50
        local py = (gy + blok[2]) * 50
        love.graphics.rectangle("fill", px, py, 50, 50)
    end


end


function Rysowanie.plansza(plan)

    for row = 1, 10 do
        for col = 1, 8 do
            local kolor = plan[row][col]
            if kolor ~= 0 then
                love.graphics.setColor(kolor[1], kolor[2], kolor[3], 1)
                love.graphics.rectangle("fill", (col-1)*50, (row-1)*50, 50, 50)
            end
        end
    end

end


function Rysowanie.gameover(score)

    love.graphics.setColor(0, 0, 0, 0.7)
    love.graphics.rectangle("fill", 0, 200, 400, 100)
    love.graphics.setColor(1, 0.2, 0.2)
    love.graphics.print("GAME OVER", 150, 230)


    love.graphics.setColor(1, 1, 1)
    love.graphics.print("Wynik: " .. score, 160, 250)
    love.graphics.print("R = restart", 155, 270)
end


function Rysowanie.menu()
    love.graphics.setColor(1, 1, 1, 1)
    love.graphics.print("TETRIS", 170, 150)
    love.graphics.print("T = nowa gra", 150, 220)
    love.graphics.print("L = wczytaj zapis", 140, 250)
end


return Rysowanie