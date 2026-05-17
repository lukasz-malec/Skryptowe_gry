local Figura = {}


-- {1,0} x ,y jedno przesuniecie w prawo od 0,0
-- {1,1} x,y jedno w prawo i jedno w dol od 0,0


local shapes = {
    {{0,0},{1,0},{2,0},{3,0}},  --  pasek poziomy
    {{0,0},{1,0},{0,1},{1,1}},  -- kwadrat
    {{0,0},{1,0},{2,0},{1,1}},  -- ksztal t
    {{0,0},{0,1},{0,2},{1,2}},  -- ksztaly l
}


function Figura.spawn()
    local id = math.random(1, #shapes)
    local figura = {}

    for i = 1, #shapes[id] do
        local blok = shapes[id][i]
        figura[i] = {blok[1], blok[2]}
    end

    local kolor = {math.random(), math.random(), math.random()}
    return figura, kolor
end



-- funkcja sprawdza czy mozna obrócic figurę
function Figura.rotate(figura, matrix, gx, gy, narysuj)
    local rotated = {}

    -- zamiana {x,y} na {-y, x}
    for i = 1, #figura do
        local blok = figura[i]
        rotated[i] = {-blok[2], blok[1]}
    end

    
    local min_x, min_y = 0, 0
    for i = 1, #rotated do
        local blok = rotated[i]
        if blok[1] < min_x then
            min_x = blok[1] end
        
        if blok[2] < min_y then
            min_y = blok[2]
        end
    end

    for i = 1, #rotated do
        local blok = rotated[i]
        blok[1] = blok[1] - min_x
        blok[2] = blok[2] - min_y
    end

    if narysuj(matrix, rotated, gx, gy) then
        return rotated
    end

    return figura
end

return Figura