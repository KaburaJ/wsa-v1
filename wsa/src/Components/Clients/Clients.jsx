import React, { useState } from "react";
import '../Home1/Home.css'
import { FaEye, FaEyeSlash, FaMinus, FaPlus } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const Clients = () => {
  const [isNavOpen, setNavOpen] = useState(true);
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceNumber, setDeviceNumber] = useState(0);
  const [deviceFeaturesModalOpen, setDeviceFeaturesModalOpen] = useState(false);
  const [filterParameter, setFilterParameter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  const handleFilterChange = (e) => {
    setFilterParameter(e.target.value);
    setCurrentPage(1); // Reset current page when filter changes
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
      { parameter: "WIFI Status", value: "OK" },
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
  const totalItems = filteredFeatures.length; // Total number of items
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFeatures.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      {showForm ? (
        <div className="report-container" style={{ marginTop: "10px" }}>
          <div className="report-header">
            <h1 className="recent-Articles">Active Users</h1>
            <button className="view">View All</button>
          </div>
          <div className="report-body">
            <div className="report-topic-heading">
              <h3 className="t-op">Name</h3>
              <h3 className="t-op">Username</h3>
              <h3 className="t-op">UserID</h3>
              <h3 className="t-op">Password</h3>
              <h3 className="t-op">Status</h3>
              <h3 className="t-op">Delete</h3>

            </div>
            <div className="items">
              <div className="item1">
                <h3 className="t-op-nextlvl">User 73</h3>
                <h3 className="t-op-nextlvl">User 73</h3>
                <h3 className="t-op-nextlvl">29kk29kk</h3>
                <h3 className="t-op-nextlvl">...............</h3>
                <h3 className="t-op-nextlvl label-tag">Connected</h3>
                <FaTrashCan style={{ color: "red", cursor: "pointer" }} />
              </div>
              <div className="item1">
              <h3 className="t-op-nextlvl">User 73</h3>
                <h3 className="t-op-nextlvl">User 73</h3>
                <h3 className="t-op-nextlvl">29kk29kk</h3>
                <h3 className="t-op-nextlvl">...............</h3>
                <h3 className="t-op-nextlvl label-tag">Connected</h3>
                <FaTrashCan style={{ color: "red", cursor: "pointer" }} />
              </div>
              <div className="item1">
              <h3 className="t-op-nextlvl">User 73</h3>
                <h3 className="t-op-nextlvl">User 73</h3>
                <h3 className="t-op-nextlvl">29kk29kk</h3>
                <h3 className="t-op-nextlvl">...............</h3>
                <h3 className="t-op-nextlvl label-tag">Connected</h3>
                <FaTrashCan style={{ color: "red", cursor: "pointer" }} />
              </div>
              <div className="item1">
              <h3 className="t-op-nextlvl">User 73</h3>
                <h3 className="t-op-nextlvl">User 73</h3>
                <h3 className="t-op-nextlvl">29kk29kk</h3>
                <h3 className="t-op-nextlvl">...............</h3>
                <h3 className="t-op-nextlvl label-tag">Connected</h3>
                <FaTrashCan style={{ color: "red", cursor: "pointer" }} />
              </div>
              <div className="item1">
                <h3 className="t-op-nextlvl">User 73</h3>
                <h3 className="t-op-nextlvl">User 73</h3>
                <h3 className="t-op-nextlvl">29kk29kk</h3>
                <h3 className="t-op-nextlvl">...............</h3>
                <h3 className="t-op-nextlvl label-tag">Connected</h3>
                <FaTrashCan style={{ color: "red", cursor: "pointer" }} />
              </div>
              <div className="item1">
                <h3 className="t-op-nextlvl">User 73</h3>
                <h3 className="t-op-nextlvl">User 73</h3>
                <h3 className="t-op-nextlvl">29kk29kk</h3>
                <h3 className="t-op-nextlvl">...............</h3>
                <h3 className="t-op-nextlvl label-tag">Connected</h3>
                <FaTrashCan style={{ color: "red", cursor: "pointer" }} />
              </div>
              <div className="item1">
                <h3 className="t-op-nextlvl">User 73</h3>
                <h3 className="t-op-nextlvl">User 73</h3>
                <h3 className="t-op-nextlvl">29kk29kk</h3>
                <h3 className="t-op-nextlvl">...............</h3>
                <h3 className="t-op-nextlvl label-tag">Connected</h3>
                <FaTrashCan style={{ color: "red", cursor: "pointer" }} />
              </div>
              <div className="item1">
                <h3 className="t-op-nextlvl">User 73</h3>
                <h3 className="t-op-nextlvl">User 73</h3>
                <h3 className="t-op-nextlvl">29kk29kk</h3>
                <h3 className="t-op-nextlvl">...............</h3>
                <h3 className="t-op-nextlvl label-tag">Connected</h3>
                <FaTrashCan style={{ color: "red", cursor: "pointer" }} />
              </div>
              <div className="item1">
                <h3 className="t-op-nextlvl">User 73</h3>
                <h3 className="t-op-nextlvl">User 73</h3>
                <h3 className="t-op-nextlvl">29kk29kk</h3>
                <h3 className="t-op-nextlvl">...............</h3>
                <h3 className="t-op-nextlvl label-tag">Connected</h3>
                <FaTrashCan style={{ color: "red", cursor: "pointer" }} />
              </div>
            </div>
          </div>
        </div>) : (<div className="add-user-form">
          <form className="add-user">
            <h3>Add User</h3>
            <input placeholder="Account Name" type="text" required></input>
            <div className="pass-section">
              {showPassword ? (<input placeholder="Account Password" type="password" required></input>) : (<input placeholder="Account Password" type="password" required></input>)}
              {showPassword ? (<FaEyeSlash className="pass-icon" onClick={handleShowClick} />) : (<FaEye className="pass-icon" onClick={handleShowClick} />)}</div>
            <input placeholder="Customer Name" type="text" required></input>
            <input placeholder="Phone 1" type="tel" required></input>
            <input placeholder="Phone 1" type="tel" ></input>
            <input placeholder="Email 1" type="email" required></input>
            <input placeholder="Email 2" type="email"></input>
            <input placeholder="Email 3" type="email"></input>
            <input placeholder="Email 4" type="email"></input>
            <textarea placeholder="Notes" ></textarea>
            <button className="add-user-button">Add User</button>

          </form>
        </div>)}
      {showForm ? (<FaPlus className="add-user-icon" onClick={handleShowForm} />) : (<FaMinus className="add-user-icon" onClick={handleShowForm} />)}
    </>
  );
}

export default Clients;
