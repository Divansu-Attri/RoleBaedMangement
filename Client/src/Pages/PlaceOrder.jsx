import { useState } from "react"
import { useAuth } from '../Store/auth'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function PlaceOrder() {
    const id = useParams()
    const navigate = useNavigate()
    const { AuthorizationToken } = useAuth()

    const [orderData, setOrderData] = useState({
        customerName: "",
        products: [{ product: id.id, quantity: 1 }]
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setOrderData({ ...orderData, [name]: value })
    }

    const handleProductChange = (index, e) => {
        const { name, value } = e.target
        const updatedProducts = [...orderData.products]
        updatedProducts[index][name] = value
        setOrderData({ ...orderData, products: updatedProducts })
    }

    const addProductField = () => {
        setOrderData({
            ...orderData,
            products: [...orderData.products, { product: "", quantity: 1 }]
        })
    }

    const removeProductField = (index) => {
        const updatedProducts = [...orderData.products]
        updatedProducts.splice(index, 1)
        setOrderData({ ...orderData, products: updatedProducts })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:5000/api/orders/placeOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: AuthorizationToken
                },
                body: JSON.stringify(orderData)
            })

            if (response.ok) {
                toast.success("Order Placed Successfully")
                navigate("/order")
            } else {
                const errorData = await response.json()
                toast.error(errorData.message || "Failed to place order")
            }

        } catch (error) {
            console.error("Error placing order:", error)
            toast.error("Something went wrong")
        }
    }

    return (
        <form className="container mt-5" onSubmit={handleSubmit}>
            <h2 className="mb-4">Place New Order</h2>

            <div className="mb-3">
                <label htmlFor="customerName" className="form-label">Enter Your Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="customerName"
                    name="customerName"
                    placeholder="Customer Name"
                    value={orderData.customerName}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <h5>Product Id</h5>
            {orderData.products.map((item, index) => (
                <div className="row mb-3" key={index}>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Product ID"
                            name="product"
                            value={id.id}
                            onChange={(e) => handleProductChange(index, e)}
                            required
                        />
                    </div>
                    <h5>Quantity</h5>
                    <div className="col-md-4">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Quantity"
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) => handleProductChange(index, e)}
                            min="1"
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        {orderData.products.length > 1 && (
                            <button type="button" className="btn btn-danger w-100" onClick={() => removeProductField(index)}>Remove</button>
                        )}
                    </div>
                </div>
            ))}

            <button type="button" className="btn btn-secondary mb-3" onClick={addProductField}>Add Another Product</button>

            <button type="submit" className="btn btn-primary w-100">Place Order</button>
        </form>
    )
}
