const db = require("../data/db");

// tworzenie tabel
const initDB = () => {
  db.serialize(() => {
   
    db.run("PRAGMA foreign_keys = ON")

    // tabela na produkty
    db.run(`DROP TABLE IF EXISTS products`)

    db.run(`
      CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        stock INTEGER NOT NULL
      )
    `)

   
    // tabela na nazwy kategorii
    db.run(`DROP TABLE IF EXISTS categories`)

    db.run(`
      CREATE TABLE categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )
    `)


    // tabela relacji produt do kategorii
    db.run(`DROP TABLE IF EXISTS prod_cat`)

    db.run(`
      CREATE TABLE prod_cat (
        product_id INTEGER NOT NULL,
        category_id INTEGER NOT NULL,
        PRIMARY KEY (product_id, category_id),
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      )
    `)


    console.log("Tabele utworzone poprawnie")
  })
}

module.exports = initDB