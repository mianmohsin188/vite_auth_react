import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {Modal} from "bootstrap";
import AddBranchModal from "../branches/Partials/AddBranchModal.jsx";
import UpdateBranchModal from "./Partials/UpdateBranchModal.jsx";

import {can} from "../../helpers/can.js";


function Branches(props) {
    const [branches, setBranches] = useState([]);
    const [meta, setMeta] = useState({});
    var [loader,setLoader] = useState(false);
    var [currentPage, setCurrentPage] = useState(1);
    const [companies, setCompanies] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    const [modal, setModal] = useState(null);
    const exampleModal = useRef();
    const branchModalRef = useRef();

    const [updateModal, setupdateModal] = useState(null);
    const branchUpdateModal = useRef();
    const branchUpdateModalRef = useRef();



    const getBranches = () => {
        setBranches([]);
        loader=true;
        setLoader(loader)
        axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_ALL_BRANCHES_URL+'?page='+currentPage+'&flag=false')
            .then((response) => {
                loader=false;
                setLoader(loader);
                setBranches(response.data.data);
                setMeta(response.data.meta);
                currentPage=response.data.meta.pagination.current_page
                setCurrentPage(currentPage);
                setPageCount(response.data.meta.pagination.total_pages);
            })
            .catch((error) => {
                loader=false;
                setLoader(loader);
                console.log(error);
            });
    }
    const getBranchesPending = () => {
        setBranches([]);
        loader=true;
        setLoader(loader)
        let formData={
            type:'pending',
            operation:9
        }
        axios.post(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_ALL_BRANCHES_URL+'/processed?page='+currentPage,formData)
            .then((response) => {
                loader=false;
                setLoader(loader);
                console.log(response.data.data);
                setBranches(response.data.data);
                setMeta(response.data.meta);
                currentPage=response.data.meta.pagination.current_page
                setCurrentPage(currentPage);
                setPageCount(response.data.meta.pagination.total_pages);
            })
            .catch((error) => {
                loader=false;
                setLoader(loader);
                console.log(error);
            });
    }
    const getBranchesRejected = () => {
        setBranches([]);
        loader=true;
        setLoader(loader)
        let formData={
            type:'rejected',
            operation:9
        }
        axios.post(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_ALL_BRANCHES_URL+'/processed?page='+currentPage,formData)
            .then((response) => {
                loader=false;
                setLoader(loader);
                setBranches(response.data.data);

                setMeta(response.data.meta);
                currentPage=response.data.meta.pagination.current_page
                setCurrentPage(currentPage);
                setPageCount(response.data.meta.pagination.total_pages);
            })
            .catch((error) => {
                loader=false;
                setLoader(loader);
                console.log(error);
            });
    }
    const getBranchesRejectedChecker = () => {
        setBranches([]);
        loader=true;
        setLoader(loader)
        let formData={
            type:'rejected',
            operation:9
        }
        axios.post(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_ALL_BRANCHES_URL+'/processed?page='+currentPage,formData)
            .then((response) => {
                loader=false;
                setLoader(loader);
                setBranches(response.data.data);
                delete response.data.data;
                setMeta(response.data.meta);
                currentPage=response.data.meta.pagination.current_page
                setCurrentPage(currentPage);
                setPageCount(response.data.meta.pagination.total_pages);
            })
            .catch((error) => {
                loader=false;
                setLoader(loader);
                console.log(error);
            });
    }
    const getBranchesPendingChecker = () => {
        setBranches([]);
        loader=true;
        setLoader(loader)
        let formData={
            type:'pending',
            operation:9
        }
        axios.post(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_ALL_BRANCHES_URL+'/processed?page='+currentPage,formData)
            .then((response) => {
                loader=false;
                setLoader(loader);
                setBranches(response.data.data);
                delete response.data.data;
                setMeta(response.data.meta);
                currentPage=response.data.meta.pagination.current_page
                setCurrentPage(currentPage);
                setPageCount(response.data.meta.pagination.total_pages);
            })
            .catch((error) => {
                loader=false;
                setLoader(loader);
                console.log(error);
            });
    }
    const getBranchesApprovedChecker = () => {
        setBranches([]);
        loader=true;
        setLoader(loader)
        let formData={
            type:'approved',
            operation:9
        }
        axios.post(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_ALL_BRANCHES_URL+'/processed?page='+currentPage,formData)
            .then((response) => {
                loader=false;
                setLoader(loader);
                setBranches(response.data.data);
                delete response.data.data;
                setMeta(response.data.meta);
                currentPage=response.data.meta.pagination.current_page
                setCurrentPage(currentPage);
                setPageCount(response.data.meta.pagination.total_pages);
            })
            .catch((error) => {
                loader=false;
                setLoader(loader);
                console.log(error);
            });
    }


    const getCompanies = () => {
        axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_ALL_COMPANIES_URL+'?flag=all')
            .then((response) => {
                setCompanies(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const addBranch = () => {

        branchModalRef.current.resetForm();
        modal.show();
        branchModalRef.current.setCompaniesData(companies);
        modal.show();
    }
    const editDetail = (branch) => {
        branchUpdateModalRef.current.resetErrors();
        branchUpdateModalRef.current.setCompaniesData(companies);
        branchUpdateModalRef.current.setFormData(previous => (
            {
            ...previous,
            id: branch.id
        }))
        branchUpdateModalRef.current.setFormData(previous => (
            {
            ...previous,
            branch_address: branch.branch_address==null?'':branch.branch_address
        }))
        branchUpdateModalRef.current.setFormData(previous => (
            {
            ...previous,
            no_of_employees: branch.no_of_employees==null?'':branch.no_of_employees
        }))


        branchUpdateModalRef.current.setFormData(previous => (
                {
                    ...previous,
                    name: branch.branch_name,
                    status: branch.status,
                    company_id: branch.company.id,
                    companyName: branch.company.name,
                }
            )
        );
        updateModal.show();
    }
    const checkerApprove= (branch) => {
        let formData = {
            id: branch.id,
            operation: branch.operation,
            operation_type: branch.operation_type,
            request_type:'approved',
            requested_status:"approved",
            checker_comment:""
        }
        Swal.fire({
            title: 'Process ',
            input: 'textarea',
            inputAttributes: {
                autocapitalize: 'off',
                placeholder: 'Reason',
                required: true,
            },
            inputValidator(inputValue, validationMessage) {
              if (inputValue==''){
                return 'You need to add a reason!'
              }
              else{
                  formData.checker_comment=inputValue
              }
            },
            showCancelButton: true,
            confirmButtonText: 'Save',
            showLoaderOnConfirm: true,
            confirmButtonColor:'#46a748',
            preConfirm: (inputValue) => {
                axios.post(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_CHECKER_APPROVE_BRANCH_URL,formData)
                    .then((response) => {
                        getBranchesPendingChecker();
                        Swal.fire({
                            icon: 'success',
                            title: 'Approved',
                        })
                    })
                    .catch((ex)=>{
                    Swal.fire('Error',ex.response.data.message,'error')
                    })
            },

        });

    }
    const checkerReject= (branch) => {
        console.log(branch);
        let formData = {
            id: branch.id,
            operation: branch.operation,
            operation_type: branch.operation_type,
            request_type:'rejected',
            requested_status:"rejected",
            checker_comment:""
        }
        Swal.fire({
            title: 'Process ',
            input: 'textarea',
            inputAttributes: {
                autocapitalize: 'off',
                placeholder: 'Reason',
                required: true,
            },
            inputValidator(inputValue, validationMessage) {
              if (inputValue==''){
                return 'You need to add a reason!'
              }
              else{
                  formData.checker_comment=inputValue
              }
            },
            showCancelButton: true,
            confirmButtonText: 'Save',
            showLoaderOnConfirm: true,
            confirmButtonColor:'#46a748',
            preConfirm: (inputValue) => {
                axios.post(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_CHECKER_APPROVE_BRANCH_URL,formData)
                    .then((response) => {
                        getBranchesPendingChecker();
                        Swal.fire({
                            icon: 'success',
                            title: 'Rejected',
                        })
                    })
                    .catch((ex)=>{
                    Swal.fire('Error',ex.response.data.message,'error')
                    })
            },

        });

    }

    useEffect(() => {
        {
            user.user_type.slug=='checker'? getBranchesPendingChecker():getBranches()
        }
        getCompanies()
        setModal(
            new Modal(exampleModal.current)
        ),
        setupdateModal(
            new Modal(branchUpdateModal.current)
        )
    }, []);

    return (
        <>
            <h2>Branches</h2>
            <div className="row">
                <div className="col-12">
                    <div>
                {/*<h6 className="center">Showing {meta.to } to {meta.from} of {meta.total}</h6>*/}
                    </div>
                </div>
                <div className="col-12">
                    { user.user_type.slug=='super-admin'?
                        <div className="fa fa-refresh bg-primary p-2 text-white" onClick={getBranches}></div>
                  :''
                    }

                    <div className="float-end">
                        {
                            can('add-branch')?
                            <button  type="button" onClick={()=>addBranch()} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Add Branch
                            </button>:''

                        }
                        {/*<button  type="button" onClick={()=>addBranch()} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Add Branch
                        </button>*/}
                    </div>
                </div>

            </div>
            {user.user_type.slug=='maker'?
                <>
                <ul className="nav nav-pills m-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button onClick={getBranches} className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">All Branches</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button onClick={getBranchesPending} className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Pending Request</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button onClick={getBranchesRejected} className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Reject Request</button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <table className="table border mb-0">
                            <thead className="table-light fw-semibold">
                            <tr className="align-middle">

                            </tr>
                            </thead>

                            <tbody>
                            {branches.length > 0 && branches.map((branch, index) => (

                                <tr key={branch.id} className="align-middle">

                                    <td>

                                        <div className="small text-medium-emphasis">
                                            <div className="fw-bold">{branch.company?branch.company.name:''}</div>
                                            <div><b>Branch Name : </b> {branch.branch_name}</div>
                                        </div>
                                    </td>
                                    <td >
                                        <b>Branch Address: </b>
                                        {branch.branch_address==null
                                            ?<div className="badge bg-danger">N/A</div>
                                            :
                                            branch.branch_address
                                        }
                                    </td>
                                    <td>
                                        <b>No. Of Employees: </b> {
                                        branch.no_of_employees==null
                                            ?
                                            <div className="badge bg-danger">N/A</div>
                                            :
                                            branch.no_of_employees
                                    }

                                    </td>
                                    <td>
                                        {branch.status==1?
                                            <span className="badge bg-success">Active</span>
                                            :
                                            <span className="badge bg-danger">InActive</span>
                                        }

                                    </td>

                                    <td>

                                        {
                                            can('update-branch')?
                                                <div>
                                                    <span data-bs-toggle="modal" data-bs-target="#branchUpdateModal" onClick={()=>editDetail(branch)}  className="fa fa-1x fa-pencil"></span>
                                                </div>
                                                :
                                                ""
                                        }
                                    </td>


                                </tr>
                            ))}

                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                       {/* <table className="table border mb-0">
                            <thead className="table-light fw-semibold">
                            <tr className="align-middle">

                            </tr>
                            </thead>

                            <tbody>
                            {branches.length > 0 && branches.map((branch, index) => (

                                <tr key={branch.id} className="align-middle">

                                    <td>

                                        <div className="small text-medium-emphasis">
                                            <div className="fw-bold">{branch.company?branch.company.name:''}</div>
                                            <div><b>Branch Name : </b> {branch.branch_name}</div>
                                        </div>
                                    </td>
                                    <td >
                                        <b>Branch Address: </b>
                                        {branch.branch_address==null
                                            ?<div className="badge bg-danger">N/A</div>
                                            :
                                            branch.branch_address
                                        }
                                    </td>
                                    <td>
                                        <b>No. Of Employees: </b> {
                                        branch.no_of_employees==null
                                            ?
                                            <div className="badge bg-danger">N/A</div>
                                            :
                                            branch.no_of_employees
                                    }

                                    </td>
                                    <td>
                                        {branch.status==1?
                                            <span className="badge bg-success">Active</span>
                                            :
                                            <span className="badge bg-danger">InActive</span>
                                        }

                                    </td>

                                    <td>

                                        {
                                            can('update-branch')?
                                                <div>
                                                    <span data-bs-toggle="modal" data-bs-target="#branchUpdateModal" onClick={()=>editDetail(branch)}  className="fa fa-1x fa-pencil"></span>
                                                </div>
                                                :
                                                ""
                                        }
                                    </td>


                                </tr>
                            ))}

                            </tbody>
                        </table>*/}
                        <table className="table border mb-0">
                            <thead className="table-light fw-semibold">
                            <tr className="align-middle">

                            </tr>
                            </thead>

                            <tbody>
                            {
                                branches.length > 0 && branches.map((branch, index) => (

                                    <tr key={branch.id} className="align-middle">

                                        <td>

                                            <div className="smal">
                                                <div className="fw-bold">{branch.data?branch.data.company.name:''}</div>
                                                <div><b>Branch Name : </b> {branch.data?branch.data.name:''}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <b>Branch Address:</b>
                                            {
                                                branch.data?branch.data.branch_address==null
                                                    ?
                                                    <div className="badge bg-danger">N/A</div>
                                                    :
                                                    branch.data?branch.data.branch_address
                                                        :
                                                        '':''

                                            }
                                            <div><b>No of Employees </b> :{branch.data?branch.data.no_of_employees:''} </div>
                                        </td>
                                        <td><b>Operation :</b> {branch.data?branch.operations?branch.operations.name:'':''}</td>
                                        <td>
                                            <b>Checker Name:</b> {branch.checker?branch.checker.name:''}
                                            <br/>
                                            <b>Checker Comment:</b> {branch.data?branch.data.checker_comment:''}
                                        </td>
                                        <td>
                                            <b>Maker Name:</b> {branch.maker?branch.maker.name:''}
                                            <br/>
                                            <b>Maker Comment:</b> {branch.maker_comment?branch.maker_comment:''}
                                        </td>
                                        <td>
                                            <span className="badge bg-warning">{branch.status}</span>

                                            </td>

                                    </tr>
                                ))

                            }
                            {
                                branches.length==0 &&
                                <tr>
                                    <td colSpan={5} className="text-center"> No Pending Request </td>
                                </tr>
                            }


                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                        <table className="table border mb-0">
                            <thead className="table-light fw-semibold">
                            <tr className="align-middle">

                            </tr>
                            </thead>

                            <tbody>
                            {
                                branches.length > 0 && branches.map((branch, index) => (

                                    <tr key={branch.id} className="align-middle">

                                        <td>

                                            <div className="smal">
                                                <div className="fw-bold">{branch.data?branch.data.company.name:''}</div>
                                                <div><b>Branch Name : </b> {branch.data?branch.data.name:''}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <b>Branch Address:</b>
                                            {
                                                branch.data?branch.data.branch_address==null
                                                    ?
                                                    <div className="badge bg-danger">N/A</div>
                                                    :
                                                    branch.data?branch.data.branch_address
                                                        :
                                                        '':''

                                            }
                                            <div><b>No of Employees </b> :{branch.data?branch.data.no_of_employees:''} </div>
                                        </td>
                                        <td><b>Operation :</b> {branch.data?branch.operations?branch.operations.name:'':''}</td>
                                        <td>
                                            <b>Checker Name:</b> {branch.checker?branch.checker.name:''}
                                            <br/>
                                            <b>Checker Comment:</b> {branch.checker_comment?branch.checker_comment:''}
                                        </td>
                                        <td>
                                            <b>Maker Name:</b> {branch.maker?branch.maker.name:''}
                                            <br/>
                                            <b>Maker Comment:</b> {branch.maker_comment?branch.maker_comment:''}
                                        </td>
                                        <td>
                                            <span className="badge bg-danger">{branch.status}</span>

                                        </td>

                                    </tr>
                                ))

                            }
                            {
                                branches.length==0 &&
                                <tr>
                                    <td colSpan={5} className="text-center"> No Pending Request </td>
                                </tr>
                            }


                            </tbody>
                        </table>
                    </div>
                </div>
                    </>
                    :user.user_type.slug=='super-admin'?
                    <div className="table-responsive mt-3">
                <table className="table border mb-0">
                    <thead className="table-light fw-semibold">
                    <tr className="align-middle">

                    </tr>
                    </thead>

                    <tbody>
                    {branches.length > 0 && branches.map((branch, index) => (

                        <tr key={branch.id} className="align-middle">

                            <td>

                                <div className="small text-medium-emphasis">
                                    <div className="fw-bold">{branch.company?branch.company.name:''}</div>
                                    <div><b>Branch Name : </b> {branch.branch_name}</div>
                                </div>
                            </td>
                            <td >
                                <b>Branch Address: </b>
                                {branch.branch_address==null
                                    ?<div className="badge bg-danger">N/A</div>
                                    :
                                    branch.branch_address
                                }
                            </td>
                            <td>
                                <b>No. Of Employees: </b> {
                                branch.no_of_employees==null
                                    ?
                                    <div className="badge bg-danger">N/A</div>
                                    :
                                    branch.no_of_employees
                            }

                            </td>
                            <td>
                                {branch.status==1?
                                    <span className="badge bg-success">Active</span>
                                    :
                                    <span className="badge bg-danger">InActive</span>
                                }

                            </td>

                            <td>

                                {
                                    can('update-branch')?
                                        <div>
                                            <span data-bs-toggle="modal" data-bs-target="#branchUpdateModal" onClick={()=>editDetail(branch)}  className="fa fa-1x fa-pencil"></span>
                                        </div>
                                        :
                                        ""
                                }
                            </td>


                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
                    :user.user_type.slug=='checker'?
                        <>
                            <ul className="nav nav-pills m-3" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button onClick={getBranchesPendingChecker} className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Pending Branches</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button onClick={getBranchesApprovedChecker} className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Approved Request</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button onClick={getBranchesRejectedChecker} className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Rejected Request</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                    <table className="table border mb-0">
                                        <thead className="table-light fw-semibold">
                                        <tr className="align-middle">

                                        </tr>
                                        </thead>

                                        <tbody>
                                        {
                                            branches.length > 0 && branches.map((branch, index) => (

                                            <tr key={branch.id} className="align-middle">

                                                <td>

                                                    <div className="smal">
                                                        <div className="fw-bold">{branch.data?branch.data.company.name:''}</div>
                                                        <div><b>Branch Name : </b> {branch.data?branch.data.name:''}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <b>Branch Address:</b>
                                                    {
                                                        branch.data?branch.data.branch_address==null
                                                        ?
                                                        <div className="badge bg-danger">N/A</div>
                                                        :
                                                        branch.data?branch.data.branch_address
                                                            :
                                                            '':''

                                                    }
                                                    <div><b>No of Employees </b> :{branch.data?branch.data.no_of_employees:''} </div>
                                                </td>
                                                <td><b>Operation :</b> {branch.data?branch.operations?branch.operations.name:'':''}</td>
                                                <td>
                                                    <b>Maker Name:</b> {branch.maker?branch.maker.name:''}
                                                    <br/>
                                                    <b>Maker Comment:</b> {branch.maker_comment?branch.maker_comment:''}
                                                </td>

                                                <td>

                                                    {
                                                        can('update-branch')?
                                                            <div className="justify-content-center">
                                                               <button  onClick={()=>checkerApprove(branch)}  className=" btn btn-primary accept"><i className="fa fa-check-circle"></i> Approve </button>
                                                               <button onClick={()=>checkerReject(branch)}  className="btn btn-primary reject "><i className="fa fa-times"></i> Reject </button>
                                                            </div>
                                                            :
                                                            ""
                                                    }
                                                </td>
                                            </tr>
                                        ))

                                        }
                                        {
                                            branches.length==0 &&
                                                <tr>
                                                    <td colSpan={5} className="text-center"> No Pending Request </td>
                                                </tr>
                                        }


                                        </tbody>
                                    </table>
                                </div>
                                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <table className="table border mb-0 table-responsive">
                                        <thead className="table-light fw-semibold">
                                        <tr className="align-middle">

                                        </tr>
                                        </thead>

                                        <tbody>
                                        {branches.length > 0 && branches.map((branch, index) => (

                                            <tr key={branch.id} className="align-middle">

                                                <td>

                                                    <div className="smal">
                                                        <div className="fw-bold">{branch.data?branch.data.company.name:''}</div>
                                                        <div><b>Branch Name : </b> {branch.data?branch.data.name:''}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <b>Branch Address:</b>
                                                    {
                                                        branch.data?branch.data.branch_address==null
                                                            ?
                                                            <div className="badge bg-danger">N/A</div>
                                                            :
                                                            branch.data?branch.data.branch_address
                                                                :
                                                                '':''
                                                    }
                                                    <div><b>No of Employees </b> :{branch.data?branch.data.no_of_employees:''} </div>
                                                </td>
                                                <td><b>Operation :</b> {branch.data?branch.operations?branch.operations.name:'':''}</td>
                                                <td>
                                                    <b>Checker Name:</b> {branch.checker?branch.checker.name:''}
                                                    <br/>
                                                    <b>Checker Comment:</b> {branch.checker?branch.checker_comment:''}
                                                </td>
                                                <td>
                                                    <b>Maker Name:</b> {branch.maker?branch.maker.name:''}
                                                    <br/>
                                                    <b>Maker Comment:</b> {branch.maker_comment?branch.maker_comment:''}
                                                </td>

                                                <td>
                                                    <span className="badge bg-success"><i className="fa fa-check-circle"></i> Approved</span>
                                                </td>


                                            </tr>
                                        ))}
                                        {
                                            branches.length==0 &&
                                            <tr>
                                                <td colSpan={5} className="text-center"> No Approved Request </td>
                                            </tr>
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                    <table className="table border mb-0 table-responsive">
                                        <thead className="table-light fw-semibold">
                                        <tr className="align-middle">

                                        </tr>
                                        </thead>

                                        <tbody>
                                        {branches.length > 0 && branches.map((branch, index) => (

                                            <tr key={branch.id} className="align-middle">

                                                <td>

                                                    <div className="smal">
                                                        <div className="fw-bold">{branch.data?branch.data.company.name:''}</div>
                                                        <div><b>Branch Name : </b> {branch.data?branch.data.name:''}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <b>Branch Address:</b>
                                                    {
                                                        branch.data?branch.data.branch_address==null
                                                            ?
                                                            <div className="badge bg-danger">N/A</div>
                                                            :
                                                            branch.data?branch.data.branch_address
                                                                :
                                                                '':''
                                                    }
                                                    <div><b>No of Employees </b> :{branch.data?branch.data.no_of_employees:''} </div>
                                                </td>
                                                <td><b>Operation :</b> {branch.data?branch.operations?branch.operations.name:'':''}</td>
                                                <td>
                                                    <b>Checker Name:</b> {branch.checker?branch.checker.name:''}
                                                    <br/>
                                                    <b>Checker Comment:</b> {branch.checker_comment?branch.checker_comment:''}
                                                </td>
                                                <td>
                                                    <b>Maker Name:</b> {branch.maker?branch.maker.name:''}
                                                    <br/>
                                                    <b>Maker Comment:</b> {branch.maker_comment?branch.maker_comment:''}
                                                </td>

                                                <td>
                                                    <span className="badge bg-danger"><i className="fa fa-times"></i> Rejected</span>
                                                </td>


                                            </tr>
                                        ))}
                                        {
                                            branches.length==0 &&
                                            <tr>
                                                <td colSpan={5} className="text-center"> No Rejected Request </td>
                                            </tr>
                                        }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    :''
            }

            <div className="modal fade " data-bs-backdrop="static"  ref={exampleModal} id="addBranchModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
                <div className="modal-dialog modal-xl" data-bs-backdrop="static">
                    <AddBranchModal branches={getBranches} branchModal={modal} ref={branchModalRef}></AddBranchModal>
                </div>
            </div>
            <div className="modal fade " data-bs-backdrop="static"  ref={branchUpdateModal} id="addBranchModal" tabIndex="-1" aria-labelledby="branchUpdateModalLabel"  aria-hidden="true">
                <div className="modal-dialog modal-xl" data-bs-backdrop="static">
                    <UpdateBranchModal branches={getBranches} branchModal={updateModal} ref={branchUpdateModalRef}></UpdateBranchModal>
                </div>
            </div>
        </>
    );
}

export default Branches;