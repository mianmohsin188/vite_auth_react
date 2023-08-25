import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Modal } from 'bootstrap';
import axios from "axios";
import * as sweetalert2 from "sweetalert2";
import Swal from "sweetalert2";
import data from "bootstrap/js/src/dom/data.js";
import modal from "bootstrap/js/src/modal.js"; // Import Bootstrap components


const AddDepartmentModal = forwardRef((props, ref) => {
const user = JSON.parse(localStorage.getItem('user'));
    const [formData, setFormData] = useState({
        name: '',
        branch_id: '',
        company_id: '',
        status: '',
    });
   const errors={};
    var[errorss,setErrorss] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [branches, setBranches] = useState([]);
    const [comments,setComments] = useState('');

    const saveForm = () => {
        errorss=[];
        if(user.user_type.slug=='maker') {
            formData.company_id = user.company;
            setFormData(formData);
        }


        setErrorss(errorss);
        let screen_key_errors = ['name','company_id','branch_id'];
            if (formData.name == '') {
                    let temp =[];
                 temp.push("Department Name is required");
                errors['name']=temp;
            }

            if (formData.company_id == '') {
                let temp =[];
                temp.push('Company is required');
                errors['company_id']=temp;

            }
        if (formData.branch_id == '') {
            let temp =[];
            temp.push('Branch is required');
            errors['branch_id']=temp;

        }
            if (formData.status == '') {
                let temp =[];
                temp.push('Status  is required');
                errors['status']=temp;
//setErrors(errors);
            }
            if(user.user_type.slug=='maker'){
                if(comments==''){
                    let temp =[];
                    temp.push('Maker comment is required');
                    errors['maker_comment']=temp;
                }

            }

            setErrorss(errors);
            if(errors && Object.keys(errors).length>0) {
                screen_key_errors.forEach(value => {
                    if (Object.keys(errors).includes(value)) {
                        console.log(errors);
                        return false;
                    }
                })
            }
            else {

               if ( user.user_type && (user.user_type.slug!='super-admin')&&(user.user_type.slug!='admin'))
               {
                   setFormData(formData.companyName = companyName);
                   formData.maker_comment=comments;
                   formData.operation=9;
                   formData.company_id=user.company
                   formData.operation_type=10;
                   setFormData(formData);
               }
               console.log(formData);
               axios.post(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_ALL_DEPARTMENT_URL, formData)
                    .then((response) => {
                        Swal.fire("Success", "Department Added Successfully", "success");
                        props.departments();
                        props.departmentAddModal.hide();
                    }).catch(errors => {
                    errorss = errors.response.data.errors;
                    setErrorss(errorss);
                    })
            }

        }

        const getBranch = (value) => {
            axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_ALL_BRANCHES_URL+"?skipPagination=true&company="+value)
                .then((response) => {
                    setBranches(response.data.data);
                })
        }




     const handleInputChange = (e) => {
         const { name, value } = e.target;
         setFormData((prevData) => ({
             ...prevData,
             [name]: value,
         }));
     };
    const handleCommentChange = (e) => {
        setComments(e.target.value);
    };
     function handleChange(evt) {
         const value = evt.target.value;
         setFormData((prevData) => ({
             ...prevData,
             [evt.target.name]: value,
         }));
     };
    function handleChangeCompany(evt) {
        const value = evt.target.value;
        setFormData((prevData) => ({
            ...prevData,
            [evt.target.name]: value,
        }));
        if(value!=='') {
            getBranch(value);
        }
    };
    function handleChangeBranch(evt) {
        const value = evt.target.value;
        setFormData((prevData) => ({
            ...prevData,
            [evt.target.name]: value,
        }));

    };
     const {companyName,setCompanyName} = useState('');
     const handleFormReset = () => {
         setFormData({
             name: '',
             branch_id: '',
             company_id: '',
             status: '',
         });
         setErrorss({});
         setCompanies([]);
         setBranches([]);
     };
     const companyData = (companies) => {
         setCompanies(companies)
     }
    const branchData = (branch) => {
        setBranches(branch)
    }


     // Expose functions to parent using useImperativeHandle
     useImperativeHandle(ref, () => ({
         setCompaniesData:  companyData,
         resetForm: handleFormReset,
         setCompanyId: (id) => {
             setFormData((prevData) => ({
                 ...prevData,
                 company_id: id,
             }));
         },
         setCompanyName: (name) => {
             setFormData((prevData) => ({
                 ...prevData,
                 companyName: name,
             }));
         }

     }));

     return (
         <div>

             <div className="modal-content">
                 <div className="modal-header">
                     <h5 className="modal-title" id="staticBackdropLabel">Department</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                 </div>
                 <div className="modal-body">
                     <div className="mb-3">
                         <label className="form-label">Department Name<sup className="text-danger"><b>*</b></sup> </label>
                         <input
                             type="text"
                             name="name"
                             placeholder="-- Enter Department Name --"
                             className="form form-control"
                             value={formData.name}
                             onChange={handleInputChange}
                         />
                         { errorss['name']
                             ?
                             <span className="text-danger">{errorss['name'][0]}</span>
                             :
                             ''
                         }
                     </div>

                     <div className="mb-3">
                         <label className="form-label">Department Status<sup className="text-danger"><b>*</b></sup></label>
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
                     {
                         (user.user_type && user.user_type.slug=='super-admin')
                         ?<>
                             <div className="mb-3">
                                 <label className="form-label">Company<sup className="text-danger"><b>*</b></sup></label>
                                 <select name="company_id" onChange={handleChangeCompany} value={formData.company_id} className="form-select " aria-label="Default select example">
                                     <option value="">-- Select Company --</option>
                                     {companies.map((company) => (
                                         <option  value={company.id}>{company.company_name}</option>
                                     ))}
                                 </select>
                                 { errorss['company_id']
                                     ?
                                     <span className="text-danger">{errorss['company_id'][0]}</span>
                                     :
                                     ''
                                 }


                             </div>
                                 {
                                     formData.company_id!==''?
                                     <div className="mb-3">
                                 <label className="form-label">Branches<sup className="text-danger"><b>*</b></sup></label>
                                 <select name="branch_id" onChange={handleChangeBranch} value={formData.branch_id} className="form-select " aria-label="Default select example">
                                     <option value="">-- Select Branch --</option>
                                     {branches.map((branch) => (
                                         <option  value={branch.id}>{branch.branch_name}</option>
                                     ))}
                                 </select>
                                 { errorss['branch_id']
                                     ?
                                     <span className="text-danger">{errorss['branch_id'][0]}</span>
                                     :
                                     ''
                                 }


                             </div>
                                         :
                                         ''
                                 }
                             </>
                          :
                             (user.user_type && user.user_type.slug=='admin')
                                 ?
                             <div className="mb-3">
                             </div>
                                 :
                                 <div className="mb-3">
                                     <label className="form-label">Company<sup className="text-danger"><b>*</b></sup></label>

                                     <input
                                         type="text"
                                         className="form form-control"
                                         name="comments"
                                         placeholder="-- Maker Comment --"
                                         value={comments}
                                         onChange={handleCommentChange}
                                     />

                                     { errorss['maker_comment']
                                         ?
                                         <span className="text-danger">{errorss['maker_comment'][0]}</span>
                                         :
                                         ''
                                     }


                                 </div>

                     }


                 </div>
                 <div className="modal-footer">
                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     <button type="button" onClick={()=>saveForm()}  className="btn btn-primary">Save</button>
                 </div>
             </div>

        </div>
    );
});

export default AddDepartmentModal;
