import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Modal } from 'bootstrap';
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
    const [screenStatus,setSreenStatus] = useState(3);
    const [groupedPermissionsList,setgroupedPermissionsList] = useState([]);

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
            let screen_key_errors = ['display_name', 'email', 'password', 'status'];

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
    function handleChange(evt) {
        const value = evt.target.value;
        setFormData((prevData) => ({
            ...prevData,
            [evt.target.name]: value,
        }))
    }
    function handleCheckChange(evt,index) {
        groupedPermissionsList.forEach((item) => {
           if((Object.keys(item)[0])==evt.target.value) {
               if (evt.target.checked) {
                   item[(Object.keys(item)[0])].map((value2, index2) => {
                       setFormData(
                           (prevData) => ({
                               ...prevData,
                               ...prevData.permissions.push(value2.permission_id)
                           }))
                   })
                   console.log(formData)
               }
               else {
                   // uncheck condition unselect all
                   console.log("Form Data Permisson::");
                   console.log(formData.permissions);
                   let finalPermission = formData.permissions;
                   console.log(evt.target.value);
                   console.log(Object.keys(item)[0]);
                   // formData.permissions = [];
                   // setFormData(
                   //     (prevData) => ({
                   //         ...prevData,
                   //         ...prevData.permissions = []
                   //     })
                   // )
                   // return false;
                   if((Object.keys(item)[0])==evt.target.value){

                       groupedPermissionsList.forEach((v,i)=>{
                         if((Object.keys(v)[0])==evt.target.value) {
                             console.log("Permission Name Matached");

                             let tempObject= v[(Object.keys(v)[0])];
                             console.log(tempObject.length)
                             if(tempObject.length>0) {

                                 let permissions_to_delete=[];
                                 let final_permissions=[];

                                 tempObject.forEach((key,ind) => {
                                     permissions_to_delete.push(key.permission_id);
                                 });

                                 // let permissions = ["XbPW7awNkzl83LD6","39n0Z12OZGKERJgW"]
                                 final_permissions = formData.permissions.filter(x => !permissions_to_delete.includes(x));

                                 console.log("final_permissions");

                                 formData.permissions=[];
                                 formData.permissions = final_permissions;
                                 setFormData(
                                     (prevData) => ({
                                         ...prevData,
                                         ...prevData.permissions=final_permissions
                                     }))

                                 console.log("formData.permissions");
                                 console.log(formData)

                                 return false;
                                 // formData.permissions.forEach((permissionID,j) =>{
                                 //     console.log("KEY");
                                 //     tempObject.forEach((key,ind) => {
                                 //         console.log(permissionID + " INDEX  :: " + j +" == " + key.permission_id);
                                 //         if(permissionID == key.permission_id)
                                 //         {
                                 //             finalPermission.push()
                                 //             console.log(key.permission_id + " Permission Matched!!!");
                                 //
                                 //             finalPermission.splice(j, 1);
                                 //             console.log("FINAL PERMISSION" + permissionID);
                                 //             console.log();
                                 //             // var index = formData.permissions.indexOf(permissionId);
                                 //             // console.log("INDEX" + index);
                                 //
                                 //             // if (index !== -1) {
                                 //             //     formData.permissions.splice(index, 1);
                                 //             //     console.log("FINAL PERMISSION" + permissionID);
                                 //             //     console.log(formData.permissions);
                                 //             // }
                                 //         }
                                 //     });
                                 // });



                                 // tempObject.map((value3, index3) => {
                                 //     formData.permissions.filter(e => !value3.permission_id.includes(e));
                                 //     // permissions_to_delete.push(value3.permission_id);
                                 // })


                                 return false;

                                 console.log(permissions_to_delete);
                                 final_permissions = formData.permissions.filter(e => !permissions_to_delete.includes(e));
                                console.log("final_permissions");
                                console.log(final_permissions);

                                 let blank_error =[];
                                 setFormData(
                                     (prevData) => ({
                                         ...prevData,
                                         ...prevData.permissions.push(blank_error)
                                     })
                                 )
                                 console.log(formData.permissions);
                                 return false;



                                 tempObject.map((value3, index3) => {
                                     let data = [];

                                    if(formData.permissions.includes(value3.permission_id)) {

                                        setFormData(
                                            (prevData) => ({
                                                ...prevData,
                                                ...prevData.permissions.filter(e => e != value3.permission_id)
                                            }))
                                        console.log(formData.permissions);
                                    }
                                 })
                             }
                            /* .map((value3, index3) => {
                                 console.log(value3.permission_id)
                                 alert(value3.permission_id);
                                 console.log(formData.permissions);
                                 setFormData(
                                     (prevData) => ({
                                         ...prevData,
                                         ...prevData.permissions.splice(value3.permission_id, 1)
                                     }))
                             })*/
                         }
                       });


                   }
                   /*item[(Object.keys(item))].map((value2, index2) => {
                       alert(evt.target.value);
                       if( (Object.keys(item))==evt.target.value && formData.permissions.includes(value2.permission_id)) {
                           setFormData(
                               (prevData) => ({
                                   ...prevData,
                                   ...prevData.permissions.splice(value2.permission_id, 1)
                               }));
                       }

                   })*/
               }
           }
          /* else{
               if (evt.target.checked) {
                   alert("dsfsdf")
                   item[(Object.keys(item))].map((value2, index2) => {
                       /!*if(formData.permissions.includes(evt.target.value)) {
                           formData.permissions.push(value2);
                       }*!/
                       setFormData(
                       (prevData) => ({
                           ...prevData,
                           permissions: [...prevData.permissions, value2.permission_id]
                       })
                       )
                   })

               }
               else
               {
                   item[(Object.keys(item))].map((value2, index2) => {
                       if(formData.permissions.includes(evt.target.value)) {
                     //      formData.permissions.splice(index2, 1);
                           setFormData(
                               (prevData) => ({
                                   ...prevData,
                                   permissions: [...prevData.permissions.splice(value2, 1)]
                               })
                           )
                       }

                   })
               }
           }*/
    });
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
        setSreenStatus(3);
    };



    const setPermissionsData = (permissions) => {
        setgroupedPermissionsList(permissions)
    }


    // Expose functions to parent using useImperativeHandle
    useImperativeHandle(ref, () => ({
        setPermissions:  setPermissionsData,
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

                        <select name="status" onChange={handleChange} value={formData.status} className="form-select " aria-label="Default select example">
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

                    {
                        groupedPermissionsList.map((value, index) => {
                            return (
                                <>
                                    <div className="card m-3">
                                        <h5 className="card-header">
                                            <label> <input className="form-check-input mb-1" type="checkbox" id={Object.keys(value)+'_'+index}  name={Object.keys(value)} value={(Object.keys(value))} onChange={()=>handleCheckChange(event,index)} /> {(Object.keys(value).toString()).charAt(0).toUpperCase() + (Object.keys(value).toString()).slice(1)}</label>
                                        </h5>
                                        <div className="card-body">
                                            <div className="row ">
                                            {
                                                value[(Object.keys(value))].length>0
                                                &&
                                                value[(Object.keys(value))].map((value2, index2) => {
                                                    return (

                                                        <div class="col-md-3  mb-2">
                                                            <label>
                                                            <input
                                                                className="form-check-input pt-1"
                                                                type="checkbox"
                                                                name={value2.name}
                                                                id={value[(Object.keys(value))]+'_'+index2}
                                                                checked={formData.permissions.includes(value2.permission_id)}
                                                                value={value2.permission_id}
                                                                onChange={handleCheckChange}
                                                            /> { value2.name }
                                                            </label>
                                                        </div>
                                                    )
                                                })
                                            }
                                            </div>


                                        </div>
                                    </div>

                                 </>

                            )
                        })
                    }

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" onClick={()=>saveForm(3)} className="btn btn-primary">Save</button>
                </div>
            </div>
                :
                ''
            }
        </div>
    );
});

export default AddCompanyModal;
