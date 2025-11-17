import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Menu.css';
const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
const FRONTEND_URL=process.env.REACT_APP_FRONTEND_URL;
const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    axios.get(`${BACKEND_URL}/check-auth`, { withCredentials: true })
      .then(res => {
        if (res.data.authenticated) {
          setUsername(res.data.user.username);
        } else {
          window.location.href =`${BACKEND_URL}/login`;
        }
      })
      .catch(err => {
        console.error('Auth check failed:', err);
        window.location.href =`${BACKEND_URL}/login`;
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile') && !e.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    axios.get(`${BACKEND_URL}/logout`, { withCredentials: true })
      .then(() => {
        window.location.href = `${FRONTEND_URL}/`;
      })
      .catch(err => {
        console.error('Logout failed:', err);
      });
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li><Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}><p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}><p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}><p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/positions" onClick={() => handleMenuClick(3)}><p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/funds" onClick={() => handleMenuClick(4)}><p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/apps" onClick={() => handleMenuClick(6)}><p className={selectedMenu === 6 ? activeMenuClass : menuClass}>Apps</p></Link></li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">{username.charAt(0).toUpperCase()}</div>
          <p className="username">{username}</p>
        </div>

        {isProfileDropdownOpen && (
          <div className="profile-dropdown">
            <ul>
              <li><Link to="/profile">My Profile</Link></li><br></br>
              <li><Link to="/settings">Settings</Link></li><br></br>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;