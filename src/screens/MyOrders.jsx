import React, { useEffect, useState } from 'react';
import Footer from "../componants/Footer";
import Navbar from "../componants/Navbar";


export default function MyOrder() {
    const [orderData, setOrderData] = useState({});

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("https://haveaseat-u32rj7rd.b4a.run//api/myorders_data", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: localStorage.getItem('userEmail') }),
            });
            const data = await response.json();
            setOrderData(data);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {Object.keys(orderData).length !== 0 ? 
                        orderData.orderData.slice(0).reverse().map((order, index) => (
                            <div key={index}>
                                <div className='m-auto mt-5'>
                                    {order[1] && <div>{new Date(order[1]).toDateString()}</div>}
                                    <hr />
                                </div>
                                {order[0].map((item) => (
                                    <div key={item.id} className='col-12 col-md-6 col-lg-3'>
                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                            <img src={item.img} alt={item.name} className="card-img-top" style={{ height: "120px", objectFit: "fill" }} />
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                    <span className='m-1'>{item.qty}</span>
                                                    <span className='m-1'>{item.size}</span>
                                                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                        ₹{item.price}/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )) : "No orders found"}
                </div>
            </div>
            <Footer />
        </div>
    );
}
