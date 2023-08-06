import React from 'react';
import {Link} from "react-router-dom";
import companies from "../components/companies/Companies.jsx";


function Sidebar(props) {
    const {isLoggedIn} = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));


    return (
        <>
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-sidebar">
                <div
                    className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start text-white"
                        id="menu">

                        <li>

                            <Link to="/" data-bs-toggle="collapse"
                               className="nav-link px-0  text-white align-middle mb-1 "
                            >
                                <i className="fa fa-dashboard"></i> <span
                                className="ms-1 d-none d-sm-inline text-white ">Dashboard</span> </Link>

                        </li>


                        <li>
                            <Link to="/products" className="nav-link px-0 align-middle">
                                <i className="fa fa-building text-white"></i> <span
                                className="ms-1 d-none d-sm-inline text-white">Products</span></Link>
                        </li>

                    </ul>
                    <hr/>
                    <div className="dropdown pb-4">
                        <a href="#"
                           className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                           id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30"
                                 className="rounded-circle"/>
                            <span className="d-none d-sm-inline mx-1">loser</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                            <li><a className="dropdown-item" href="#">New project...</a></li>
                            <li><a className="dropdown-item" href="#">Settings</a></li>
                            <li><a className="dropdown-item" href="#">Profile</a></li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li><a className="dropdown-item"  href="#">Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Sidebar;