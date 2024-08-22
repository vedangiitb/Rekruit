import React from "react";

export default function AcessDenied() {
    return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "5%" }}>
        <h4>Access Denied</h4>

        <p>Either the session Id does not exist or you do not have access to it!</p>
    </div>
}