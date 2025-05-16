import { Outlet } from 'react-router-dom';
import {Link} from 'react-router-dom'
import {useAuth} from '../Store/auth'

export default function AdminLayout() {

  const {user,isLoading} = useAuth()

  if(isLoading){
    return <h1>Loading...</h1>
  }
  if (user?.role !== "Admin" && user?.role !== "Manager") {
    return <h2 className="text-danger text-center mt-5">Admin Only</h2>;
  }

  return (
    <>
    <header>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-success m-3 rounded container-fluid">
        <Link className="navbar-brand text-dark p-2" to="#">
           Admin Pannel
       </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item ">
                <Link className="nav-link text-dark" to="/admin/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/admin/products">
                  Products
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
     <Outlet/>
    </>
  )
}
