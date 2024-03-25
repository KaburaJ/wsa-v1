import React, { useEffect, useState } from "react";
import '../Home1/Home.css'
import { FaEye, FaEyeSlash, FaMinus, FaPlus } from "react-icons/fa";
import { FaTrashCan, FaXmark } from "react-icons/fa6";
import axios from 'axios'
import { MdOutlineRoundaboutRight } from "react-icons/md";


const Devices = () => {
    const [isNavOpen, setNavOpen] = useState(true);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [deviceNumber, setDeviceNumber] = useState(0);
    const [deviceFeaturesModalOpen, setDeviceFeaturesModalOpen] = useState(false);
    const [filterParameter, setFilterParameter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [devices, setDevices] = useState([]);
    const [deviceName, setDeviceName] = useState('');
    const [deviceUUID, setDeviceUUID] = useState('');
    const [notes, setNotes] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        fetch('https://wsa-v1.onrender.com/devices')
            .then(res => res.json())
            .then(data => setDevices(data))
            .catch(err => console.error(err));
    }, []);


    const handleFilterChange = (e) => {
        setFilterParameter(e.target.value);
        setCurrentPage(1);
    };

    const toggleNav = () => {
        setNavOpen(!isNavOpen)
    }

    const handleShowClick = () => {
        setShowPassword(!showPassword)
    }

    const handleShowForm = () => {
        setShowForm(!showForm)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://wsa-v1.onrender.com/device', {
                deviceName,
                deviceUUID,
                notes
            });
            console.log(response.data);
            setDeviceName('');
            setDeviceUUID('');
            setNotes('');
            setAlertMessage('Device registered successfully!');
            alert('Device registered successfully!')
            setAlertMessage('');
        } catch (error) {
            console.error('Error registering device:', error);
        }
    };
    const handleDeviceClick = (device, index) => {
        setSelectedDevice(device.deviceName);
        setDeviceFeaturesModalOpen(true);
    };    

    const deviceFeatures = {
        device1: [
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
        <div>
            {showForm ? (
                <div className="add-user-form">
                    <form className="add-user" onSubmit={handleSubmit}>
                        <h3>Register Device</h3>
                        <input
                            placeholder="Device Name"
                            type="text"
                            value={deviceName}
                            onChange={(e) => setDeviceName(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Device UUID"
                            type="text"
                            value={deviceUUID}
                            onChange={(e) => setDeviceUUID(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        ></textarea>
                        <button type="submit" className="add-user-button" style={{ cursor: "pointer" }}>
                            Add Device
                        </button>
                    </form>
                </div>
            ) : (
                <>
                    <div className="report-container" style={{ marginTop: "-10px" }}>
                        <div className="report-header">
                            <h1 className="recent-Articles">Devices</h1>
                            <button className="view">View All</button>
                        </div>
                        <div className="report-body">
                            <table className="device-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>UUID</th>
                                        <th>Customer Name</th>
                                        <th>Status</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {devices.map((device, index) => (
                                        <tr key={index} className="device-row" onClick={() => handleDeviceClick(device, index)}>
                                            <td>{device.deviceName}</td>
                                            <td>{device.deviceUUID}</td>
                                            <td>{device.CustomerName || "-"}</td>
                                            <td className="label-tag">Not Connected</td>
                                            <td><FaTrashCan style={{ color: "red", cursor: "pointer" }} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {deviceFeaturesModalOpen && selectedDevice && deviceFeatures[selectedDevice] && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "20px" }}>
                                    <h2>{selectedDevice}</h2>
                                    <FaXmark onClick={() => setDeviceFeaturesModalOpen(false)} style={{ color: "#0C2B7B", cursor: "pointer" }} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    <div className="pagination">
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <button key={i} onClick={() => setCurrentPage(i + 1)} style={{ marginRight: "10px", marginBottom: "20px" }}>
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: "10px" }}>
                                        <select id="filter" onChange={handleFilterChange} value={filterParameter} style={{ border: "1px solid #dddddd", height: "38px", paddingLeft: "20px", borderRadius: "10px" }}>
                                            <option value="">All</option>
                                            {deviceFeatures[selectedDevice].map((feature, index) => (
                                                <option key={index} value={feature.parameter}>{feature.parameter}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Parameter</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deviceFeatures[selectedDevice].map((feature, index) => (
                                            <tr key={index}>
                                                <td>{feature.parameter}</td>
                                                <td>{feature.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}


                </>
            )}
            {showForm ? (<FaMinus className="add-user-icon" onClick={handleShowForm} />) : (<FaPlus className="add-user-icon" onClick={handleShowForm} />)}
        </div>
    );
}

export default Devices;
