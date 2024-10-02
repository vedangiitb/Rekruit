import React from "react";

export default function HomeSection2() {
    return (
        <div className="home-section-2">
            <div>
                <h1>Why <span style={{ color: "#00289F" }}>Rekruit</span>?</h1>
                <h4><span style={{ color: "#00289F", fontWeight: "500" }}>Rekruit</span> is all in one package to hire the best talent from Screening to Interview, to build your next team</h4>

                <div className="section-2-menu">
                    <div style={{display:"flex"}}>
                        <img src="sec-2-img-1.png" className="sec-2-imgs"></img>
                        <div>
                            <h2 style={{ color: "#00289F" }}>Resume Screening</h2>
                            <p>Use <span style={{ color: "#00289F", fontWeight: "600" }}>Rescreen</span>, by Rekruit, to effortlessly screen and shortlist the best resumes from your talent pool.  <span style={{ color: "#00289F", fontWeight: "600" }}>Rescreen</span> helps you quickly filter out unqualified applicants and identify top talent using AI-driven analysis, enabling you to focus on candidates who match your job requirements.</p>
                            <a className="get-started">Get Started <span class="material-symbols-outlined">arrow_forward</span></a>
                        </div>
                    </div>

                    <br />

                    <div style={{display:"flex"}}>
                        <img src="sec-2-img-2.png" className="sec-2-imgs"></img>
                        <div>
                            <h2 style={{ color: "#00289F" }}>Screening Assessments</h2>
                            <p>Streamline your technical assessments with <span style={{ color: "#00289F", fontWeight: "600" }}>Rekruit Assess</span> and accurately evaluate your candidates' skills. <span style={{ color: "#00289F", fontWeight: "600" }}>Rekruit Assess</span> offers you to create  customizable, real-world tests that simulate on-the-job challenges, allowing you to gauge each candidate's technical abilities. </p>
                            <a className="get-started">Get Started <span class="material-symbols-outlined">arrow_forward</span></a>
                        </div>
                    </div>

                    <br />

                    <div style={{display:"flex"}}>
                        <img src="sec-2-img-3.png" className="sec-2-imgs"></img>
                        <div>
                            <h2 style={{ color: "#00289F" }}>Interview</h2>
                            <p>Get the best talent onboard with <span style={{ color: "#00289F", fontWeight: "600" }}>ReInt</span>, a comprehensive, structured interview solution.  <span style={{ color: "#00289F", fontWeight: "600" }}>ReInt</span> enables seamless, remote, or in-person interviews with built-in tools like real-time coding environments, collaborative whiteboards, and AI-driven insights</p>
                            <a className="get-started">Get Started <span class="material-symbols-outlined">arrow_forward</span></a>
                        </div>
                    </div>
                </div>
            </div>
            <img src="section-2-img.png" className="mt-auto sec-2-img"></img>
        </div>
    )
}