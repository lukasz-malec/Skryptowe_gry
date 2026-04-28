import { useEffect, useState } from "react"
import axios from "axios"
import './Admin.css'

const emptyForm = { name: "", price: "", stock: "", category_ids: [] }

const App = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [editId, setEditId] = useState(null)


  // wywołania axios
  // dodawanie, aktualizacja i usuwanie produktow

    const fetchProducts = () => {
      axios.get("http://localhost:3000/products")
        .then(res => {
          setProducts(res.data)
          setLoading(false)
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
      fetchProducts()
      axios.get("http://localhost:3000/categories")
        .then(res => setCategories(res.data))
        .catch(err => console.error(err))
    }, [])

    const openAdd = () => {
      setForm(emptyForm)
      setModal("add")
    }

    const openEdit = (product) => {
      setForm({
        name: product.name,
        price: (product.price / 100).toFixed(2),
        stock: product.stock,
        category_ids: product.category_ids ?? [],
      })
      setEditId(product.id)
      setModal("edit")
    }

    const closeModal = () => {
      setModal(null)
      setEditId(null)
      setForm(emptyForm)
    }

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleCheckbox = (id) => {
      const updated = form.category_ids.includes(id)
        ? form.category_ids.filter(c => c !== id)
        : [...form.category_ids, id]
      setForm({ ...form, category_ids: updated })
    }

    const handleSubmit = () => {
      const payload = {
        name: form.name,
        price: Math.round(parseFloat(form.price)),
        stock: parseInt(form.stock),
        category_ids: form.category_ids,
      }



      const request = modal === "add"
        ? axios.post("http://localhost:3000/products", payload)
        : axios.put(`http://localhost:3000/products/${editId}`, payload)

      request
        .then(() => { fetchProducts(); closeModal() })
        .catch(err => console.error(err))
    }

    const handleDelete = (id) => {
      axios.delete(`http://localhost:3000/products/${id}`)
        .then(() => fetchProducts())
        .catch(err => console.error(err))
    }

    if (loading) return <p>Ładowanie...</p>

    return (
      <div className="admin">
        <h1>Panel admina</h1>

        <ul>
          {products.map(p => (
            <li key={p.id}>
              <span>{p.name}</span>
              <button onClick={() => openEdit(p)}>Zaktualizuj</button>
              <button className="btn-delete" onClick={() => handleDelete(p.id)}>Usuń</button>
            </li>
          ))}
        </ul>

        <button className="btn-add" onClick={openAdd}>Dodaj produkt</button>

        {modal && (
          <div className="overlay">
            <div className="modal">
              <h2>{modal === "add" ? "Dodaj produkt" : "Edytuj produkt"}</h2>

              <label>Nazwa</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="np. iPhone 16"
              />

              <label>Cena (zł)</label>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="np. 4000.00"
                type="number"
              />

              <label>Stan magazynowy</label>
              <input
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="np. 100"
                type="number"
              />

              <label>Kategorie</label>
              <div className="checkboxes">
                {categories.map(c => (
                  <label key={c.id} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={form.category_ids.includes(c.id)}
                      onChange={() => handleCheckbox(c.id)}
                    />
                    {c.name}
                  </label>
                ))}
              </div>

              <div className="modal-buttons">
                <button onClick={handleSubmit}>
                  {modal === "add" ? "Dodaj" : "Zapisz"}
                </button>
                <button onClick={closeModal}>Anuluj</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
}

export default App