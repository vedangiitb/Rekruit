import React, { useState } from "react";
import '../Styles/Navbar.css';
import TopBar from "./TopBar";

export default function Navbar({ currentUser }) {
    let Login = "Login";
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (currentUser) {
        Login = currentUser.username;
    }

    return (
        <div>
            <nav className="navbar-expand-lg navbar-light bg-body-tertiary">
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="mobile-menu" style={{ backgroundColor: "#fff", padding: "20px", position: "absolute", left: "0", right: "0", zIndex: "1000" }}>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="navbar-toggler" type="button" aria-controls="navbarNav" aria-expanded={isMenuOpen} aria-label="Toggle navigation">
                            <span class="material-symbols-outlined">
                                close
                            </span>
                        </button>
                        <ul className="navbar-nav" style={{ listStyle: "none", padding: "0", margin: "0", fontSize: "14px" }}>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "#333" }}>
                                    Products
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{
                                    width: "100%", // Full width for mobile
                                    borderRadius: "10px",
                                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
                                }}>
                                    <li>
                                        <a className="dropdown-item nav-dropdown" href="/create-interview" style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                                            <div>
                                                <h5>ReScreen</h5>
                                                <p style={{ color: "#666" }}>Use the AI powered resume screener to identify the best resumes from your talent pool</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item nav-dropdown" href="/create-interview" style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                                            <div>
                                                <h5>Rekruit Assess</h5>
                                                <p style={{ color: "#666" }}>Conduct your tech screening with Rekruit Assess to get the best for your company, with powerful analytics and cheating detections algorithms</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item nav-dropdown" href="/create-interview" style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                                            <div>
                                                <h5>ReInt</h5>
                                                <p style={{ color: "#666" }}>The most secure online interview tool, with AI powered protection along with the best Collaborative IDE and AI powered analytics</p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#" style={{ color: "#333" }}>Pricing</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/about" style={{ color: "#333" }}>Company</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#" style={{ color: "#333" }}>For Individuals</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/account" style={{ color: "#1d3557" }}>{Login}</a>
                            </li>

                            <li className="nav-item">
                                <button role="button" className="btn btn-primary" style={{ backgroundColor: "#00289F" }}>
                                    Book a Demo
                                </button>
                            </li>
                        </ul>
                    </div>
                )}

                {!isMenuOpen && <div className="container-fluid" style={{ padding: "1% 8%", display: "flex", gap: "30px", backgroundColor: "#ffffff", }}>
                    <a className="navbar-brand" href="/">
                        <img src="logo.png" alt="Logo" className="logo-img" />
                    </a>
                    <button onClick={() => setIsMenuOpen(true)} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto me-0" style={{ gap: "40px", fontSize: "16px", }}>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "#333", }}>
                                    Products
                                </a>

                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{
                                    width: "35vw",
                                    borderRadius: "10px",
                                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
                                }}>
                                    <li>
                                        <a className="dropdown-item nav-dropdown" href="/create-interview" style={{ padding: "25px", borderBottom: "1px solid #eee" }}>
                                            <div>
                                                <h5>ReScreen</h5>
                                                <p style={{ color: "#666" }}>
                                                    Use the AI powered resume screener to identify the best resumes from your talent pool
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item nav-dropdown" href="/create-interview" style={{ padding: "25px", borderBottom: "1px solid #eee" }}>
                                            <div>
                                                <h5>Rekruit Assess</h5>
                                                <p style={{ color: "#666" }}>
                                                    Conduct your tech screening with Rekruit Assess to get the best for your company, with powerful analytics and cheating detections algorithms
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item nav-dropdown" href="/create-interview" style={{ padding: "25px", borderBottom: "1px solid #eee" }}>
                                            <div>
                                                <h5>ReInt</h5>
                                                <p style={{ color: "#666" }}>
                                                    The most secure online interview tool, with AI powered protection along with the best Collaboarative IDE and AI powered analytics
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link" href="#" style={{ color: "#333", }}>
                                    Pricing
                                </a>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link" href="/about" style={{ color: "#333", }}>
                                    Company
                                </a>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link" href="#" style={{ color: "#333", }}>
                                    For Individuals
                                </a>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link" href="/account" style={{ color: "#1d3557", }}>
                                    {Login}
                                </a>
                            </li>

                            <li className="nav-item dropdown">
                                <button href="#" role="button" className="btn btn-primary" style={{ backgroundColor: "#00289F" }}>
                                    Book a Demo
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>}




            </nav>
        </div>
    );
}
