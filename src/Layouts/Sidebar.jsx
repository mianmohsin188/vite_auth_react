import React from 'react';
import {Link, NavLink} from "react-router-dom";
import logo from "../assets/logo.png";
import companies from "../components/companies/Companies.jsx";


function Sidebar(props) {
    const {isLoggedIn} = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
    }
    var user_permissions = [];
    if(isLoggedIn!==null && user!==null){
    user_permissions=user.permissions.data.map((item)=>{
        return item.name;
    })
    }

    return (
        <>
            <div className="col-auto col-md-3 col-xl-2   bg-sidebar">
                <strong className="logo"><img src={logo} /></strong>
                <div
                    className=" nav flex-column">
                    <ul className="nav nav-pills flex-column"
                        id="menu">
                        {user_permissions.length>0 && user_permissions.includes('dashboard') ?
                        <li>

                            <Link to="/" data-bs-toggle="collapse"
                               className="nav-link px-0  text-white align-middle mb-1 "
                            >
                                <i className="fa fa-dashboard"></i> <span
                                className="ms-1 d-none d-sm-inline text-white ">Dashboard</span> </Link>

                        </li>:''}
                        {user_permissions.length>0 && user_permissions.includes('companies') ?
                        <li>
                            <NavLink activeClassName='is-active'  to="/companies" className="nav-link px-0 align-middle mb-1 " >
                                <i className="fa fa-home "></i> <span
                                className="ms-1 d-none d-sm-inline " >Companies</span></NavLink>
                        </li>:''}
                        {user_permissions.length>0 && user_permissions.includes('branches') ?
                        <li>
                            <NavLink activeClassName='is-active' to="/branches" className="nav-link px-0 align-middle">
                                <i className="fa fa-building "></i> <span
                                className="ms-1 d-none d-sm-inline ">Branches</span></NavLink>
                        </li>:''}
                      {/*  <li>
                            <a href="#submenu2" data-bs-toggle="collapse"
                               className="nav-link px-0 align-middle ">
                                <i className="fs-4 bi-bootstrap"></i> <span
                                className="ms-1 d-none d-sm-inline">Bootstrap</span></a>
                            <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                <li className="w-100">
                                    <a href="#" className="nav-link px-0"> <span
                                        className="d-none d-sm-inline">Item</span> 1</a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-0"> <span
                                        className="d-none d-sm-inline">Item</span> 2</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#submenu3" data-bs-toggle="collapse"
                               className="nav-link px-0 align-middle">
                                <i className="fs-4 bi-grid"></i> <span
                                className="ms-1 d-none d-sm-inline">Products</span> </a>
                            <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                                <li className="w-100">
                                    <a href="#" className="nav-link px-0"> <span
                                        className="d-none d-sm-inline">Product</span> 1</a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-0"> <span
                                        className="d-none d-sm-inline">Product</span> 2</a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-0"> <span
                                        className="d-none d-sm-inline">Product</span> 3</a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-0"> <span
                                        className="d-none d-sm-inline">Product</span> 4</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="nav-link px-0 align-middle">
                                <i className="fs-4 bi-people"></i> <span
                                className="ms-1 d-none d-sm-inline">Customers</span> </a>
                        </li>*/}
                    </ul>

                </div>
            </div>
        </>

    );
}

export default Sidebar;