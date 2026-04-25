const express = require('express')
const router = express.Router()
const fs = require("fs")

// zadanie na 3.0, na razie tylko json 
const products = JSON.parse(fs.readFileSync("./routes/products.json"))


// zwraca wszystkie produkty oraz filtruje po kategoriach
// np /products?category=2 
router.get("/", (req, res) => {
    const { category } = req.query

    let result = products

    // jezeli jest kategoria
    if (category) {
        const catId = Number(category)

        result = products.filter(p =>p.category_ids.includes(catId))
    }
    res.send(result)
})



// jeden produkt
router.get("/:id", (req, res) => {
    const id = req.params.id

    const product = products.find(p => p.id == id)

    if (!product) {
        return res.status(404).send("Brak takiego produktu")
    }

    res.send(product)
})


// update produktu
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id)

    const index = products.findIndex(p => p.id === id)

    if (index === -1) {
        return res.status(404).send("Brak takiego produktu")
    }

    const { name, price, stock, category_ids } = req.body

    if (name === undefined || price === undefined || stock === undefined || category_ids === undefined) {
        return res.status(400).send("Brak wymaganych pol")
    }

    products[index] = {
        id,
        name,
        category_ids,
        price,
        stock
    }

   
    fs.writeFileSync("./routes/products.json", JSON.stringify(products, null, 2))

    res.send("Udalo sie zaktualizowac produkt")
})


// usuniecie produktu
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id)

    const index = products.findIndex(p => p.id === id)

    if (index === -1) {
        return res.status(404).send("Brak takiego produktu")
    }

    const deletedProduct = products[index]

    products.splice(index, 1)

    fs.writeFileSync("./routes/products.json", JSON.stringify(products, null, 2))

    res.send("Udalo sie usunac produkt")
})


// dodanie produktu
router.post("/", (req, res) => {

    const {  name, price, stock, category_ids } = req.body

    if (name === undefined || price === undefined || stock === undefined || category_ids === undefined) {
        return res.status(400).send("Brak wymaganych pol")
    }

    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,     // gdyby było zero produktow
        name,
        category_ids,
        price,
        stock
    }

    products.push(newProduct)
    fs.writeFileSync("./routes/products.json", JSON.stringify(products, null, 2))

    res.status(201).send("Udalo sie dodac produkt")
})


module.exports = router;