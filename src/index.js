import React from "react";
import ReactDom from "react-dom";
import Nav from "./components/Nav.js";
import Body from "./components/Body.js";

ReactDom.render(
    <React.StrictMode>
        <Nav />
        <Body />
    </React.StrictMode>,
    document.getElementById("root")
);
