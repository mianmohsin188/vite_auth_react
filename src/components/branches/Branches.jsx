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

    useEffect(() => {
        getBranches()
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
                    <div className="text-center">
                        {branches.length > 0
                            ?
                            <p>Showing results {meta.pagination?.current_page} to {meta?.pagination?.count} of {meta?.pagination?.total}</p>:''}
                    </div>
                </div>
                <div className="col-12">
                    <div className="fa fa-refresh bg-primary p-2 text-white" onClick={getBranches}></div>
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