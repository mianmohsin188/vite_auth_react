import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import illustration from "../assets/logoImg.svg";
import logo from "../assets/logo.png";
import axios from "axios";

const Login = ({ childern }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [user, setUser] = useState('');
    const [errors, setErrors] = useState([]);
    var [screen, setScreen] = useState(1);
    const navigate = useNavigate();
    const countdownTime = 1 * 60; // 5 minutes in seconds
    const [timeRemaining, setTimeRemaining] = useState(countdownTime);
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    var disableOTPSubmitButton = false;
    function updateCountdown() {
        const countdownElement = document.getElementById("countdown");
        const currentTime = Math.max(0, countdownTime - Math.floor((new Date().getTime() - startTime) / 1000));

        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;

        countdownElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (currentTime <= 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = "Time's up!";
        }
    }

    const enableOTPSubmitButton = () => {
        if(disableOTPSubmitButton){
            setErrors([]);
            let url = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_PRELOGIN_URL;
            axios.post(url, {
                username,
            })
                .then((res) => {
                    disableOTPSubmitButton=false;
                    setOtp('')
                    setTimeRemaining(countdownTime);

                })
                .catch(err => {
                    console.log(err);
                    if (err.response.data.errors.length == 0) {
                        errors['otp'] = err.response.data.message;
                        setErrors(errors);
                    } else {
                        setErrors(err.response.data.errors);
                    }
                })
        }

    }





        const handleLogin = () => {
            if (screen == 1) {
                try {
                    setErrors([]);
                    setUser("");
                    let url = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_PRELOGIN_URL;
                    axios.post(url, {
                        username,
                    })
                        .then((res) => {
                            screen = 2;
                            setScreen(2);
                            const countdownInterval = setInterval(() => {
                                setTimeRemaining(prevTime => Math.max(0, prevTime - 1));
                            }, 1000);

                            return () => clearInterval(countdownInterval);
                        })
                        .catch(err => {
                            console.log(err);
                            if (err.response.data.errors.length == 0) {
                                err.response.data.errors['username'] = err.response.data.message;
                                setErrors(error.response.data.errors);
                            } else {
                                setErrors(err.response.data.errors);
                            }
                        })

                } catch (error) {

                    if (localStorage.getItem('token') !== null) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                    }
                }
                // Assume login is successful
            }
            if (screen == 2) {
                try {

                    setErrors([]);
                    setUser("");
                    let url = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_VERIFYOTP_URL;
                    axios.post(url, {
                        otp,
                        username,
                    })
                        .then((res) => {
                            screen = 3;
                            setScreen(screen);
                            /*let token = (res.data.access_token);
                            localStorage.setItem("token", "Bearer " + token);*/
                        }).catch(err => {

                        if (err.response.data.errors.length == 0) {

                            errors['otp'] = err.response.data.message;
                            setErrors(errors);
                        } else {

                            setErrors(err.response.data.errors);
                        }
                    })
                } catch (error) {

                    if (error.response.data.errors.length == 0) {
                        error.response.data.errors['otp'] = err.response.data.message;
                        setErrors(error.response.data.errors);
                    } else {
                        setErrors(errpr.response.data.errors);
                    }
                    if (localStorage.getItem('token') !== null) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                    }
                }
                // Assume login is successful

            }
            if (screen == 3) {
                try {


                    setErrors([]);
                    setUser("");
                    let url = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_LOGIN_URL;
                    axios.post(url, {
                        username,
                        password
                    })
                        .then((res) => {
                            let token = (res.data.access_token);
                            localStorage.setItem("token", "Bearer " + token);
                            axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_PROFILE_URL)
                                .then((responseUser) => {
                                    //  localStorage.setItem("token","Bearer "+token);
                                    localStorage.setItem("user", JSON.stringify(responseUser.data.data));
                                    window.location.reload();

                                }).catch((err) => {
                                console.log(err);
                            })

                        }).catch((err) => {
                        console.log(err);
                        if (err.response.data.errors.length == 0) {
                            err.response.data.errors['password'] = err.response.data.message;
                            setErrors(err.response.data.errors);
                        } else {
                            setErrors(err.response.data.errors);
                        }

                    })
                } catch (error) {
                    if (localStorage.getItem('token') !== null) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                    }
                }
                // Assume login is successful
            }
        };


        return (
            <div>
                <section className="vh-100" style={{ backgroundColor: "#f5f5f5", overflow: "hidden" }}>
                    <div className="container py-5 h-100">

                        <div className="row d-flex align-items-center justify-content-center h-100">
                            <div className="col-md-8 col-lg-7 col-xl-6">
                                <img
                                    src={illustration}
                                    className="img-fluid" alt="Phone image"/>
                            </div>
                            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                                <div className="login-block move-right">
                                    <img  className="logo-login" src={logo} width="150px"/>
                                    <h2 >Login</h2>
                                    {screen == 1 ?
                                        <div className="form-outline mb-4">

                                            <input type="email"
                                                   value={username} id="form1Example13"
                                                   placeholder="-- Enter Email address --"
                                                   className="form-control form-control-lg"
                                                   onChange={(e) => setUsername(e.target.value)}/>
                                            <span className="text-danger">{errors['username']}</span>
                                        </div>
                                        : ''}
                                    {
                                        screen == 2
                                            ?
                                            <>
                                                <div className="form-outline mb-4">
                                                    {timeRemaining > 0 ? (
                                                        <>
                                                        <h4 className="expiry-time">
                                                           OTP Expires in   {minutes}:{seconds.toString().padStart(2, '0')}
                                                        </h4>
                                                            <input
                                                                type="number"
                                                                value={otp}
                                                                id="form1Example13"
                                                                placeholder="-- Enter OTP --"
                                                                className="form-control form-control-lg"
                                                                onChange={(e) => setOtp(e.target.value)}/>
                                                            <span className="text-danger">{errors['otp']}</span>


                                                        </>

                                                    ) : (

                                                        disableOTPSubmitButton= true,
                                                         <button onClick={enableOTPSubmitButton} className=" btn-refresh "> <i className="fa fa-refresh" aria-hidden="true"></i> Resend OTP </button>

                                                    )

                                                    }

                                                </div>



                                            </>
                                            :
                                            ''
                                    }

                                    {
                                        screen == 3 ?
                                            <div className="form-outline mb-4">
                                                <input type="password"
                                                       id="form1Example23"
                                                       placeholder="-- Enter Password --"
                                                       className="form-control form-control-lg"
                                                       value={password}
                                                       onChange={(e) => setPassword(e.target.value)}/>
                                                <span className="text-danger">{errors['password']}</span>
                                            </div>
                                            : ''
                                    }


                                    {/*<div className="d-flex mb-4">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="form1Example3"/>
                                            <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                                        </div>
                                    </div>*/}
                                    {
                                        disableOTPSubmitButton==false? <button onClick={handleLogin} className=" btn btn-primary btn-lg w-100">Sign in</button>:''
                                    }

                                    {/*<button  disableOTPSubmitButton onClick={handleLogin} className=" btn btn btn-primary btn-lg w-100">Sign in
                                    </button>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    };

    export default Login;

