import React from "react";
import logoHenry from "../images/logoHenry.png";

export default function Footer(){
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.625rem",
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "10vh",
            backgroundColor: "var(--navbar-dark-mode)",
            textAlign: "center",
            color: "#fff",
            fontSize: "13px",
        }} >
            <a href="https://www.soyhenry.com/" target="_blank" rel="noreferrer">
                <img style={{width: "2rem"}} src={logoHenry} alt="Henry-logo" />
            </a>
            <span>HENRY LABS - <a href="https://lllariogonzalez.tech">Mario Gonzalez</a></span>
        </div>
    )
};
