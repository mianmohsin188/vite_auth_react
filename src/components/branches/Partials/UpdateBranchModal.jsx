import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Modal } from 'bootstrap';
import axios from "axios";
import * as sweetalert2 from "sweetalert2";
import Swal from "sweetalert2";
import data from "bootstrap/js/src/dom/data.js";
import modal from "bootstrap/js/src/modal.js"; // Import Bootstrap components

const UpdateBranchModal = forwardRef((props, ref) => {

    const [formData, setFormData] = useState({
        name: '',
        branch_address: '',
        maker_comment:'',
        company_id: '',
        companyName:'',
        no_of_employees: '',
        status: '',
    });
   const errors={};
    var[errorss,setErrorss] = useState([]);
    const [companies, setCompanies] = useState([]);

    const saveForm = () => {
        errorss=[];
        setErrorss(errorss);
        let screen_key_errors = ['name','company_id','status'];
            if (formData.name == '') {
                    let temp =[];
                 temp.push("Branch Name is required");
                errors['name']=temp;
            }

            if (formData.company_id == '') {
                let temp =[];
                temp.push('Company is required');
                errors['company_id']=temp;

            }
            if (formData.status == '') {
                let temp =[];
                temp.push('Status  is required');
                errors['status']=temp;
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
                axios.patch(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_ALL_BRANCHES_URL+"/"+formData.id, formData)
                    .then((response) => {
                        Swal.fire("Success", "Branch Updated Successfully", "success");
                        props.branches();
                        props.branchModal.hide();
                    }).catch(errors => {
                    errorss = errors.response.data.errors;
                    setErrorss(errorss);
                    })
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
     const handleFormReset = () => {
         setFormData({
             name: '',
             branch_address: '',
             maker_comment:'',
             company_id: '',
             companyName:'',
             no_of_employees: '',
             status: '',
         })
         setErrorss({});
     };
     const companyData = (companies) => {
         setCompanies(companies)
     }


     // Expose functions to parent using useImperativeHandle
     useImperativeHandle(ref, () => ({
         setCompaniesData:  companyData,
         resetErrors: handleFormReset,
         setFormData: setFormData

     }));

     return (
         <div>

             <div className="modal-content">
                 <div className="modal-header">
                     <h5 className="modal-title" id="staticBackdropLabel">Branch</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                 </div>
                 <div className="modal-body">
                     <div className="mb-3">
                         <label className="form-label">Branch Name<sup className="text-danger"><b>*</b></sup> </label>
                         <input
                             type="text"
                             name="name"
                             placeholder="-- Enter Branch Name --"
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
                         <label className="form-label">Branch Address</label>
                         <input
                             type="text"
                             name="branch_address"
                             placeholder="-- Enter Branch Address --"
                             className="form form-control"
                             value={formData.branch_address}
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
                     <label className="form-label">No of Employees<sup className="text-danger"><b>*</b></sup></label>
                     <input
                         type="number"
                         className="form form-control"
                         name="no_of_employees"
                         placeholder="-- Branch Employees --"
                         value={formData.no_of_employees}
                         onChange={handleInputChange}
                     />

                         { errorss['no_of_employees']
                             ?
                             <span className="text-danger">{errorss['no_of_employees'][0]}</span>
                             :
                             ''
                         }

                 </div>
                     <div className="mb-3">
                         <label className="form-label">Branch Status<sup className="text-danger"><b>*</b></sup></label>
                         <select name="status" onChange={handleChange} value={formData.status} className="form-select " aria-label="Default select example">
                             <option value="">-- Select Status --</option>
                             <option value="1">Active</option>
                             <option value="0">Inactive</option>
                         </select>
                         { errorss['status']
                             ?
                             <span className="text-danger">{errorss['status'][0]}</span>
                             :
                             ''
                         }


                     </div>
                     <div className="mb-3">
                         <label className="form-label">Company<sup className="text-danger"><b>*</b></sup></label>

                         <input
                             disabled
                             type="text"
                             className="form form-control"
                             name="companyName"
                             placeholder="-- Company Name --"
                             value={formData.companyName}
                         />

                         { errorss['companyName']
                             ?
                             <span className="text-danger">{errorss['no_of_employees'][0]}</span>
                             :
                             ''
                         }


                     </div>

                 </div>
                 <div className="modal-footer">
                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     <button type="button" onClick={()=>saveForm()}  className="btn btn-primary">Save</button>
                 </div>
             </div>

        </div>
    );
});

export default UpdateBranchModal;
