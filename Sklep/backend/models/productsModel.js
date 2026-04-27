const db = require("../data/db")

// zapytania sql dla produktow


const addProduct = (name, price, stock, callback) => {
    db.run(
        "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
        [name, price, stock],
    function (err) {
        if (err) {
            console.error("Błąd dodawania produktu:", err.message)
        if (callback)
            callback(err, null)
        return
        }
        if (callback)
            callback(null, this.lastID)
    }
  )
}

const getAllProducts = (callback) => {
    db.all("SELECT * FROM products", [], callback)
}

const getProductById = (id, callback) => {
    db.get("SELECT * FROM products WHERE id = ?", [id], callback)
}

const deleteProduct = (id, callback) => {
    db.run("DELETE FROM products WHERE id = ?", [id], callback)
}


const updateProduct = (id, name, price, stock, callback) => {
    db.run(
        "UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?",
        [name, price, stock, id],callback
    )
}


module.exports = { addProduct, getAllProducts, getProductById, deleteProduct, updateProduct}