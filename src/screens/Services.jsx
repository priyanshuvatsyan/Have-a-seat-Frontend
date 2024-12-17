import React from 'react'
import './styles/Services.css'
import Navbar from '../componants/Navbar';
import Footer from '../componants/Footer';

export default function Services() {
    return (
        <div className="service-page">
            <div className="page-one">
                <Navbar />

                <header className="hero">
                    <h1 className="hero-title">
                        SIMPLE <img src="/src/screens/images/salad.jpg" alt="" /> AND <br /> <span>TASTY</span> RECIPES
                         </h1>
                    <p className="hero-subtitle">Redefining dining experiences with innovation</p> 
                </header>
            </div>
            <section className="services">
                <h2 className="section-title">Our Services</h2>
                <div className="services-container">
                    <div className="service-card">
                        <img
                            src="/src/screens/images/scan.png"
                            alt="QR Code Feature"
                            className="service-image"
                        />
                        <h3 className="service-title">QR Code Table Access</h3>
                        <p className="service-description">
                            Scan the QR code on your table to browse the menu, order food, and track your order seamlessly.
                        </p>
                    </div>

                    <div className="service-card">
                        <img
                            src="/src/screens/images/delivery-man.png"
                            alt="Pre-order Feature"
                            className="service-image"
                        />
                        <h3 className="service-title">Pre-order Your Meal</h3>
                        <p className="service-description">
                            Save time by placing your order before arriving at the restaurant. Your meal will be ready when you arrive.
                        </p>
                    </div>

                    <div className="service-card">
                        <img
                            src="/src/screens/images/mobile-payment.png"
                            alt="Online Payment"
                            className="service-image"
                        />
                        <h3 className="service-title">Online Payments</h3>
                        <p className="service-description">
                            Enjoy a hassle-free dining experience with secure online payment options and digital receipts.
                        </p>
                    </div>
                </div>
            </section>

            <section className="testimonials">
                <h2 className="section-title">What Our Customers Say</h2>
                <div className="testimonials-container">
                    <div className="testimonial-card">
                        <p className="testimonial-text">
                            "An amazing experience! The QR code system is so convenient."
                        </p>
                        <p className="testimonial-author">- Sarah Johnson</p>
                    </div>
                    <div className="testimonial-card">
                        <p className="testimonial-text">
                            "Loved the pre-order feature. My meal was ready when I arrived!"
                        </p>
                        <p className="testimonial-author">- Mike Anderson</p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <Footer />
            </footer>
        </div>
    )
}
