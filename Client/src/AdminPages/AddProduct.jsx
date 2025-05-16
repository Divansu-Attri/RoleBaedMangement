import { useState } from "react"
import { useAuth } from '../Store/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function AdminAddProduct() {
  const navigate = useNavigate()
  const { AuthorizationToken } = useAuth()

  const [data, setData] = useState({
    name: "",
    description: "",
    price: ""
  })

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let response = await fetch("http://localhost:5000/api/products/createProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        toast.success("Product Added Successfully")
        navigate("/admin/products")
      } else {
        toast.error("Failed to Add Product")
      }

    } catch (error) {
      console.log("Error adding product:", error)
      toast.error("Something went wrong")
    }
  }

  return (
    <form className="container mt-5" onSubmit={handleSubmit}>
      <h2 className="mb-4">Add New Product</h2>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" name="name" placeholder="Product Name" id="name" value={data.name} onChange={handleInput} autoComplete="off" required />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" name="description" placeholder="Description" id="description" value={data.description} onChange={handleInput} autoComplete="off" required />
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price</label>
        <input type="number" className="form-control" name="price" placeholder="Price" id="price" value={data.price} onChange={handleInput} autoComplete="off" required />
      </div>

      <button type="submit" onClick={handleSubmit} className="btn btn-primary w-100">Add Product</button>
    </form>
  )
}
