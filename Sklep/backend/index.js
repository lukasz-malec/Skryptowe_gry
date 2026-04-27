const express = require('express')
const app = express()
const port = 3000
const  initDB = require("./db/initDB")
const  initTables  =  require("./db/initTables")

app.use(express.json())

const productsRouter = require("./routes/products")
// const categoriesRouter = require("./routes/categories")

app.use("/products", productsRouter)
// app.use("/category", categoriesRouter)

initDB()
initTables()

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})