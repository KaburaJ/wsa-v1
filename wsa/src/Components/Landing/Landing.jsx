import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
    const navigate = useNavigate();

    const handleSignInClick = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        navigate('/home'); // Navigate to the home page
    };

    return (
        <div className="container" id="container">
            <div className="form-container sign-in">
                <form>
                    <h1>Sign In</h1>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button onClick={handleSignInClick}>Sign In</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-right">
                        <h1>Welcome back!</h1>
                        <p>Please enter your login details to access the dashboard</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
