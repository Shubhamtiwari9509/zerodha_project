import React, { useState, useEffect } from "react";
import axios from "axios";
const BACKEND_URL=process.env.BACKEND_URL;
const FRONTEND_URL=process.env.FRONTEND_URL;
const Summary = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get(`${BACKEND_URL}/check-auth`, { withCredentials: true })
      .then(res => {
        if (res.data.authenticated) {
          setUsername(res.data.user.username);
        } else {
          window.location.href = `${FRONTEND_URL}/Login`;
        }
      })
      .catch(err => {
        console.error('Auth check failed:', err);
        window.location.href =  `${FRONTEND_URL}/Login`;
      });
  }, []);

  return (
    <>
      <div className="username">
        <h6>Hi, {username}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span><p>Equity</p></span>
        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />
          <div className="second">
            <p>Margins used <span>0</span></p>
            <p>Opening balance <span>3.74k</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span><p>Holdings (13)</p></span>
        <div className="data">
          <div className="first">
            <h3 className="profit">1.55k <small>+5.20%</small></h3>
            <p>P&L</p>
          </div>
          <hr />
          <div className="second">
            <p>Current Value <span>31.43k</span></p>
            <p>Investment <span>29.88k</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;