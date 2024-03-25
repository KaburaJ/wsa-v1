import React, { useEffect, useState } from "react";
import '../Home1/Home.css'
import { FaEye, FaEyeSlash, FaMinus, FaPlus } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Spinner from "react-spinkit";

const Clients = () => {
  const [isNavOpen, setNavOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceNumber, setDeviceNumber] = useState(0);
  const [deviceFeaturesModalOpen, setDeviceFeaturesModalOpen] = useState(false);
  const [filterParameter, setFilterParameter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deviceCount, setDeviceCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [showAllUsers, setShowAllUsers] = useState(true);
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    AccountName: "",
    AccountPassword: "",
    CustomerName: "",
    Phone1: "",
    Phone2: "",
    Email1: "",
    Email2: "",
    Email3: "",
    Email4: "",
    Notes: ""
  });

  useEffect(() => {
    fetch('https://wsa-v1.onrender.com/devices-count')
      .then(res => res.json())
      .then(data => setDeviceCount(data))
      .catch(err => console.error(err));

    fetch('https://wsa-v1.onrender.com/user-count')
      .then(res => res.json())
      .then(data => setUserCount(data))
      .catch(err => console.error(err));
    fetch('https://wsa-v1.onrender.com/users')
      .then(res => res.json())
      .then(data => {setUsers(data); setLoading(false)})
      .catch(err => console.error(err));
  }, []);

  const handleFilterChange = (e) => {
    setFilterParameter(e.target.value);
    setCurrentPage(1);
  };

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  const handleShowClick = () => {
    setShowPassword(!showPassword);
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleDeviceClick = (device, index) => {
    setSelectedDevice(device);
    setDeviceFeaturesModalOpen(true);
  };

  const handleViewAllClick = () => {
    setShowAllUsers(true);
    setItemsPerPage(users.length);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://wsa-v1.onrender.com/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("User registered successfully");
        alert("User registered successfully")
      } else {
        console.error("Failed to register user");
        alert("Failed to register user")
      }
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  const handleDelete = async(accountId) => {
    try {
      const response = await fetch(`https://wsa-v1.onrender.com/user/${accountId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({accountId: accountId}),
      });
      if (response.ok) {
        console.log("User deleted successfully");
        alert("User deleted successfully")
      } else {
        console.error("Failed to delete user");
        alert("Failed to delete user")
      }
    } catch (error) {
      
    }
  }

  return (
    <>
      {showForm ? (
        <div className="report-container" style={{ marginTop: "10px" }}>
          <div className="report-header">
            <h1 className="recent-Articles">Active Users</h1>
            {/* <button className="view">View All</button> */}
          </div>
          <div className="report-body">
            <table className="items">
              <thead>
                <tr>
                  <th>Account Name</th>
                  <th>Customer Name</th>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Created At</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {loading ? (<Spinner name="circle" style={{ marginLeft: "195%",marginTop:"20%", height:"40px",color: "#4FAAD1" }} />
              ):(
              <tbody>
                {showAllUsers
                  ? users.slice(0, itemsPerPage).map(user => (
                    <tr key={user.Id}>
                      <td>{user.AccountName}</td>
                      <td>{user.CustomerName}</td>
                      <td>{user.Id}</td>
                      <td>{user.Email1}</td>
                      <td>{user.Phone1}</td>
                      <td>{user.createdAt}</td>
                      <td className="label-tag">Not Connected</td>
                      <td><FaTrashCan onClick={(user)=>handleDelete(user.Id)} style={{cursor:"pointer", color:"red"}}/></td>
                    </tr>
                  ))
                  : users.map(user => (
                    <tr key={user.Id}>
                      <td>{user.AccountName}</td>
                      <td>{user.CustomerName}</td>
                      <td>{user.Id}</td>
                      <td>{user.Email1}</td>
                      <td>{user.Phone1}</td>
                      <td>{user.createdAt}</td>
                      <td className="label-tag">Not Connected</td>
                      <td><FaTrashCan onClick={handleDelete(user.Id)} style={{color:"red"}}/></td>
                    </tr>
                  ))
                }
              </tbody>)}
            </table>


          </div>
        </div>) : (<div className="add-user-form">
          <form className="add-user" onSubmit={handleSubmit}>
            <h3>Add User</h3>
            <input
              placeholder="Account Name"
              type="text"
              name="AccountName"
              value={formData.AccountName}
              onChange={handleChange}
              required
            />
            {/* <div className="pass-section"> */}
            <input
              placeholder="Account Password"
              type="password"
              name="AccountPassword"
              value={formData.AccountPassword}
              onChange={handleChange}
              required
            />
            {/* {showPassword ? (
                <FaEyeSlash className="pass-icon" onClick={handleShowClick} />
              ) : (
                <FaEye className="pass-icon" onClick={handleShowClick} />
              )} */}
            {/* </div> */}
            <input
              placeholder="Customer Name"
              type="text"
              name="CustomerName"
              value={formData.CustomerName}
              onChange={handleChange}
              required
            />
            <input
              placeholder="Phone 1"
              type="tel"
              name="Phone1"
              value={formData.Phone1}
              onChange={handleChange}
              required
            />
            <input
              placeholder="Phone 2"
              type="tel"
              name="Phone2"
              value={formData.Phone2}
              onChange={handleChange}
            />
            <input
              placeholder="Email 1"
              type="email"
              name="Email1"
              value={formData.Email1}
              onChange={handleChange}
              required
            />
            <input
              placeholder="Email 2"
              type="email"
              name="Email2"
              value={formData.Email2}
              onChange={handleChange}
            />
            <input
              placeholder="Email 3"
              type="email"
              name="Email3"
              value={formData.Email3}
              onChange={handleChange}
            />
            <input
              placeholder="Email 4"
              type="email"
              name="Email4"
              value={formData.Email4}
              onChange={handleChange}
            />
            <textarea
              placeholder="Notes"
              name="Notes"
              value={formData.Notes}
              onChange={handleChange}
            />
            <button type="submit" className="add-user-button">
              Add User
            </button>
          </form>
        </div>)}
      {showForm ? (<FaPlus className="add-user-icon" onClick={handleShowForm} />) : (<FaMinus className="add-user-icon" onClick={handleShowForm} />)}
    </>
  );
}

export default Clients;
