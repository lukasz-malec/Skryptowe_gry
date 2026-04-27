// polaczenie z sqlite, stworzenie pliku

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data/database.db", (err) => {
  if (err) {
    console.error("Błąd połączenia:", err.message);
  } else {
    console.log("Połączono z SQLite");
  }
});

module.exports = db;