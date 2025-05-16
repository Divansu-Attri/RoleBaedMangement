import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import Services from './Pages/Services';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import Navbar from './Component/Navbar';
import Error from './Pages/Error';
import Logout from './Pages/Logout';
import AdminLayout from './AdminPages/AdminLayout';
import AdminUsers from './AdminPages/AdminUsers';
import AdminUpdate from './AdminPages/AdminUpdate';
import AdminProducts from './AdminPages/AdminProducts';
import AdminUpdateProduct from './AdminPages/AdminUpdateProduct';
import AdminAddProduct from './AdminPages/AddProduct';
import AdminAddUser from './AdminPages/AdminAddUser';
import Order from './Pages/Order';
import PlaceOrder from './Pages/PlaceOrder';

export default function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/order' element={<Order/>} />
        <Route path='/placeorder/:id' element={<PlaceOrder/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Registration/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='*' element={<Error/>} />

        {/* AdminRoutes */}

        <Route path='/admin' element={<AdminLayout/>}>

        <Route path='users' element={<AdminUsers/>}/>
        <Route path='adduser' element={<AdminAddUser/>}/>
        <Route path='users/:id/edit' element={<AdminUpdate/>}/>

        <Route path='products' element={<AdminProducts/>}/>
        <Route path='addproduct' element={<AdminAddProduct/>}/>
        <Route path='product/:id/edit' element={<AdminUpdateProduct/>}/>
        
        </Route>

      </Routes>
      </BrowserRouter>
    </>
  );
}
