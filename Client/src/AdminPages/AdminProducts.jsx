import { useAuth } from '../Store/auth';
import '../App.css'; // Adjust the path if needed
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa'; // FontAwesome Plus icon

export default function AdminProducts() {
  const { service } = useAuth();

  return (
    <>
      <div className="container mt-5 table-container">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Products</h1>
          <Link to="/admin/addproduct" className="btn btn-primary">
            <FaPlus className="me-2" />
            Add Product
          </Link> 
        </div>

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">S.no.</th>
              <th scope="col">Service</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Update</th>
            </tr>
          </thead>
          <tbody>
            {service && service.length > 0 ? (
              service.map((item, index) => (
                <tr key={index}>
                  <th scope="row" className="table-cell-padding">
                    {index + 1}
                  </th>
                  <td className="table-cell-padding">{item.name}</td>
                  <td className="table-cell-padding">{item.description}</td>
                  <td className="table-cell-padding">{item.price}</td>
                  <td className="table-cell-padding">
                    <Link className="btn btn-success" to={`/admin/product/${item._id}/edit`}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center no-services">
                  Please LogIn if you need Services!!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
