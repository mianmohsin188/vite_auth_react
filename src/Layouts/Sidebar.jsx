import React from 'react';
import {Link} from "react-router-dom";
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
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-sidebar">
                <div
                    className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start text-white"
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
                            <Link  to="/companies" className="nav-link px-0 align-middle mb-1 " >
                                <i className="fa fa-home text-white"></i> <span
                                className="ms-1 d-none d-sm-inline text-white" >Companies</span></Link>
                        </li>:''}
                        {user_permissions.length>0 && user_permissions.includes('branches') ?
                        <li>
                            <Link to="/branches" className="nav-link px-0 align-middle">
                                <i className="fa fa-building text-white"></i> <span
                                className="ms-1 d-none d-sm-inline text-white">Branches</span></Link>
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
                    <hr/>
                    <div className="dropdown pb-4">
                        <a href="#"
                           className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                           id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30"
                                 className="rounded-circle"/>
                            <span className="d-none d-sm-inline mx-1">{user.name}</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                           {/* <li><a className="dropdown-item" href="#">New project...</a></li>
                            <li><a className="dropdown-item" href="#">Settings</a></li>
                            <li><a className="dropdown-item" href="#">Profile</a></li>*/}
                                {/*<li>
                                    <hr className="dropdown-divider"/>
                                </li>*/}
                            <li><a onClick={logout} className="dropdown-item"  href="#">Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Sidebar;