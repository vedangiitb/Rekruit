import React from "react";

export default function HomeSection3() {
    return (
        <div>
            <div className="home-section-3">
                <div className="sec-3-contents">
                    <h2 style={{ color: "#00289F" }}>Conduct Secure & Cheating Proof Interviews & Assessments</h2>
                    <h4>Say goodbye to Cheating and Fraudulent practices during interviews and technical assessments with Rekruit’s advanced, AI-powered cheating detection.</h4>

                    <h4>Our state-of-the-art technology monitors candidate behavior in real-time, identifying any irregularities or suspicious activities, from screen sharing to unauthorized assistance.</h4>

                    <h4>Keep your hiring process secure, maintain integrity, and make data-driven decisions with Rekruit’s AI-driven security features.</h4>
                    <a href="/firm-onboarding"><button className="btn btn-primary" style={{ color: "#00289F", backgroundColor: "white" }}>Know More</button></a>
                </div>

                <img className="sec-3-img" src="sec-3-img-1.png"></img>
            </div>

            <div className="home-section-3" style={{ flexDirection: "column" }}>
                <h2 style={{ color: "#00289F" }} className="s-3-t-small">The Ultimate Code Pair</h2>
                <div className="sec-3-s-2">
                    <img src="sec-3-img-2.png" className="sec-3-img-large" ></img>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                        <h2 style={{ color: "#00289F" }} className="s-3-t-large">The Ultimate Code Pair</h2>
                        <p><span style={{ color: "#00289F", fontWeight: "600" }}>Live Code Pairing:</span> Collaborate with candidates in a real-time coding environment. Evaluate their problem-solving skills, coding proficiency, and communication abilities in a practical setting.</p>
                        <p><span style={{ color: "#00289F", fontWeight: "600" }}>Seamless Interview Experience:</span> Conduct structured coding interviews directly on our platform. Our intuitive interface is designed for both interviewers and candidates, ensuring a smooth experience from start to finish.</p>
                        <p><span style={{ color: "#00289F", fontWeight: "600" }}>Support for 15+ Programming Languages:</span> No matter what tech stack you’re hiring for, we’ve got you covered. From JavaScript and Python to Rust and Go, our platform supports over 100 programming languages, enabling you to assess candidates in the languages that matter most to your team.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}