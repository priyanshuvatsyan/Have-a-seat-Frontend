/* eslint-disable react/prop-types */
import { useDispatchCart, useCart } from "./ContextReducer";
import { useRef, useState, useEffect } from "react";
import React from 'react';

import './styles/card.css'
export default function Card(props) {

  // eslint-disable-next-line react/prop-types
  let options = props.options;
  let priceOptions = Object.keys(options); // Ensure options is an object
  const priceRef = useRef();

  useEffect(() => {
    setsize(priceRef.current.value);
  }, []);

  const [qty, setqty] = useState(1); // 1 is the default quantity
  const [size, setsize] = useState("");
  let dispatch = useDispatchCart();
  let data = useCart();

  const handleAddToCart = async () => {
    await dispatch({
      type: "ADD", // type ADD means I want to add data in cart
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size
    });
    console.log(data);
  }

  let finalPrice = qty * parseInt(options[size]);

  return (
    <div className="card-container" >
      <div className="inner-card" >
        <img className="foodImg" src={props.foodItem.img} alt="Card image cap" />
        <div className="food-item" >
          <h5>{props.foodItem.name}</h5>
          <p>{props.foodItem.description}</p>
          <div>
            <select  className="qnty"  onChange={(e) => setqty(e.target.value)}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select className="size" ref={priceRef} onChange={(e) => setsize(e.target.value)}>
              {priceOptions.map((data) => (
                <option  key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="price" >
            ₹{finalPrice}/-
            </div>
          </div>
          <hr />
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
