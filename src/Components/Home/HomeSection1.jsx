import React from "react";

export default function HomeSection1() {
    return (
        <div className="HomeSection1">
            <div style={{ display: "flex", flexDirection: "column", marginTop: "10%", marginRight: "15%" }}>
                <h1 className="heading">Revolutionizing Your Tech Interviews</h1>
                <br />
                <div>
                    <a href="#section-2"><button className="btn btn-1 btn-rounded">More About Us</button></a>
                    <a href="/firm-onboarding"><button className="btn btn-2 btn-rounded">Get Started</button></a>
                </div>
            </div>
            <div>
                <img src="intro-img-1.png" style={{ marginLeft: "auto", width: "90%" }}></img>
            </div>
        </div>
    )
}