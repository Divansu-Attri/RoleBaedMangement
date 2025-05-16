import { useAuth } from '../Store/auth';
import '../App.css';
import { Link } from 'react-router-dom';

export default function Services() {
  const { service } = useAuth();

  return (
    <div className="container mt-5 table-container">
      <h1 className="text-center mb-4">Products</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">S.no.</th>
            <th scope="col">Service</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th> {/* New Column */}
          </tr>
        </thead>
        <tbody>
          {service && service.length > 0 ? (
            service.map((item, index) => (
              <tr key={index}>
                <th scope="row" className="table-cell-padding">{index + 1}</th>
                <td className="table-cell-padding">{item.name}</td>
                <td className="table-cell-padding">{item.description}</td>
                <td className="table-cell-padding">{item.price}</td>
                <td>
                  <Link to={`/placeorder/${item._id}`}>
                  <button
                    className="btn btn-primary"
                  
                  >
                    Place Order
                  </button>
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
  );
}
