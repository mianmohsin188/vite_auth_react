import React from "react";

function Navbar() {
    let user = JSON.parse(localStorage.getItem("user"));
    user==null?window.location.reload():user.name=user.name;
    let image_source="https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" +user.name+ "&rounded=true"
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
    }
    return (
        <>
            {/* A JSX comment */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Digitt</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className=" collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto ">

                            <li className="nav-item dropdown">

                                <a className="nav-link mx-2 dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                   role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={image_source} width="30" height="30"/> {user.name}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a className="dropdown-item" onClick={logout} href="#">Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>

    )
}
export default Navbar
