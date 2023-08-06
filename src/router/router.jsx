import {Navigate, Route, Routes} from "react-router-dom";
import Main from "../components/Main.jsx";
import Login from "../pages/Login.jsx";
import {useState} from "react";
import Dashboard from "../components/Dashboard.jsx";
import Companies from "../components/companies/Companies.jsx";
import Branches from "../components/branches/Branches.jsx";




function Router(props) {
    console.log(props.user)

    return (
        <div>
            <Routes>
                {/*Products Component name is Branch*/}
                <Route path="/" element={props.isLoggedIn===false ? <Navigate to="/login"></Navigate> : <Main component={<Dashboard></Dashboard>}></Main>}/>
                <Route path="/products" element={props.isLoggedIn===false ? <Navigate to="/login"></Navigate> : <Main component={<Branches></Branches>}></Main>}/>
                <Route path="/login" element={props.isLoggedIn===false ? <Login></Login> : <Navigate to="/"/>}/>
                <Route path="*" element={props.isLoggedIn===false ? <Navigate to='/login'></Navigate> : <Navigate to="/"/>}/>

            </Routes>
        </div>
    );
}

export default Router;
