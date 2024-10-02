import React, { useState, useEffect } from 'react';

export default function HomeSection1() {
    const texts = [" Interviews", "Assessments", "Resume Screenings", "Hiring"];
    const [displayedText, setDisplayedText] = useState("");
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const typingSpeed = 100;
    const pauseTime = 2000;

    useEffect(() => {
        let typingTimeout;
        let charIndex = -1;

        const typeText = () => {
            if (charIndex < texts[currentTextIndex].length - 1) {
                charIndex++;
                setDisplayedText(prev => prev + texts[currentTextIndex][charIndex]);
                typingTimeout = setTimeout(typeText, typingSpeed);
            } else {
                clearTimeout(typingTimeout);
                setTimeout(() => {
                    setDisplayedText("");
                    setCurrentTextIndex(prev => (prev + 1) % texts.length);
                }, pauseTime);
            }
        };

        typeText();

        return () => clearTimeout(typingTimeout);
    }, [currentTextIndex]);



    return (
        <div className="home-section-1">
            <div className="text-content">
                <h1>Revolutionize Your Tech<h1 className="heading-item">{displayedText}<span className='cursor'>_</span></h1></h1>
                <h4>Streamline your hiring process with our cutting-edge assessment tools, designed to identify top talent with precision and efficiency and build your best tech team</h4>
                <div className="button-group">
                    <a href="/firm-onboarding"><button className="btn btn-primary" style={{ backgroundColor: "#00289F" }}>Get Started</button></a>
                    <a href="/firm-onboarding"><button className="btn btn-primary" style={{ color: "#00289F", backgroundColor: "white" }}>Book Demo</button></a>
                </div>
            </div>
            <div className="image-container">
                <img src="intro-img-1_n.png" alt="Tech interview illustration" className="intro-image" ></img>
            </div>
        </div>
    );
}
