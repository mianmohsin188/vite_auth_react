import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Login = ({ childern }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [errors,setErrors] = useState([]);
    const navigate = useNavigate();

    const handleLogin = () => {
        try {


            setErrors([]);
            setUser("");
            let url= import.meta.env.VITE_BASE_URL + import.meta.env.VITE_LOGIN_URL;
            axios.post(url,{
                username,
                password
            })
                .then((res)=>{
                    let token =(res.data.access_token);
                    localStorage.setItem("token","Bearer "+token);
                    axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_PROFILE_URL)
                        .then((responseUser)=>{
                      //  localStorage.setItem("token","Bearer "+token);
                        localStorage.setItem("user",JSON.stringify(responseUser.data.data));
                        window.location.reload();

                    }).catch((err)=>{
                        console.log(err);
                    })

                }).catch((err)=>{
                    console.log(err);
                if(err.response.data.errors.length==0){
                    err.response.data.errors['username']=err.response.data.message;
                    setErrors(err.response.data.errors);
                }
                else {
                    setErrors(err.response.data.errors);
                }

            })
        }
        catch (error){
            if (localStorage.getItem('token')!==null) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }


        // Assume login is successful

    };

    return (
        <div>
            <img className="mt-2" src="https://digitt.com.pk/wp-content/uploads/2022/10/Digitt-logo-png-1.png" width="200px" height="60px" alt=""/>
            <section className="vh-90">
                <div className="container py-5 h-100">

                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                 className="img-fluid" alt="Phone image"/>
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <h2 className="mb-4">Login</h2>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form1Example13">Email<sup className="text-danger"><b>*</b></sup></label>
                                <input type="email"
                                       value={username} id="form1Example13"
                                       placeholder="-- Enter Email address --"
                                       className="form-control form-control-lg"
                                       onChange={(e) => setUsername(e.target.value)}/>
                                <span className="text-danger">{errors['username']}</span>
                            </div>


                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form1Example23">Password<sup className="text-danger"><b>*</b></sup></label>
                                <input type="password"
                                       id="form1Example23"
                                       placeholder="-- Enter Password --"
                                       className="form-control form-control-lg"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}/>
                                <span className="text-danger">{errors['password']}</span>
                            </div>

                            {/*<div className="d-flex mb-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="form1Example3"/>
                                        <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                                    </div>
                                </div>*/}
                            <button  onClick={handleLogin} className=" btn btn btn-primary btn-lg w-100">Sign in</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
