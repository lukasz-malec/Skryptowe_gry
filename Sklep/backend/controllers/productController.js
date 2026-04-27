const productModel = require("../models/productsModel");
const { getProductsByCategory, addProductToCategory, getCategoriesByProduct } = require("../models/categoriesModels");


// akcja wykonywana przy endpointach


// zwraca wszystkie produkty oraz filtruje po kategoriach
// np /products?category=2 
const getAllProducts = (req, res) => {
    const { category } = req.query;

    if (category) {
        const catId = Number(category);
        return getProductsByCategory(catId, (err, products) => {
            if (err)
                return res.status(500).json({ error: err.message });
            
            res.json(products);
        });
    }

    productModel.getAllProducts((err, products) => {
        if (err)
            return res.status(500).json({ error: err.message });
        
        res.json(products);
    });
};




const getProductById = (req, res) => {
  const id = parseInt(req.params.id);

  productModel.getProductById(id, (err, product) => {
    if (err)
        return res.status(500).json({ error: err.message });
    if (!product)
        return res.status(404).send("Brak takiego produktu");


    
    getCategoriesByProduct(id, (err, categories) => {
        if (err)
            return res.status(500).json({ error: err.message });
    
    res.json({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        category_ids: categories.map((c) => c.id),
        });
    });
  });
};



const addProduct = (req, res) => {
    const { name, price, stock, category_ids } = req.body;

    if (name === undefined || price === undefined || stock === undefined || category_ids === undefined) {
        return res.status(400).send("Brak wymaganych pol");
    }

    productModel.addProduct(name, price, stock, (err, product_id) => {
    if (err)
        return res.status(500).json({ error: err.message });


    // przypisujemy kategorie
    category_ids.forEach((category_id) => {
        addProductToCategory(product_id, category_id, () => {});
    });

    
    res.status(201).send("Udalo sie dodac produkt");
    
    });
};



const updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price, stock } = req.body;

    if (name === undefined || price === undefined || stock === undefined) {
        return res.status(400).send("Brak wymaganych pol");
    }

    productModel.updateProduct(id, name, price, stock, (err) => {
        if (err)
            return res.status(500).json({ error: err.message });
            
        res.send("Udalo sie zaktualizowac produkt");
    });
};




const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);

    productModel.deleteProduct(id, (err) => {
        if (err)
            return res.status(500).json({ error: err.message });
        
        res.send("Udalo sie usunac produkt");
    });
};

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };