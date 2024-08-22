import React from "react";

export default function HomeSection4() {
    return (
        <div className="HomeSection4">
            <h1 className="heading">Other Outstanding Rekruit Features</h1>
            <br />
            <div style={{ display: "flex" }}>

                <img src="sec-4-pic.png" className="home4Img rounded-img"></img>

                <div className="HomeSection4-Item-Container">
                    <div className="HomeSection4-Item">
                        <h1 className="heading-3">Advanced AI-Powered Cheating Detection</h1>
                        <p className="text">Say goodbye to cheating during interviews on Rekruit. Our cutting-edge AI technology swiftly detects any irregularities, ensuring integrity and fairness throughout the process.</p>
                    </div>

                    <div className="HomeSection4-Item">
                        <h1 className="heading-3">Seamless Scheduling Made Easy</h1>
                        <p className="text">Setting up interviews is as effortless as adding events to your calendar—because that's exactly what you're doing. With Rekruit, streamline your scheduling process for interviews with unparalleled simplicity.</p>
                    </div>

                    <div className="HomeSection4-Item" >
                        <h1 className="heading-3">The Best Code Pair</h1>
                        <p className="text">Our collaborative IDE feature ensures rapid, real-time coding sessions across a broad spectrum of programming languages. This versatile tool enhances the interview process by providing a dynamic platform for seamless teamwork and efficient coding exercises.</p>
                    </div>

                </div>
            </div>
        </div>
    )
}