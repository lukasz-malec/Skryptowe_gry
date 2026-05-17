local Plansza = require("plansza")
local Figura = require("figura")
local Rysowanie = require("rysowanie")


function love.load()

    G_plansza = Plansza.nowa()
    G_counter = 0 
    G_gameover = false
    G_score = 0
    G_piece, G_color = Figura.spawn()

    -- punkt startowy respawnu figur, 3 kolumna u gory
    G_x = 3
    G_y = 0
end


function love.update(dt)
    if G_gameover then
        return
    end

    -- G_counter reguluje szybkosc spadania figur
    if G_counter == 60 then
        G_counter = 0

        if Plansza.narysuj(G_plansza, G_piece, G_x, G_y + 1) then
            G_y = G_y + 1
        else
            Plansza.zapisz(G_plansza, G_piece, G_x, G_y, G_color)
            G_score = Plansza.usunRzad(G_plansza, G_score)
            G_piece, G_color = Figura.spawn()
            G_x = 3
            G_y = 0

            if not Plansza.narysuj(G_plansza, G_piece, G_x, G_y) then
                G_gameover = true
            end
        end

    else
        G_counter = G_counter + 1
    end
end


function love.draw()
    Rysowanie.siatka()
    Rysowanie.plansza(G_plansza)
    Rysowanie.figura(G_piece, G_x, G_y, G_color)

    love.graphics.setColor(1, 1, 1, 1)
    love.graphics.print("Wynik: " .. G_score, 10, 10)

    if G_gameover then
        Rysowanie.gameover(G_score)
    end
end


function love.keypressed(key)

    if key == "r" and G_gameover then
        love.load()
        return
    end

    if G_gameover then
        return
    end

    if key == "escape" then
        love.event.quit()

    elseif key == "left" then
        if Plansza.narysuj(G_plansza, G_piece, G_x - 1, G_y) then
            G_x = G_x - 1
        end

    elseif key == "right" then
        if Plansza.narysuj(G_plansza, G_piece, G_x + 1, G_y) then
            G_x = G_x + 1
        end

    elseif key == "up" then
        G_piece = Figura.rotate(G_piece, G_plansza, G_x, G_y, Plansza.narysuj)
    
    elseif key == "down" then
        if Plansza.narysuj(G_plansza, G_piece, G_x, G_y + 1) then
            G_y = G_y + 1
        end
    end
end