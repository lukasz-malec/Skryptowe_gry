const db = require("../data/db")

// zapytania sql dla kryteriow
const addCategory = (name, callback) => {
    db.run(
        "INSERT INTO categories (name) VALUES (?)", [name],
    function (err) {
        if (err) {
            console.error("Błąd dodawania kategorii:", err.message)
            if (callback)
                callback(err, null)
            return
        }
        if (callback)
            callback(null, this.lastID)
    }
    )
}


const getAllCategories = (callback) => {
  db.all("SELECT * FROM categories", [], callback)
}


const getCategoryById = (id, callback) => {
  db.get("SELECT * FROM categories WHERE id = ?", [id], callback)
}


const deleteCategory = (id, callback) => {
  db.run("DELETE FROM categories WHERE id = ?", [id], callback)
}


// przypisanie produktu do kategorii
const addProductToCategory = (product_id, category_id, callback) => {
    db.run(
        "INSERT INTO prod_cat (product_id, category_id) VALUES (?, ?)",[product_id, category_id],
        function (err) {
            if (err) {
                console.error("Błąd przypisania:", err.message)
                if (callback)
                    callback(err, null)
                return
      }
      if (callback)
        callback(null, this.lastID)
    }
  )
}


// pobranie wszystkich produktów z danej kategorii
const getProductsByCategory = (category_id, callback) => {
    db.all(
        `SELECT products.* FROM products
        JOIN prod_cat ON products.id = prod_cat.product_id
        WHERE prod_cat.category_id = ?`,[category_id],callback)
}


// pobranie wszystkich kategorii danego produktu
const getCategoriesByProduct = (product_id, callback) => {
  db.all(
    `SELECT categories.* FROM categories
     JOIN prod_cat ON categories.id = prod_cat.category_id
     WHERE prod_cat.product_id = ?`,
    [product_id],
    callback
  )
}



const updateCategory = (id, name, callback) => {
  db.run(
    "UPDATE categories SET name = ? WHERE id = ?",
    [name, id],
    callback
  );
};


module.exports = {  addCategory, getAllCategories, getCategoryById, deleteCategory,  
                    addProductToCategory, getProductsByCategory, getCategoriesByProduct,updateCategory}