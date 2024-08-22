import React from "react";
import '../Styles/Navbar.css';


export default function Navbar({ currentUser }) {
    let Login = "Login";

    if (currentUser) {
        Login = currentUser.username;
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
                <div className="container-fluid" style={{
                    padding: "0.5% 2%",
                    display: "flex",
                    gap: "30px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)"
                }}>
                    <a className="navbar-brand" href="/">
                        <img src="logo.png" alt="Logo" style={{
                            width: "5vw",
                            height: "10vh",
                            paddingRight: "2px"
                        }} />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{
                            gap: "40px",
                            fontSize: "16px",
                            fontFamily: "'Poppins', sans-serif"
                        }}>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{
                                    color: "#333",
                                    fontWeight: "600"
                                }}>
                                    Interview
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{
                                    width: "450px",
                                    borderRadius: "10px",
                                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
                                }}>
                                    <li>
                                        <a className="dropdown-item nav-dropdown" href="/create-interview" style={{
                                            padding: "15px",
                                            borderBottom: "1px solid #eee"
                                        }}>
                                            <div>
                                                <h5 style={{
                                                    fontSize: "18px",
                                                    fontFamily: "'Roboto', sans-serif",
                                                    fontWeight: "500",
                                                    color: "#007BFF"
                                                }}>Create new Interview</h5>
                                                <p style={{
                                                    fontSize: "14px",
                                                    fontFamily: "'Roboto', sans-serif",
                                                    color: "#666"
                                                }}>
                                                    Schedule a technical interview with Rekruit. Seamlessly invite participants and manage all aspects of the interview process from start to finish.
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item nav-dropdown" href="/join-interview" style={{
                                            padding: "15px"
                                        }}>
                                            <div>
                                                <h5 style={{
                                                    fontSize: "18px",
                                                    fontFamily: "'Roboto', sans-serif",
                                                    fontWeight: "500",
                                                    color: "#007BFF"
                                                }}>Join Interview</h5>
                                                <p style={{
                                                    fontSize: "14px",
                                                    fontFamily: "'Roboto', sans-serif",
                                                    color: "#666"
                                                }}>
                                                    Easily join your next interview using your unique interview ID. Be part of the seamless and professional interview experience.
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://assess.rekruit.in/" style={{
                                    color: "#333",
                                    fontWeight: "600"
                                }}>Online Assessments</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/about" style={{
                                    color: "#333",
                                    fontWeight: "600"
                                }}>About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contact" style={{
                                    color: "#333",
                                    fontWeight: "600"
                                }}>Contact</a>
                            </li>
                        </ul>
                        <div className="d-flex ms-auto">
                            <a className="nav-link" href="/account" style={{
                                color: "#007BFF",
                                fontWeight: "600",
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <span className="material-symbols-outlined">person</span>
                                {Login}
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
