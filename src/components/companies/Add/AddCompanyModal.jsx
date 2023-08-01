import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Modal } from 'bootstrap';
import alert from "bootstrap/js/src/alert.js";
import axios from "axios";
import companies from "../Companies.jsx";
import * as sweetalert2 from "sweetalert2";
import Swal from "sweetalert2"; // Import Bootstrap components

const AddCompanyModal = forwardRef((props, ref) => {
    const [formData, setFormData] = useState({
        company_name: '',
        branch_name: '',
        department_name: '',
        designation_name: '',
        display_name: '',
        email: '',
        password: '',
        status: '',
        permissions: []
    });
   const errors={};
    const [errorss,setErrorss] = useState([]);
    const [screenStatus,setSreenStatus] = useState(1);

    const saveForm = (currentScreen) => {
        if (currentScreen == 1) {
           /* axios.post(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_ADD_COMPANY_URL, formData).
            then((response) => {
                console.log(response);
            }).catch((error) => {
                setErrorss( error.response.data.errors);
                return false
            })

            return false;*/


            let screen_key_errors = ['company_name', 'branch_name', 'department_name', 'designation_name'];
            if (formData.company_name == '') {
                    let temp =[];
                 temp.push("Company Name is required");
                errors['company_name']=temp;
            }
            if (formData.branch_name == '') {
                let temp =[];
                temp.push("Branch Name is required");
                errors['branch_name']=temp;
            }
            if (formData.department_name == '') {
                let temp =[];
                temp.push('Department Name is required');
                errors['department_name']=temp;

            }
            if (formData.designation_name == '') {
                let temp =[];
                temp.push('Designation Name is required');
                errors['designation_name']=temp;
//setErrors(errors);
            }
            setErrorss(errors);
            if(errors && Object.keys(errors).length>0) {
                screen_key_errors.forEach(value => {
                    if (Object.keys(errors).includes(value)) {
                        return false;
                    }
                })
            }
            else {
                setSreenStatus(2);
            }
        }
        if (currentScreen == 2) {
            console.log(screenStatus);



            let screen_key_errors = ['display_name', 'email', 'password', 'status'];
            console.log(formData.display_name);
            if (formData.display_name=="") {
                let temp =[];
                temp.push("Display Name is required");
                errors['display_name']=temp;

            }
            if (formData.email=='') {
                console.log(formData.email)
                let temp =[];
                temp.push("Email is required");
                errors['email']=temp;

            }
            if (formData.password=='') {
                let temp =[];
                temp.push("Password is required");
                errors['password']=temp;
            }
            if (formData.status=='') {
                let temp =[];
                temp.push("Status is required");
                errors['status']=temp;
            }
            console.log(errors);


            setErrorss(errors);
            if(errors && Object.keys(errors).length>0) {
                screen_key_errors.forEach(value => {
                    if (Object.keys(errors).includes(value)) {
                        return false;
                    }
                })
            }
            else {
                setSreenStatus(3);
            }
        }
        if (currentScreen == 3) {
            if (formData.permissions.length == 0) {
                let temp =[];
                temp.push("Please select at least one permission");
                errors['permissions']=temp;
            }
        }

        }



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleDropSelect = (e) => {
        const handleChange = (e) => {
            setFormData((prevData) => ({
                ...prevData,
                [e.target.name]: e.target.value
            }))
        };
    }


    const handleFormReset = () => {
        setFormData({
            company_name: '',
            branch_name: '',
            department_name: '',
            designation_name: '',
            display_name: "",
            email: '',
            password: '',
            status: '',
            permissions: []
        });
        setErrorss({});
        setSreenStatus(1);
    };


    // Expose functions to parent using useImperativeHandle
    useImperativeHandle(ref, () => ({
        getFormData:  formData,
        resetForm: handleFormReset,
    }));

    return (
        <div>
            {screenStatus==1?
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Company Details</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                    <div className="mb-3">
                    <label className="form-label">Company Name<sup className="text-danger"><b>*</b></sup></label>
                    <input
                        type="text"
                        className="form form-control"
                        name="company_name"
                        placeholder="-- Enter Company Name --"
                        value={formData.company_name}
                        onChange={handleInputChange}
                    />

                        { errorss['company_name']
                            ?
                            <span className="text-danger">{errorss['company_name'][0]}</span>
                            :
                            ''
                        }

                </div>

                    <div className="mb-3">
                        <label className="form-label">Branch Name<sup className="text-danger"><b>*</b></sup> </label>
                        <input
                            type="text"
                            name="branch_name"
                            placeholder="-- Enter Branch Name --"
                            className="form form-control"
                            value={formData.branch_name}
                            onChange={handleInputChange}
                        />
                        { errorss['branch_name']
                            ?
                            <span className="text-danger">{errorss['branch_name'][0]}</span>
                            :
                            ''
                        }
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Department Name<sup className="text-danger"><b>*</b></sup></label>
                        <input
                            type="text"
                            name="department_name"
                            placeholder="-- Enter Department Name --"
                            className="form form-control"
                            value={formData.department_name}
                            onChange={handleInputChange}
                        />
                        { errorss['department_name']
                            ?
                            <span className="text-danger">{errorss['department_name'][0]}</span>
                            :
                            ''
                        }

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Designation Name<sup className="text-danger"><b>*</b></sup></label>
                        <input
                            type="text"
                            name="designation_name"
                            placeholder="-- Enter Designation Name --"
                            className="form form-control"
                            value={formData.designation_name}
                            onChange={handleInputChange}
                        />
                        { errorss['designation_name']
                            ?
                            <span className="text-danger">{errorss['designation_name'][0]}</span>
                            :
                            ''
                        }
                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" onClick={()=>saveForm(1)}  className="btn btn-primary">Save</button>
                </div>
            </div>:''}
            {screenStatus==2?
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">User Details</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                    <div className="mb-3">
                        <label className="form-label">Display Name<sup className="text-danger"><b>*</b></sup></label>
                        <input
                            type="text"
                            className="form form-control"
                            name="display_name"
                            placeholder="-- Enter Display Name --"
                            value={formData.display_name}
                            onChange={handleInputChange}
                        />
                        { errorss['display_name']
                            ?
                        <span className="text-danger">{errorss['display_name'][0]}</span>
                            :
                            ''
                        }

                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email<sup className="text-danger"><b>*</b></sup> </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="-- Enter Email --"
                            className="form form-control"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        { errorss['email']
                            ?
                            <span className="text-danger">{errorss['email'][0]}</span>
                            :
                            ''
                        }
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password<sup className="text-danger"><b>*</b></sup></label>
                        <input
                            type="password"
                            name="password"
                            placeholder="-- Enter password--"
                            className="form form-control"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        { errorss['password']
                            ?
                            <span className="text-danger">{errorss['password'][0]}</span>
                            :
                            ''
                        }

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Status<sup className="text-danger"><b>*</b></sup></label>
                        {/*<input
                            type="text"
                            name="department_name"
                            placeholder="-- Enter Designation Name --"
                            className="form form-control mb-3"
                            value={formData.designation_name}
                            onChange={handleInputChange}
                        />*/}

                        <select onSelect={handleDropSelect} value={formData.status} className="form-select " aria-label="Default select example">
                            <option value="">-- Select Status --</option>
                            <option value="1">Active</option>
                            <option value="2">Inactive</option>
                        </select>
                        { errorss['status']
                            ?
                            <span className="text-danger">{errorss['status'][0]}</span>
                            :
                            ''
                        }


                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" onClick={()=>saveForm(2)}  className="btn btn-primary">Save</button>
                </div>
            </div>:''}
            {screenStatus==3?
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">User Permissions</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">



                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" onClick={()=>saveForm(3)} className="btn btn-primary">Save</button>
                </div>
            </div>:''}

        </div>
    );
});

export default AddCompanyModal;
