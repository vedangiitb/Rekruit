import React from "react";

export default function Footer() {
    return (
        <div style={{ display: "flex", flexDirection: "column", backgroundColor: "white", color: "black" }}>
            <div style={{ display: "flex", backgroundColor: "white", color: "black", paddingLeft: "15%", paddingRight: "15%", paddingTop: "5%", paddingBottom: "2%", justifyContent: "space-between" }} className="text">
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <a href="/about" className="footer-item"><p>About</p></a>
                    <a href="/team" className="footer-item"><p>Team</p></a>
                    <a href="/careers" className="footer-item"><p>Career</p></a>
                    <a href="/pricing" className="footer-item"><p>Pricing</p></a>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <a href="/faq" className="footer-item"><p>FAQ</p></a>
                    <a href="/contact" className="footer-item"><p>Contact</p></a>
                    <a href="/support" className="footer-item"><p>Support</p></a>
                    <a href="/pricing" className="footer-item"><p>Pricing</p></a>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <a href="/tnc" className="footer-item"><p>Legal</p></a>
                    <a href="data-protection" className="footer-item"><p>Data Protection & Privacy</p></a>
                    <a href="/tnc" className="footer-item"><p>T&C</p></a>
                    <a href="/tnc" className="footer-item"><p>Impressum</p></a>
                </div>

            </div>

            <p className="text" style={{ paddingLeft: "5%" }}>&copy; Rekruit Inc.</p>

        </div>
    )
}