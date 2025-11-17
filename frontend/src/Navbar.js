import React from 'react';
import { Link } from 'react-router-dom';
const BACKEND_URL = process.env.BACKEND_URL;
function Navbar() {
    return ( 
        <nav
      class="navbar navbar-expand-lg border-bottom  fixed-top "
      style={{ backgroundColor: "#FFF" }}
    >
      <div class="container p-2">
        <Link class="navbar-brand" to="/">
          <img
            src="media/images/logo.svg"
            style={{ width: "25%" }}
            alt="Logo"
          />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="d-flex" role="search">
            <ul class="navbar-nav mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to= {`${BACKEND_URL}/signup`}>
                 Signup
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to={`${BACKEND_URL}/login`}>
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="AboutPage">
                  About
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="Products">
                  Product
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="Pricing">
                  Pricing
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="Support">
                  Support
                </Link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
     );
}

export default Navbar;