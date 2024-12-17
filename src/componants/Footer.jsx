import { Link } from "react-router-dom";
import './styles/Footer.css'
import React from 'react';

export default function Footer() {
  return (
    <div className="footer" >
     {/*  <div className="news-and-offers">
        <h2>Get News and Offers</h2>
        <p>We provide special offers and some special discounts on Weekends we also provide some other special discounts specially for students.
        So what are you waiting for.? come and grab your discounts and offers</p>
      </div> */}
      
      <h1>Lets Connect With Us</h1>
      <div className="subscribe">
        <input type="email" name="" id="" placeholder="Enter email" />
        <button>Subscrible Now</button>
      </div>

<div className="footer-container">
      <div className="tagline">
        <h2>Have a seat</h2>
        <p>-Make Hustle free orders</p>
        <p>-Pre Order</p>
      </div>

      <footer className="py-3 ">
    <ul className="nav justify-content-center border-bottom pb-3 mb-3  ">
      <li className="nav-item"><Link href="#" className="nav-link px-2 text-white">Home</Link></li>
      <li className="nav-item"><Link href="#" className="nav-link px-2 text-white">Features</Link></li>
      <li className="nav-item"><Link href="#" className="nav-link px-2 text-white">Pricing</Link></li>
      <li className="nav-item"><Link href="#" className="nav-link px-2 text-white">FAQs</Link></li>
      <li className="nav-item"><Link href="#" className="nav-link px-2 text-white">About</Link></li>
    </ul>
    <p className="text-center text-white tc:white">© priyanshuvatsyan, Inc</p>
  </footer>
    </div>
    </div>
  )
}
