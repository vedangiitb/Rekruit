import React from "react";
import HomeSection1 from "../Components/Home/HomeSection1";
import HomeSection2 from "../Components/Home/HomeSection2";
import HomeSection3 from "../Components/Home/HomeSection3";
import HomeSection4 from "../Components/Home/HomeSection4";
import HomeSection5 from "../Components/Home/HomeSection5";
import '../Styles/HomeStyles.css'

export default function Home() {
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", color: "white" }}>
            <HomeSection1 />

            <HomeSection2 />

            <HomeSection3 />

            <HomeSection4 />

            <HomeSection5 />
        </div>
    )
}