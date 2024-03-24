import React, { useState } from "react";
import "./Home.css"
import SideNav from "../../Common/SideNav/SideNav";
import Base from "./Base";
import Devices from "../Devices/Devices";
import Home1 from "../Home1/Home";

const Home = () => {
    const [isSelected, setSelected] = useState("home");

    const handleSelect = (name) => {
        setSelected(name)
    }
    return (
        <div className="home">
            {/* <SideNav isSelected={isSelected} handleSelect={handleSelect}/>
            {isSelected === "home" && (<Base numberOfDevices={5}/>)}
            {isSelected === "devices" && (<Devices/>)} */}
            <Home1/>
        </div>
    );
}

export default Home;
