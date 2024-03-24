import React from "react";
import './Home.css'
import show from '../../Common/Assets/showing.png'
import show1 from '../../Common/Assets/showing1.png'

const Base = ({ numberOfDevices }) => {
    const percentage = (numberOfDevices / 100) * 100;

    return (
        <div className="home-main">
            <h1>Home</h1>
            <div className="row-1">
                <div className="card-0">
                <div className="card-3">
                    <img src={show}></img>
                </div>
                {/* <div className="card-3">
                    <img src={show1}></img>
                </div> */}
                </div>
                <div className="card-1">
                    <div className="percent">
                        <svg>
                            <circle cx="70" cy="70" r="70"></circle>
                            <circle cx="70" cy="70" r="70" style={{ strokeDashoffset: 440 - (440 * percentage) / 100 }}></circle>
                        </svg>
                        <div className="num">
                            <h2>{percentage}</h2>
                        </div>
                    </div>
                    <p>Number of Devices Connected</p>
                    <div className="percent">
                        <svg>
                            <circle cx="70" cy="70" r="70"></circle>
                            <circle cx="70" cy="70" r="70" style={{ strokeDashoffset: 440 - (440 * percentage) / 100 }}></circle>
                        </svg>
                        <div className="num">
                            <h2>{percentage}</h2>
                        </div>
                    </div>
                    <p>Number of Clients Connected</p>
                </div>
            </div>
        </div>
    )
}

export default Base;
