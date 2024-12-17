import { useCart, useDispatchCart } from "../componants/ContextReducer";
import { useState } from "react";
import './styles/Cart.css'

export default function Cart() {

    const [isPreOrder, setisPreOrder] = useState(false);
    const [preOrderTime, setpreOrderTime] = useState("");

    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div className="container text-center my-5">
                <h3 className="text-muted">The Cart is empty</h3>
            </div>
        );
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("http://localhost:5000/api/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString(),
                isPreOrder: Boolean(isPreOrder),
                preOrderTime,
            }),
        });

        if (response.status === 200) {
            dispatch({ type: "DROP" });
        }
    };

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div className="container my-5">
            <h2>Your Cart</h2>
            <div className="table-responsive">
                <table className="table table-dark table-striped table-hover align-middle">
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
                                        className="btn btn-danger btn-sm"
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

            <div className="form-check mt-4">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="preOrderCheck"
                    onChange={(e) => setisPreOrder(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="preOrderCheck">
                    Is this a pre-order?
                </label>
            </div>

            {isPreOrder && (
                <div className="mt-3">
                    <label htmlFor="preOrderTime" className="form-label">
                        Select Pre-Order Time:
                    </label>
                    <input
                        type="time"
                        id="preOrderTime"
                        className="form-control"
                        value={preOrderTime}
                        onChange={(e) => setpreOrderTime(e.target.value)}
                    />
                </div>
            )}

            <div className="d-flex justify-content-between align-items-center mt-4">
                <h3>Total Price: ₹{totalPrice}/-</h3>
                <button className="btn btn-success btn-lg" onClick={handleCheckOut}>
                    Check Out
                </button>
            </div>
        </div>

  );
}
