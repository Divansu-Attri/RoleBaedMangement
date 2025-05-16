import { useEffect, useState } from "react"
import {useAuth} from '../Store/auth'
import {toast} from 'react-toastify'

export default function AdminContact() {
  const [users,setUsers] = useState([])
  const {AuthorizationToken} = useAuth()
  const getContactData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/admin/contacts",{
        method:"GET",
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
      let response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,{
        method:"DELETE",
        headers:{
          Authorization:AuthorizationToken
        }
      })
      const data = await response.json()
      console.log(data)
      alert("Are You Sure Want to Delete this contact")
      if(response.ok){
        getContactData()
      }
      toast.success(data.message)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
    getContactData()
  },[])
  return (
    <>
    <div className="container mt-5 table-container">
      <h1 className="text-center mb-4">Our Services</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">S.no.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Message</th>
            <th scope="col">Delete</th>

          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((item, index) => (
              <tr key={index}>
                <th scope="row" className="table-cell-padding">{index + 1}</th>
                <td className="table-cell-padding">{item.username}</td>
                <td className="table-cell-padding">{item.email}</td>
                <td className="table-cell-padding">{item.message}</td>
                <td className="table-cell-padding"><button onClick={()=>DeleteUser(item._id)} className="btn btn-success">Delete</button></td>

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
 