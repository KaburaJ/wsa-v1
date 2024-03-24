import React, { useState } from "react";
import './Home.css'
import logo from '../../Common/Assets/wsa-logo.png'
import { IoMdMenu } from "react-icons/io";
import { FaBell, FaEye, FaEyeSlash, FaMinus, FaPlug, FaPlus, FaSearch, FaTrash, FaUserCircle, FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings, MdDashboard } from "react-icons/md";
import { FaGear, FaTrashCan, FaUsersLine, FaXmark } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import Clients from "../Clients/Clients";
import Devices from "../Devices/Devices";
import HomePage from "../HomePage/HomePage";


const Home1 = () => {

    const [isNavOpen, setNavOpen] = useState(true);
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [deviceNumber, setDeviceNumber] = useState(0);
    const [deviceFeaturesModalOpen, setDeviceFeaturesModalOpen] = useState(false);
    const [filterParameter, setFilterParameter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);

    const handleFilterChange = (e) => {
        setFilterParameter(e.target.value);
    };

    const toggleNav = () => {
        setNavOpen(!isNavOpen)
    }

    const [isSelected, setSelected] = useState("home");

    const handleSelect = (name) => {
        setSelected(name)
    }
    const handleShowClick = () => {
        setShowPassword(!showPassword)
    }
    const handleShowForm = () => {
        setShowForm(!showForm)
    }
    const handleDeviceClick = (device, index) => {
        setSelectedDevice(device);
        setDeviceFeaturesModalOpen(true);
    };

    const deviceFeatures = {
        Device1: [
            { parameter: "WIFI Status", value: "OK" },
            { parameter: "Sodium Hypochlorite Target", value: "2.0ppm" },
            { parameter: "Sodium Hypochlorite Actual", value: "1.63ppm" },
            { parameter: "HCL Target", value: "2.0pH" },
            { parameter: "HCL Actual", value: "1.63pH" },
            { parameter: "Disinfectant", value: "OFF/ON" },
            { parameter: "pH", value: "OFF/ON" },
            { parameter: "Pool Volume in Cubic Meters", value: "1.0" },
            { parameter: "DisinfectantType", value: "HYPO SWIM OUTDOOR" },
            { parameter: "DisinfectantStrength g/L", value: "130" },
            { parameter: "Disinfectant Dosing Interval", value: "120 minutes" },
            { parameter: "pH Chemical", value: "Hydrochloric Acid" },
            { parameter: "pH Chemical Strength g/L", value: "500" },
            { parameter: "pH Dosing Interval", value: "30 minutes" },
            { parameter: "Bluetooth Name", value: "PM5886" },
            { parameter: "Security Pin", value: "DISABLED" },
            { parameter: "Wake Timer Control", value: "OFF" },
            { parameter: "Dosing Start Time", value: "5:00 AM" },
            { parameter: "Dosing Stop Time", value: "10:00PM" },
            { parameter: "WIFI Connection", value: "ON" },
            { parameter: "WIFI SSID", value: "SCL_AP" },
            { parameter: "WIFI Key", value: "12343dsfffd" },
            { parameter: "Account Name", value: "Test Account" },
            { parameter: "Server URL Address", value: "sdcloud.co.nz" },
            { parameter: "Device Name", value: "PM5886" },
            { parameter: "DPD Reagent mL Used", value: "529 Mililitres" },
            { parameter: "pH Reagent mL Used", value: "296 Mililitres" },
            { parameter: "Sodium Hypochlorite level", value: "24190.08 litres" },
            { parameter: "HCL Acid Level", value: "1961.20 litres" },
            { parameter: "Serial Number", value: "5886" },
            { parameter: "Disinfectant Pump mL/Minute", value: "200" },
            { parameter: "Disinfectant Minimum Dose PPM", value: "0.1" },
            { parameter: "DPD Reagent Dose uL", value: "100" },
            { parameter: "DPD Calibration Factor", value: "0.95" },
            { parameter: "pH Pump mL/Minute", value: "200" },
            { parameter: "pH Reagent Dose uL", value: "100" },
            { parameter: "pH Calibration Offset", value: "0.65" },
            { parameter: "DPD Reagent Steps Per mL", value: "4230" },
            { parameter: "DPD Reagent Suck uL", value: "0" },
            { parameter: "DPD Reagent Blow uL", value: "10" },
            { parameter: "DPD Mix Time in Seconds", value: "10" },
            { parameter: "pH Reagent Steps Per mL", value: "4230" },
            { parameter: "pH Reagent Suck uL", value: "0" },
            { parameter: "pH Reagent Blow uL", value: "10" },
            { parameter: "pH Mix Time in Seconds", value: "10" },
            { parameter: "Flush Time Time in Seconds", value: "15" },
            { parameter: "Sample Time in Seconds", value: "10" },

        ],
        Device2: [
            { parameter: "Feature A", value: "Value A" },
            { parameter: "Feature B", value: "Value B" },
            { parameter: "Feature C", value: "Value C" }
        ],
        Device3: [
            { parameter: "Feature X", value: "Value X" },
            { parameter: "Feature Y", value: "Value Y" },
            { parameter: "Feature Z", value: "Value Z" }
        ]
    };

    const filteredFeatures = selectedDevice ? deviceFeatures[selectedDevice].filter(feature => {
        if (!filterParameter) return true;
        return feature.parameter === filterParameter;
    }) : [];

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredFeatures.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(filteredFeatures.length / itemsPerPage);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);


    return (
        <>
            <header>
                <div className="logosec">
                    <img className="logo" src={logo} alt="wsa-logo"></img>
                    <IoMdMenu className="icn menuicn" onClick={toggleNav} style={{ color: "#0c007d" }} />
                </div>
                <div className="searchbar">
                    <input type="text" placeholder="Search" />
                    <div className="searchbtn">
                        <FaSearch className="icn srchicn" />
                    </div>
                </div>
                <div className="message">
                    <div className="circle" />
                    <FaBell className="icn" style={{ color: "#95BC4B" }} />
                    <div className="dp">
                        <FaUserCircle className="dpicn" />
                    </div>
                </div>
            </header>
            <div className={`main-container`}>
                <div className={`navcontainer ${isNavOpen ? "" : "navclose"}`}>
                    <nav className="nav">
                        <div className="nav-upper-options">
                            <div className={`nav-option ${isSelected && isSelected === 'home' ? 'option1' : ''}`} onClick={() => handleSelect("home")}>
                                <MdDashboard className="nav-img" />
                                <p> Dashboard</p>
                            </div>
                            <div className={`option2 nav-option ${isSelected && isSelected === 'users' ? 'option1' : ''}`} onClick={() => handleSelect("users")}>
                                <FaUsers className="nav-img" />
                                <p> Users</p>
                            </div>
                            <div className={`nav-option option3 ${isSelected && isSelected === 'devices' ? 'option1' : ''}`} onClick={() => handleSelect("devices")}>
                                <FaPlug className="nav-img" />
                                <p>Devices</p>
                            </div>
                            {/* <div className={`nav-option option6 ${isSelected && isSelected === 'settings' ? 'option1' : ''}`} onClick={() => handleSelect("settings")}>
                                <FaGear className="nav-img" />
                                <p> Settings</p>
                            </div> */}
                            <div className={`nav-option logout ${isSelected && isSelected === 'logout' ? 'option1' : ''}`} onClick={() => handleSelect("logout")}>
                                <RiLogoutCircleLine className="nav-img" />
                                <p>Logout</p>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="main">
                    <div className="searchbar2">
                        <input type="text" name="" id="" placeholder="Search" />
                        <div className="searchbtn">
                            <FaSearch className="icn srchicn" />
                        </div>
                    </div>
                    {isSelected === "home" && (
                        <HomePage/>
)}
                    {isSelected === "users" && (
                        <Clients/>
                        )}
                    {isSelected === "devices" && (
                        <Devices />
                    )}
                </div >
            </div >
        </>

    )
}

export default Home1