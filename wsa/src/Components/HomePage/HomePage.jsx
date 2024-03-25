import React, { useEffect, useState } from "react";
import { FaPlug, FaUsers } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";

const HomePage = () => {
    const [isNavOpen, setNavOpen] = useState(true);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [deviceNumber, setDeviceNumber] = useState(0);
    const [deviceFeaturesModalOpen, setDeviceFeaturesModalOpen] = useState(false);
    const [filterParameter, setFilterParameter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Default to 5 users per page
    const [deviceCount, setDeviceCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true)
    const [showAllUsers, setShowAllUsers] = useState(false); // State to track if all users should be shown

    useEffect(() => {
        fetch('https://wsa-v1.onrender.com/devices-count')
            .then(res => res.json())
            .then(data => {setDeviceCount(data); setLoading(false)})
            .catch(err => console.error(err));

        fetch('https://wsa-v1.onrender.com/user-count')
            .then(res => res.json())
            .then(data => {setUserCount(data); setLoading(false);})
            .catch(err => console.error(err));
        fetch('https://wsa-v1.onrender.com/users')
            .then(res => res.json())
            .then(data => {setUsers(data); setLoading(false)})
            .catch(err => console.error(err));
    }, []);

    const handleFilterChange = (e) => {
        setFilterParameter(e.target.value);
        setCurrentPage(1); // Reset current page when filter changes
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
    return (
        <>
            <div className="box-container">
                <div className="box box1">
                    <div className="text">
                        <h2 className="topic-heading">{deviceCount}</h2>
                        <h2 className="topic">Registered Devices</h2>
                    </div>
                    <FaPlug style={{ color: "white", fontSize: "24px" }} />
                </div>
                <div className="box box2">
                    <div className="text">
                        <h2 className="topic-heading">{userCount}</h2>
                        <h2 className="topic">Registered Users</h2>
                    </div>
                    <FaUsers style={{ color: "white", fontSize: "24px" }} />
                </div>
                <div className="box box3">
                    <div className="text">
                        <h2 className="topic-heading">0</h2>
                        <h2 className="topic">Active Users</h2>
                    </div>
                    <FaUsersLine style={{ color: "white", fontSize: "24px" }} />
                </div>
                <div className="box box4">
                    <div className="text">
                        <h2 className="topic-heading">0</h2>
                        <h2 className="topic">Connected Devices</h2>
                    </div>
                    <FaPlug style={{ color: "white", fontSize: "24px" }} />
                </div>
            </div>
            <div className="report-container">
                <div className="report-header">
                    <h1 className="recent-Articles">Clients</h1>
                    <button className="view" onClick={handleViewAllClick}>
                        View All
                    </button>
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
                            </tr>
                        </thead>
                        {loading ? (
                        <p>Loading...</p>
                        // <Spinner name="circle" style={{ marginLeft: "195%",marginTop:"20%", height:"40px",color: "#4FAAD1" }} />
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
                                    </tr>
                                ))
                            }
                        </tbody>)}
                    </table>
                </div>
            </div>
        </>
    )
}

export default HomePage