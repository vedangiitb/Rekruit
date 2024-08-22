import React from 'react';
import '../Styles/LoadingScreen.css'
export default function LoadingScreen() {
    return (
        <div className="loading-screen">
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
            <h1 className="loading-text">Preparing your interview...</h1>
        </div>
    );
}


