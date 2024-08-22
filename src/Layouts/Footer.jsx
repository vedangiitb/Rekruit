import React from "react";

export default function Footer() {
    return (
        <div style={{ display: "flex", flexDirection: "column", backgroundColor: "black", color: "white" }}>
            <div style={{ display: "flex", backgroundColor: "black", color: "white", paddingLeft: "15%", paddingRight: "15%", paddingTop: "5%", paddingBottom: "2%", justifyContent: "space-between" }} className="text">

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <a href="/about" className="footer-item"><p>About</p></a>
                    <p>Team</p>
                    <p>Career</p>
                    <p>Pricing</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <p>FAQ</p>
                    <a href="/contact" className="footer-item"><p>Contact</p></a>
                    <p>Support</p>
                    <p>Pricing</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <p>Legal</p>
                    <p>Data Protection & Privacy</p>
                    <p>T&C</p>
                    <p>Impressum</p>
                </div>

            </div>

            <p className="text" style={{ paddingLeft: "5%" }}>&copy; Rekruit Inc.</p>

        </div>
    )
}