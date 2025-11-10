import React from "react";
import HeaderComponent from "../HeaderCompoent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponent";

const DefaultComponent = ({ children }) => {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <HeaderComponent />
            <main style={{ flex: 1 }}>{children}</main>
            <FooterComponent />
        </div>
    );
};

export default DefaultComponent;
