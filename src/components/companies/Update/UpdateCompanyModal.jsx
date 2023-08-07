import React, {forwardRef, useImperativeHandle, useState} from 'react';
import axios from "axios";
import Swal from "sweetalert2";

const UpdateCompanyModal = forwardRef((props, ref) => {
    // Expose functions to parent using useImperativeHandle
    const [formData, setFormData] = useState({
        company_name: '',
        status: '',
        id:'',
        object:'',
        user:{},
        user_id: '',
    });
    const errors={};
    const [errorss,setErrorss] = useState([]);
    useImperativeHandle(ref, () => ({
        setFormData: setFormData,
        resetErrors: () => {
            setErrorss([]);
        }
    }));
    function handleChange(evt) {
        const value = evt.target.value;
        setFormData((prevData) => ({
            ...prevData,
            [evt.target.name]: value,
        }))
    }
    const saveFormData = (id) => {
        axios.patch(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_UPDATE_COMPANY_DETAIL_URL+'/'+id, formData)
            .then((response) => {
                Swal.fire("success", response.data.message, "success");
                props.companies();
                props.updateDetailModal.hide();
            })
            .catch((error) => {
                setErrorss(error.response.data.errors);
            });
        }

    return (
       <>
           <div className="modal-content">
               <div className="modal-header">
                   <h5 className="modal-title" id="staticBackdropLabel">Update Details</h5>
                   <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div className="modal-body">

                   <div className="mb-3">
                       <label className="form-label">Company Name<sup className="text-danger"><b>*</b></sup></label>
                       <input
                       type="text"
                       className="form form-control"
                       value={formData.company_name}
                       onChange={e => setFormData({...formData, company_name: e.target.value})}
                       />
                       {errorss['company_name']
                           ?
                           <span className="text-danger">{errorss['company_name'][0]}</span>
                           :
                           ''
                       }
                   </div>
                   <div className="mb-3">
                       <label className="form-label">Company Status<sup className="text-danger"><b>*</b></sup></label>
                       <select name="status" onChange={handleChange} value={formData.status} className="form-select " aria-label="Default select example">
                           <option value="">-- Select Status --</option>
                           <option value="1">Active</option>
                           <option value="2">Inactive</option>
                       </select>
                       {errorss['status']
                           ?
                           <span className="text-danger">{errorss['status'][0]}</span>
                           :
                           ''
                       }




                   </div>

               </div>
               <div className="modal-footer">
                   <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                   <button type="button" onClick={()=>saveFormData(formData.id)}   className="btn btn-primary">Save</button>
               </div>
           </div>
       </>
    );
});


export default UpdateCompanyModal;