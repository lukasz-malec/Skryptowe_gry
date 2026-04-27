const { addProduct } = require("../models/productsModel")
const { addCategory, addProductToCategory } = require("../models/categoriesModels")

const products = [
  { id: 1, name: "iPhone 16",         category_ids: [1, 4], price: 4000,  stock: 200 },
  { id: 2, name: "PS5",               category_ids: [1, 3], price: 3200,  stock: 100 },
  { id: 3, name: "Samsung Galaxy A57",category_ids: [1, 4], price: 1999,  stock: 200 },
  { id: 4, name: "Laptop Lenovo",     category_ids: [1, 2], price: 2300,  stock: 50  },
]

const categories = [
  { id: 1, name: "Electronics"     },
  { id: 2, name: "Gaming Laptops"  },
  { id: 3, name: "Gaming"          },
  { id: 4, name: "Smartphones"     },
  { id: 5, name: "TV"              },
]



// dane wziete z json z poprzedniego commita, funckja tylko wypełnia tabele tymi danymi
const initTables = () => {

    categories.forEach(({ name }) => {
        addCategory(name, (err, id) => {
            if (!err)
                console.log(`Kategoria: ${name}, id: ${id}`)
        })
    })

    products.forEach(({ name, price, stock, category_ids }) => {
        addProduct(name, price, stock, (err, product_id) => {
            if (err)
                return

        console.log(`Produkt: ${name}, id: ${product_id}`)

        category_ids.forEach((category_id) => {
            addProductToCategory(product_id, category_id, (err) => {
            if (!err)
                console.log(`  -> przypisano do kategorii ${category_id}`)
        })
      })
    })
  })
}

module.exports = initTables