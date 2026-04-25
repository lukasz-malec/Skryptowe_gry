const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const productsRouter = require("./routes/products")
const categoriesRouter = require("./routes/categories")

app.use("/products", productsRouter)
app.use("/category", categoriesRouter)


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})