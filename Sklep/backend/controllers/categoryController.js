const categoryModel = require("../models/categoriesModels");


const getAllCategories = (req, res) => {
  categoryModel.getAllCategories((err, categories) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(categories);
  });
};


const getCategoryById = (req, res) => {
  const id = parseInt(req.params.id);
  categoryModel.getCategoryById(id, (err, category) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!category) return res.status(404).send("Brak takiej kategorii");
    res.json(category);
  });
};


const addCategory = (req, res) => {
  const { name } = req.body;
  if (name === undefined) return res.status(400).send("Brak wymaganych pol");

  categoryModel.addCategory(name, (err, id) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).send("Udalo sie dodac kategorie");
  });
};


const updateCategory = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  if (name === undefined) return res.status(400).send("Brak wymaganych pol");

  categoryModel.updateCategory(id, name, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.send("Udalo sie zaktualizowac kategorie");
  });
};



const deleteCategory = (req, res) => {
  res.status(501).send("Brak implementacji metody DELETE");
};

module.exports = { getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory };