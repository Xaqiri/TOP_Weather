import React from "react";
import "./styles/Body.css";

import LocationForm from "./LocationForm.js";


const Body = (props) => {
    const api_key = '8a5910e9d87b9b06f733d4de4979b649';
    
    return (
        <div id="body">
            <LocationForm api_key={api_key}/>
        </div>
    );
}

export default Body;