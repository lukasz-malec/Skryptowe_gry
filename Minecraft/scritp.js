// pomocnicza funkcja ktora tworzy 100x100 trawy 
player.onChat("podloga", function () {
    blocks.fill(
    GRASS,
    pos(-50, -1, -50),
    pos(49, -1, 49),
    FillOperation.Replace
    )
})


player.onChat("zamek_3.0", function () {
    budujZamek()
})


// funkcja startowa
function budujZamek () {
    budujWieze(0, 10)
    budujWieze(15, 10)
    budujWieze(0, 25)
    budujWieze(15, 25)


    // 4 blok andezyt - sciany pomiedzy wiezami
    blocks.fill(
        POLISHED_ANDESITE,
        pos(3, 0, 11),
        pos(15, 5, 11),
        FillOperation.Replace
    )

    blocks.fill(
        POLISHED_ANDESITE,
        pos(3, 0, 26),
        pos(15, 5, 26),
        FillOperation.Replace
    )

    blocks.fill(
        POLISHED_ANDESITE,
        pos(1, 0, 13),
        pos(1, 5, 25),
        FillOperation.Replace
    )

    blocks.fill(
        POLISHED_ANDESITE,
        pos(16, 0, 13),
        pos(16, 5, 25),
        FillOperation.Replace
    )



    // 5 blok bazalt - blanki na scianach
    for (let x = 3; x <= 15; x += 2) {
        blocks.place(BASALT, pos(x, 6, 11))
    }
    for (let x2 = 3; x2 <= 15; x2 += 2) {
        blocks.place(BASALT, pos(x2, 6, 26))
    }
    for (let z = 13; z <= 25; z += 2) {
        blocks.place(BASALT, pos(1, 6, z))
    }
    for (let z2 = 13; z2 <= 25; z2 += 2) {
        blocks.place(BASALT, pos(16, 6, z2))
    }
}

// minecraft code korzysta z js z statycznym typowaniem z ts
function budujWieze (ox: number, oz: number) {

    // 1 blok kamien - podstawy wiezy
    blocks.fill(
        STONE,
        pos(0 + ox, 0, 0 + oz),
        pos(2 + ox, 5, 2 + oz),
        FillOperation.Replace
    )


    // 2 blok dioryt - gorna czesc wiezy
    blocks.fill(
        POLISHED_DIORITE,
        pos(-1 + ox, 6, -1 + oz),
        pos(3 + ox, 7, 3 + oz),
        FillOperation.Replace
    )


    // 3 blok  stone_brick_monster_egg - blanki na wiezach 
    blocks.place(STONE_BRICK_MONSTER_EGG, pos(-1 + ox, 8, -1 + oz))
    blocks.place(STONE_BRICK_MONSTER_EGG, pos(3 + ox, 8, -1 + oz))
    blocks.place(STONE_BRICK_MONSTER_EGG, pos(-1 + ox, 8, 3 + oz))
    blocks.place(STONE_BRICK_MONSTER_EGG, pos(3 + ox, 8, 3 + oz))
    blocks.place(STONE_BRICK_MONSTER_EGG, pos(1 + ox, 8, -1 + oz))
    blocks.place(STONE_BRICK_MONSTER_EGG, pos(1 + ox, 8, 3 + oz))
    blocks.place(STONE_BRICK_MONSTER_EGG, pos(-1 + ox, 8, 1 + oz))
    blocks.place(STONE_BRICK_MONSTER_EGG, pos(3 + ox, 8, 1 + oz))
}




player.onChat("zamek_3.5", function () {
    budujZamek()
    
    budujOknaWiezy(0, 10)
    budujOknaWiezy(15, 10)
    budujOknaWiezy(0, 25)
    budujOknaWiezy(15, 25)
})



function budujOknaWiezy (ox: number, oz: number) {

    // okno od frontu wieży
    blocks.fill(
        GLASS,
        pos(1 + ox, 2, oz),
        pos(1 + ox, 3, oz),
        FillOperation.Replace
    )
    
    // okno z tyłu wieży
    blocks.fill(
        GLASS,
        pos(1 + ox, 2, 2 + oz),
        pos(1 + ox, 3, 2 + oz),
        FillOperation.Replace
    )

    // okno z lewej strony wieży
    blocks.fill(
        GLASS,
        pos(ox, 2, 1 + oz),
        pos(ox, 3, 1 + oz),
        FillOperation.Replace
    )

    // okno z prawej strony wieży
    blocks.fill(
        GLASS,
        pos(2 + ox, 2, 1 + oz),
        pos(2 + ox, 3, 1 + oz),
        FillOperation.Replace
    )
}