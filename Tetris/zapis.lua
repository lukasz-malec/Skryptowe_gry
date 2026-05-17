local Zapis = {}

function Zapis.zapisz(plansza, score, gx, gy)
    local data = {}

    table.insert(data, score)
    table.insert(data, gx)
    table.insert(data, gy)

    for row = 1, 10 do
        for col = 1, 8 do
            local kolor = plansza[row][col]
            if kolor ~= 0 then
                table.insert(data, row..","..col..","..kolor[1]..","..kolor[2]..","..kolor[3])
            else
                table.insert(data, row..","..col..",0,0,0")
            end
        end
    end

    love.filesystem.write("zapis.txt", table.concat(data, "\n"))
    print("Zapisano!")
end



function Zapis.wczytaj(plansza)
    if not love.filesystem.getInfo("zapis.txt") then
        print("Brak zapisu")
        return false
    end


    local lines = {}
    for line in love.filesystem.lines("zapis.txt") do
        table.insert(lines, line)
    end



    local score = tonumber(lines[1])
    local gx = tonumber(lines[2])
    local gy = tonumber(lines[3])

    for i = 4, #lines do
        local row, col, r, g, b = lines[i]:match("(%d+),(%d+),([%d.]+),([%d.]+),([%d.]+)")

        row = tonumber(row)
        col = tonumber(col)
        r = tonumber(r) 
        g = tonumber(g)
        b = tonumber(b)

        
        if r == 0 and g == 0 and b == 0 then
            plansza[row][col] = 0
        else
            plansza[row][col] = {r, g, b}
        end
    end

    return score, gx, gy
end

return Zapis