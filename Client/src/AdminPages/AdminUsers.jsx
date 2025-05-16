import { useEffect, useState } from "react"
import {useAuth} from '../Store/auth'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import { FaPlus } from "react-icons/fa"

export default function AdminUsers() {
  const [users,setUsers] = useState([])
  const {AuthorizationToken} = useAuth()
  const getUsersData = async () => {
    try {
      let response = await fetch(`https://rolebaedmangement.onrender.com/api/users/getAllUsers`,{
        method:"GET",
        credentials: 'include',
        headers:{
          Authorization:AuthorizationToken
        }
      })
      const data = await response.json()
      setUsers(data)
      console.log(`User Data = ${data}`)
    } catch (error) {
      console.log(error)
    }
  }

  const DeleteUser = async (id) => {
    try {
      let response = await fetch(`https://rolebaedmangement.onrender.com/api/users/deleteUser/${id}`,{
        method:"DELETE",
        credentials: 'include',
        headers:{
          Authorization:AuthorizationToken
        }
      })
      const data = await response.json()
      console.log(data)
      alert("Are You Sure Want to Delete")
      if(response.ok){
        getUsersData()
        toast.success(data.message)
        console.log(response.message)
      }

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
    getUsersData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
    <div className="container mt-5 table-container">
      <h1 className="text-center mb-4">All Users</h1>
      <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Products</h1>
          <Link to="/admin/adduser" className="btn btn-primary">
            <FaPlus className="me-2" />
            Add User
          </Link> 
        </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">S.no.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>

          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((item, index) => (
              <tr key={index}>
                <th scope="row" className="table-cell-padding">{index + 1}</th>
                <td className="table-cell-padding">{item.name}</td> 
                <td className="table-cell-padding">{item.email}</td>
                <td className="table-cell-padding">{item.role}</td>
                <td className="table-cell-padding"><Link className="btn btn-success" to={`/admin/users/${item._id}/edit`} >Edit</Link></td>
                <td className="table-cell-padding"><button onClick={()=>DeleteUser(item._id)} className="btn btn-danger">Delete</button></td>

              </tr>
            ))
          ) : (
            <tr> 
              <td colSpan="5" className="text-center no-services">
                Not Have any Data!!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  )
}
 