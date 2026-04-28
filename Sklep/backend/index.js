const express = require('express')
const app = express()
const port = 3000
const  initDB = require("./db/initDB")
const  initTables  =  require("./db/initTables")
const cors = require("cors")


app.use(cors({
  origin: "http://localhost:5173"
}))
app.use(express.json())


app.use(express.json())

const productsRouter = require("./routes/products")
const categoriesRouter = require("./routes/categories")

app.use("/products", productsRouter)
app.use("/category", categoriesRouter)

initDB()
initTables()

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})