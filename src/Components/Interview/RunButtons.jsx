import React from "react";

export default function RunButtons({ sendCodeToServer, runTests }) {
    return (
        <div style={{ display: "flex", gap: "6px" }}>
            <button onClick={sendCodeToServer} type="button" className="btn btn-outline-primary" style={{ width: '10vw' }}>Run Code</button>
            <button onClick={runTests} type="button" className="btn btn-outline-primary" style={{ width: '10vw' }}>Run Tests</button>
        </div>
    )
}