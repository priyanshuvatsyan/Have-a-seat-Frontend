import { useCart, useDispatchCart } from "../componants/ContextReducer";
import { useState } from "react";
import './styles/Cart.css';
import React from "react";

export default function Cart() {

    const [isPreOrder, setisPreOrder] = useState(false);
    const [preOrderTime, setpreOrderTime] = useState("");

    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div className="cart-empty-container">
                <h3 className="cart-empty-text">The Cart is empty</h3>
            </div>
        );
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
    
        // Step 1: Create a payment order
        const response = await fetch("https://haveaseat-u32rj7rd.b4a.run//api/createOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: totalPrice }), // Pass the total amount
        });
    
        const { success, order } = await response.json();
    
        if (success) {
            // Step 2: Open Razorpay interface
            const options = {
                key: "rzp_test_nFf0JdxnLRziKM", // Replace with your Razorpay Key ID
                amount: order.amount,
                currency: order.currency,
                name: "Have a Seat",
                description: "Complete your order",
                order_id: order.id, // Razorpay Order ID
                handler: async function (response) {
                    // Step 3: After successful payment
                    const paymentData = {
                        order_id: order.id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    };
    
                    // Save payment info in backend
                    await fetch("https://haveaseat-u32rj7rd.b4a.run//api/orderData", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            order_data: data,
                            email: userEmail,
                            order_date: new Date().toDateString(),
                            isPreOrder: Boolean(isPreOrder),
                            preOrderTime,
                            paymentData,
                        }),
                    });
    
                    dispatch({ type: "DROP" }); // Clear cart
                    alert("Payment Successful! Order placed.");
                },
                prefill: {
                    email: userEmail,
                },
            };
    
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } else {
            alert("Failed to initiate payment.");
        }
    };
    

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Cart</h2>
            <div className="cart-table-container">
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Option</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>₹{food.price}</td>
                                <td>
                                    <button
                                        className="cart-delete-button"
                                        onClick={() => dispatch({ type: "REMOVE", index: index })}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="cart-preorder">
                <input
                    type="checkbox"
                    id="preOrderCheck"
                    onChange={(e) => setisPreOrder(e.target.checked)}
                />
                <label htmlFor="preOrderCheck" className="preorder-label">
                    Is this a pre-order?
                </label>
            </div>

            {isPreOrder && (
                <div className="preorder-time-container">
                    <label htmlFor="preOrderTime" className="preorder-time-label">
                        Select Pre-Order Time:
                    </label>
                    <input
                        type="time"
                        id="preOrderTime"
                        className="preorder-time-input"
                        value={preOrderTime}
                        onChange={(e) => setpreOrderTime(e.target.value)}
                    />
                </div>
            )}

            <div className="cart-footer">
                <h3 className="total-price">Total Price: ₹{totalPrice}/-</h3>
                <button className="checkout-button" onClick={handleCheckOut}>
                    Check Out
                </button>
            </div>
        </div>
    );
}
