import React from "react";
// import { withTheme } from "styled-components";
import Background from "../picture/testing.png";

const Home = ()=>{
    const myStyle ={
        backgroundImage: `url(${Background})` ,
        filter: 'brightness(75%)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    }

    const myStyle2 = {
        marginLeft: "40%",
        paddingTop: "20%",
        font: "bold",
        size: "24px",
        color: "white",
        textShadow: "rgba(255,255,255,0.5) 0 2px 2px",
        filter: 'brightness(100%)',
    }

    return (
        <div style={myStyle}>
            <h1 style={myStyle2}> Learn Coding with Fun </h1>
        </div>
        
    );
}

export default Home;