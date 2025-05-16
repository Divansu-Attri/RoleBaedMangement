import { useAuth } from '../Store/auth';
import '../App.css'; // Adjust the path if needed
import { useEffect, useState } from 'react';

export default function Order() {
    const { AuthorizationToken } = useAuth();
    const [product, setProduct] = useState()

    const getProductData = async () => {
        try {
            let response = await fetch(`https://rolebaedmangement.onrender.com/api/orders/getAllOrders`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    Authorization: AuthorizationToken
                }
            })
            const data = await response.json()
            setProduct(data)
            console.log(`User Data = ${data}`)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProductData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(product)

    return (
        <>
            <div className="container mt-5 table-container">
                {/* <h6 className="text-center">
        All the product data you see on the website was initially saved
        manually in the MongoDB database, and then it is fetched and displayed
        on the frontend.
      </h6> */}

                <h1 className="text-center mb-4">All Orders</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">S.no.</th>
                            <th scope="col">Product</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product && product.length > 0 ? (
                            product.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row" className="table-cell-padding">
                                        {index + 1}
                                    </th>
                                    <td className="table-cell-padding">{item.customerName}</td>
                                    <td className="table-cell-padding">  {item.products.reduce((total, product) => total + product.quantity, 0)}
                                    </td>
                                    <td className="table-cell-padding">{item.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center no-products">
                                   This page only for Admin/Manager.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
