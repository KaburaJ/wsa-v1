import React, { useState } from "react";
import "./SideNav.css"
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbPlugConnected } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { FaUsersCog } from "react-icons/fa";
import { LiaUsersSolid } from "react-icons/lia";
import logo from '.././Assets/place-logo.png'
import { RiArrowDropDownFill } from "react-icons/ri";
import { FaMoon } from "react-icons/fa";

const SideNav = ({isSelected, handleSelect}) => {

    return (
        <div className="side">
            <div className="side-header-main">
                <img className="logo" src={logo}></img>
                <FaMoon className="admin-logo-drop-1" />
            </div>
            <div className="side-header">
                <div className="side-header-1">
                    <RxDashboard className="admin-logo-1" />
                    <p>Dashboard</p>
                </div>
                <div className="side-icons">
                    <MdOutlineAdminPanelSettings className="admin-logo" />
                    <RiArrowDropDownFill className="admin-logo-drop" style={{ marginLeft: "-18px" }} />
                </div>
            </div>
            <div className={`side-header-2-top ${isSelected && isSelected === "home" ? "selected" : ""}`} onClick={() => handleSelect("home")}>
                <IoHomeOutline className="admin-logo-1" />
                <p>Home</p>
            </div>

            <div className={`side-header-2 ${isSelected && isSelected ==="devices" ? "selected" : ""}`} onClick={() => handleSelect("devices")}>
                <TbPlugConnected className="admin-logo-1" />
                <p>Devices</p>
            </div>
            <div className={`side-header-2 ${isSelected && isSelected ==="users" ? "selected" : ""}`} onClick={() => handleSelect("users")}>
                <LiaUsersSolid className="admin-logo-1" />
                <p>Users</p>
            </div>
            <div className={`side-header-2 ${isSelected && isSelected ==="account" ? "selected" : ""}`} onClick={() => handleSelect("account")}>
                <FaUsersCog className="admin-logo-1" />
                <p>Add Account</p>
            </div>
            <div className="side-header-buttons">
                <div className="side-header-button">
                    <button className="button">Restart</button>
                </div>
                <div className="side-header-button">
                    <button className="button">Exit</button>
                </div>
            </div>
        </div>
    );
}

export default SideNav;
