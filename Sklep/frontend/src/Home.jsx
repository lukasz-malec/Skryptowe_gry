import { useEffect, useState } from "react"
import axios from "axios"
import "./Home.css"

const Home = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [loading, setLoading] = useState(true)

    // wywołania z axios

    // pobieranie kategorii
    useEffect(() => {
    axios.get("http://localhost:3000/categories")
        .then(res => setCategories(res.data))
        .catch(err => console.error(err))
    }, [])


    // pobieranie produtkow oraz filtrowanie po kategoriach
    useEffect(() => {
    const url = selectedCategory
        ? `http://localhost:3000/products?category=${selectedCategory}`
        : "http://localhost:3000/products"

    axios.get(url)
        .then(res => {
        setProducts(res.data)
        setLoading(false)
        })
        .catch(err => console.error(err))
    }, [selectedCategory])

    if (loading) return <p>Ładowanie...</p>



    return (
    <div className="home">
        <h1>Produkty</h1>

        <div className="filters">
        <button
            className={selectedCategory === null ? "filter-btn active" : "filter-btn"}
            onClick={() => setSelectedCategory(null)}
        >
            Wszystkie
        </button>
        {categories.map(c => (
            <button
            key={c.id}
            className={selectedCategory === c.id ? "filter-btn active" : "filter-btn"}
            onClick={() => setSelectedCategory(c.id)}
            >
            {c.name}
            </button>
        ))}
        </div>

        <div className="grid">
            {products.map(p => (
                <div key={p.id} className="card">
                <div className="card-name">{p.name}</div>
                <div className="card-price">
                    {(p.price).toLocaleString("pl-PL", { style: "currency", currency: "PLN" })}
                </div>
                <div className="card-stock">{p.stock} szt.</div>
                </div>
            ))}
        </div>
    </div>
    )
}

export default Home