// const express = require('express')
// const router = express.Router()
// const fs = require("fs")

// // zadanie na 3.0, na razie tylko json 
// const categories = JSON.parse(fs.readFileSync("./routes/categories.json"))



// // zwraca wszystkie kategorie
// router.get('/', (req, res) => {
//   res.send(categories)
// })


// // zwraca jedna kategorie
// router.get("/:id", (req, res) => {
//     const id = req.params.id

//     const category = categories.find(p => p.id == id)

//     if (!category) {
//         return res.status(404).send("Brak takiej kategorii")
//     }

//     res.send(category)
// })


// // update jednej kategorii
// router.put("/:id", (req, res) => {
//     const id = parseInt(req.params.id)

//     const index = categories.findIndex(p => p.id === id)

//     if (index === -1) {
//         return res.status(404).send("Brak takiego produktu")
//     }

//     const { name } = req.body

//     if (name === undefined) {
//         return res.status(400).send("Brak wymaganych pol")
//     }

//     categories[index] = { id, name}

   
//     fs.writeFileSync("./routes/categories.json", JSON.stringify(categories, null, 2))

//     res.send("Udalo sie zaktualizowac kategorie")
// })


// // dodanie kategorii 
// router.post("/", (req, res) => {

//     const {  name} = req.body

//     if (name === undefined) {
//         return res.status(400).send("Brak wymaganych pol")
//     }

//     const newCat = {
//         id: categories.length ? categories[categories.length - 1].id + 1 : 1,     // gdyby było zero kategorii
//         name,
//     }

//     categories.push(newCat)
//     fs.writeFileSync("./routes/categories.json", JSON.stringify(categories, null, 2))

//     res.status(201).send("Udalo sie dodac kategorie")
// })


// // bez implentacji delete zeby nie było sytaucji w ktorej usuwamy kategorie, a jest jeszcze produkt z danej kategorii
// router.delete("/", (req, res) => {
//     res.send("Brak implentacji metody DELETE")
// })

//  module.exports = router