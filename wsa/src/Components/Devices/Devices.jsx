import React, { useEffect, useState } from "react";
import '../Home1/Home.css';
import axios from 'axios';
import { FaPlus, FaTrashCan, FaXmark } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import Spinner from 'react-spinkit'

const Devices = () => {
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [deviceFeaturesModalOpen, setDeviceFeaturesModalOpen] = useState(false);
    const [devices, setDevices] = useState([]);
    const [deviceName, setDeviceName] = useState('');
    const [deviceUUID, setDeviceUUID] = useState('');
    const [notes, setNotes] = useState('');
    const [sodiumHypochloriteValue, setSodiumHypochloriteValue] = useState(null);
    const [hclValue, setHclValue] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            const response = await axios.get('https://wsa-v1.onrender.com/devices');
            setDevices(response.data);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };

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
            setLoading(false)
            alert('Device registered successfully!')
        } catch (error) {
            console.error('Error registering device:', error);
        }
    };

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const handleDeviceClick = async (device) => {
        setSelectedDevice(device.deviceName);
        setDeviceFeaturesModalOpen(true);
        try {
            const [sodiumHypochloriteResponse, hclResponse] = await Promise.all([
                axios.get(`https://wsa-v1.onrender.com/sodium-hypochlorite/${device.deviceUUID}`),
                axios.get(`https://wsa-v1.onrender.com/hcl/${device.deviceUUID}`)
            ]);
            setSodiumHypochloriteValue(sodiumHypochloriteResponse.data);
            setHclValue(hclResponse.data);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching additional device information:', error);
            alert('Error fetching additional device information')
        }
    };
    const handleDelete = async (Id) => {
        try {
            const response = await fetch(`https://wsa-v1.onrender.com/device/${Id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ deviceUUID: Id }),
            });
            if (response.ok) {
                console.log("Device deleted successfully");
                alert("Device deleted successfully")
            } else {
                console.error("Failed to delete device");
                alert("Failed to delete device")
            }
        } catch (error) {
            console.error("Failed to delete device:", error);
        }
    }
    const handleClose = () => {
        setDeviceFeaturesModalOpen(false)
        setSodiumHypochloriteValue(0)
        setHclValue(0)
    }
    return (
        <div>
            {showForm ? (<div className="add-user-form">
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
            </div>) : (
                <div className="report-container" style={{ marginTop: "-10px" }}>
                    <div className="report-header">
                        <h1 className="recent-Articles">Devices</h1>
                    </div>
                    {loading ? (<Spinner name="circle" style={{ marginLeft: "45%", marginTop: "10%", height: "40px", color: "#4FAAD1" }} />

                    ) : (<div className="report-body">
                        <table className="device-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>UUID</th>
                                    <th>Customer Name</th>
                                    <th>Status</th>
                                    {/* <th>Delete</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {devices.map((device, index) => (
                                    <tr key={index} className="device-row" onClick={() => handleDeviceClick(device)} style={{ cursor: "pointer" }}>
                                        <td>{device.deviceName}</td>
                                        <td>{device.deviceUUID}</td>
                                        <td style={{ maxWidth: "20px", padding:"20px" }}>{device.CustomerName || "-"}</td>
                                        <td className="label-tag" style={{padding:"20px"}}>Not Connected</td>
                                        {/* <td><FaTrashCan style={{ color: "red", cursor: "pointer" }} onClick={(device) => handleDelete(device.deviceUUID)} /></td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>)}
                </div>)}
            {deviceFeaturesModalOpen && selectedDevice && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "20px" }}>
                            <h2>{selectedDevice}</h2>
                            <FaXmark onClick={handleClose} style={{ color: "#0C2B7B", cursor: "pointer" }} />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Parameter</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <p>Loading...</p>
                            // <Spinner name="circle" style={{ marginLeft: "45%", marginTop: "10%", height: "40px", color: "#4FAAD1" }} />
                            ) : (
                                <tbody>
                                    {sodiumHypochloriteValue && (
                                        <>
                                            <tr>
                                                <td>Sodium Hypochlorite Actual Value</td>
                                                <td>{sodiumHypochloriteValue.SodiumHypochloriteActualValue}</td>
                                            </tr>
                                            <tr>
                                                <td>Sodium Hypochlorite Target Value</td>
                                                <td>{sodiumHypochloriteValue.SodiumHypochloriteTargetValue}</td>
                                            </tr>
                                        </>
                                    )}
                                    {hclValue && (
                                        <>
                                            <tr>
                                                <td>HCL Actual Value</td>
                                                <td>{hclValue.HCLActualValue}</td>
                                            </tr>
                                            <tr>
                                                <td>HCL Target Value</td>
                                                <td>{hclValue.HCLTargetValue}</td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>)}
                        </table>
                    </div>
                </div>
            )}
            {showForm ? (<FaMinus className="add-user-icon" onClick={handleShowForm} />) : (<FaPlus className="add-user-icon" onClick={handleShowForm} />)}
        </div>
    );
}

export default Devices;
