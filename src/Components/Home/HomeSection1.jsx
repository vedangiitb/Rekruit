import React from "react";

export default function HomeSection1() {
    return (
        <div className="HomeSection1">
            <div className="text-content">
                <h1 className="heading">Revolutionizing Your Tech Interviews</h1>
                <p className="subheading">Streamline your hiring process with our cutting-edge assessment tools, designed to identify top talent with precision and efficiency.</p>
                <div className="button-group">
                    {/* <a href="#section-2"><button className="btn btn-1 btn-rounded">More About Us</button></a> */}
                    <a href="/firm-onboarding"><button className="btn btn-1 btn-rounded">Get Started</button></a>
                </div>
            </div>
            <div className="image-container">
                <img src="intro-img-1_n.png" alt="Tech interview illustration" className="intro-image"></img>
            </div>
        </div>
    );
}
