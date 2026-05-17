local Plansza = {}

-- plansza = {
--     {0,0,0,0,0,0,0,0},
--     {0,0,0,0,0,0,0,0},
--     {0,0,0,0,0,0,0,0},
--     {0,0,0,0,0,0,0,0},
--     {0,0,0,0,0,0,0,0},
--     {0,0,0,0,0,0,0,0},
--     {0,0,0,0,0,0,0,0},
--     {0,0,0,0,0,0,0,0},
--     {0,0,0,0,0,0,0,0},
--     {0,0,0,0,0,0,0,0},
-- }

function Plansza.nowa()
    local m = {}
    for i = 1, 10 do
        m[i] = {0,0,0,0,0,0,0,0}
    end
    return m
end


-- pomocnicza funckaj dla narysuj
local function fun(plansza, col, row)

    if col < 1 or col > 8 then
         return false
    end

    if row > 10 then
        return false
    end

    if row >= 1 and plansza[row][col] ~= 0 then
        return false
    end

    return true
end


function Plansza.narysuj(plansza, figura, px, py)

    for i = 1, #figura do
        local blok = figura[i]
        local col = px + blok[1] + 1
        local row = py + blok[2] + 1

        if not fun( plansza, col, row) then
            return false
        end
    end

    return true
end


-- wpisujeym kolor w komorce
function Plansza.zapisz(plansa, figura, gx, gy, kolor)
    for i = 1, #figura do
        local blok = figura[i]
        local row = gy + blok[2] + 1
        local col = gx + blok[1] + 1
        plansa[row][col] = kolor
    end
end



-- usuwamy rzad w ktorym są zapelnione komorki
function Plansza.usunRzad(matrix, score)
    local row = 10
    while row >= 1 do
        local full = true
        
        -- jest pusty 
        for col = 1, 8 do
            if matrix[row][col] == 0 then
                full = false
                break
            end
        end

        if full then
            table.remove(matrix, row)
            table.insert(matrix, 1, {0,0,0,0,0,0,0,0})
            score = score + 100
        else
            row = row - 1
        end
    end


    return score
end

return Plansza