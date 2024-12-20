import { useEffect, useState } from "react";
import Footer from "../componants/Footer";
import Navbar from "../componants/Navbar";
import Card from "../componants/Card";
import './styles/Home.css'
import FloatingFeatures from "../componants/FloatingFeatures";
import BestDelivered from "../componants/BestDelivered";
import React from 'react';

export default function Home() {
  const [foodCat, setfoodCat] = useState([]); // Data from backend
  const [foodItem, setfoodItem] = useState([]);
  const [bestDelivered, setBestDelivered] = useState([]);
  const [search, setsearch] = useState("");

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      response = await response.json();
      setfoodItem(response[0]);
      setfoodCat(response[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const loadBestDelivered = async ()=>{
    try {
      let response = await fetch("http://localhost:5000/api/bestDelivered",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      response = await response.json();

    setBestDelivered(response)
    }
     catch (error) {
      console.error("Error fetching best-delivered data:", error);
    }
  }

  useEffect(() => {
    loadData();
    loadBestDelivered();
  }, []); // Run once when component mounts

  return (
    <div>
      <div className="page-one">
      <Navbar setsearch={setsearch} />
      <div className="promotion">
        <div className="promotion-txt">
        <h2>Real <span>and</span> Tasty <br /> Indian Food <span>with</span> <br /> a Dash of flavours</h2>

       <div className="btns"> 
        <button className="order-now" >Order Now</button>
        <button className="offers" > Offers </button>
        </div>
        </div>
        <div className="promotion-img">
    <img src="/Have a seat Frontend/public/d.jpg" alt="" />
        </div>
      </div>
      </div>
      
    <div className="floating-features">
      <FloatingFeatures/>

    </div>

<div className="best-delivered-container">
    <h2 className="bD-tagline" > Our <span>Best Delivered</span> <br /> Dishes of all time</h2>
    <div className="best-delivered">
      <BestDelivered items = {bestDelivered} />
      </div>
    </div>

    
        
       <div className="menu-container ">
       <h2 className=" regular-menu-tagline bD-tagline " > Our <span>Regular</span> <br /> menu</h2>
        {foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category._id} className="food-content" style={{ textAlign: "center" }}>
              <h3 className="category-name">{category.name}</h3>
              <hr />
              <div className="row g-3 ">
                {foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === category.name &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item) => (
                    <div className="col-md-3 d-flex justify-content-center   " key={item._id}>
                      <Card foodItem={item} options={item.options[0]} />
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div> 
      <Footer />
    </div>
  );
}
