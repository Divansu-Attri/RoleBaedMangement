import { useEffect, useState } from "react"
import { useAuth } from '../Store/auth'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


export default function AdminUpdateProduct() {
  const navigate = useNavigate()
  const params = useParams()
  const { AuthorizationToken } = useAuth()

  const [data, setData] = useState({
    name: "",
    description: "",
    price: ""
  })

  const getSingleUserData = async () => {

    try {
      let response = await fetch(`http://localhost:5000/api/products/getProductById/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken
        }
      })
      const data = await response.json()
      setData(data)

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getSingleUserData()
  }, [])

  const handleInput = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let response = await fetch(`http://localhost:5000/api/products/updateProduct/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken
        },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        toast.success("Updated Successfully")
        navigate("/admin/products")
      }
      else {
        toast.error("Not Updated")
      }

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <form className="container mt-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" placeholder="Name" id="name" value={data.name} onChange={handleInput} autoComplete="off" required />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="description" className="form-control" name="description" placeholder="Emadescriptionil" id="description" autoComplete="off" value={data.description} onChange={handleInput} required />
        </div>

        <div className="mb-3">
        <label htmlFor="price" className="form-label">Price</label>
        <input type="price" className="form-control" name="price" placeholder="price" id="price" autoComplete="off" value={ data.price} onChange={handleInput}  required />
      </div>



        <button type="submit" className="btn btn-success w-100">Update</button>
      </form>



    </>
  )
}
