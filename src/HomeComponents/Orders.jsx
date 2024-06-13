import React, { useEffect, useState } from 'react'
import './Orders.css'
const request = require('superagent');

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const fetchOrderDetails = async () => {
        try {
            const response = await request.get(`http://localhost:5000/apis/orders`);
            setOrders(response.body);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    useEffect(() => {
        fetchOrderDetails();
    }, []);
    const generateInvoice = async (id,username) => {
        try {
            try {
                let queryParams = {
                    username: username,
                    orderId: id
                };
                let queryString = new URLSearchParams(queryParams).toString();
                let invoiceUrl = `http://localhost:5000/apis/generate-invoice?${queryString}`;
                console.log('Invoice URL:', invoiceUrl); // Log the invoice URL
        
                // Set window location to the PDF URL to initiate download
                window.location.href = invoiceUrl;
            } catch (error) {
                console.error('Error fetching invoice:', error);
            }
        } catch (error) {

        }
    }
    return (
        <>
            <div className="order-container">
                <h1 className="order-heading">Order Details</h1>
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Order ID</th>
                            <th>Username</th>
                            <th>Shipping Address</th>
                            <th>Payment Mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} onClick={() => { generateInvoice(order._id,order.username) }}>
                                <td>{order.date}</td>
                                <td>{order._id.toString()}</td> {/* Convert ObjectId to string */}
                                <td>{order.username}</td>
                                <td>{order.address}</td>
                                <td>{order.paymentmode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
