
import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Router from "./router/router.jsx";
import {useState} from "react";
import Main from "./components/Main.jsx";

function App() {
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token')!==null?true:false);
    const userDetail = (localStorage.getItem('user')!==null?JSON.parse(localStorage.getItem('user')):null);

    return (
    <>
        <Router isLoggedIn={isLoggedIn} user={user} setIsLoggedIn={setIsLoggedIn}></Router>
    </>
  )
}

export default App
