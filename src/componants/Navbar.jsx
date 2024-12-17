import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import { useState } from "react";
import Model from "../Model";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
import './styles/Navbar.css'
import React from 'react';

export default function Navbar({ setsearch }) {
    let data = useCart();
    const [cartView, setcartView] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header>
            <nav>
                <div className="main-container">
                    {/* Brand */}
                    <Link className="title" to="/">
                        <span className="Go">Have</span> a Seat
                    </Link>

                    {/* Hamburger Menu */}
                    <div className="hamburger" onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    {/* Collapsible Menu */}
                    <div className={`nav-list ${menuOpen ? 'open' : ''}`}>
                        <ul>
                            <li>
                                <Link to="/" onClick={toggleMenu}>Home</Link>
                            </li>
                            <li>
                                <Link to="/" onClick={toggleMenu}>Menu</Link>
                            </li>
                            <li>
                                <Link to="/services" onClick={toggleMenu}>Services</Link>
                            </li>
                            <li>
                                <input
                                    type="search"
                                    className="search-input"
                                    placeholder="Search..."
                                    onChange={(e) => setsearch(e.target.value)}
                                />
                            </li>
                        </ul>

                        <div className="login-and-account">
                            {!localStorage.getItem("authToken") ? (
                                <div className="authentication-btn">
                                    <Link to="/login" onClick={toggleMenu}>Login</Link>
                                    <Link to="/createuser" onClick={toggleMenu}>SignUp</Link>
                                </div>
                            ) : (
                                <div className="cart-logout">
                                    <div onClick={() => setcartView(true)} className="cart">
                                        Cart <Badge pill bg="danger">{data.length}</Badge>
                                    </div>

                                    {cartView ? (
                                        <Model onClose={() => setcartView(false)}>
                                            <Cart />
                                        </Model>
                                    ) : null}

                                    <div className="logout" onClick={handleLogout}>
                                        Logout
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}