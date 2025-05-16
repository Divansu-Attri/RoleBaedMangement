import { useEffect, useState } from "react"
import { useAuth } from '../Store/auth'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


export default function AdminUpdate() {
  const navigate = useNavigate()
  const params = useParams()
  const { AuthorizationToken } = useAuth()

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: ""
  })

  const getSingleUserData = async () => {

    try {
      let response = await fetch(`http://localhost:5000/api/users/getUserById/${params.id}`, {
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
      let response = await fetch(`http://localhost:5000/api/users/updateUser/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken
        },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        toast.success("Updated Successfully")
        navigate("/admin/users")
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
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" name="email" placeholder="Email" id="email" autoComplete="off" value={data.email} onChange={handleInput} required />
        </div>

        {/* <div className="mb-3">
        <label htmlFor="role" className="form-label">Role</label>
        <input type="role" className="form-control" name="role" placeholder="role" id="role" autoComplete="off" value={ data.role} onChange={handleInput}  required />
      </div> */}

        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            className="form-control"
            name="role"
            id="role"
            value={data.role}
            onChange={handleInput}
            required
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
        </div>



        <button type="submit" className="btn btn-success w-100">Update</button>
      </form>



    </>
  )
}
