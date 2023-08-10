import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import addCompanyModal from "./Add/AddCompanyModal.jsx";
import { Modal } from 'bootstrap'
import AddCompanyModal from "./Add/AddCompanyModal.jsx";
import UpdateCompanyModal from "./Update/UpdateCompanyModal.jsx";
import UpdateCompaniesPermissions from "./Update/UpdateCompaniesPermissions.jsx";
import ReactPaginate from "react-paginate";


function Companies(props) {
    const [companies, setCompanies] = useState([]);
    const [meta, setMeta] = useState({});

    const avatarUrl = "https://ui-avatars.com/api/?background=0D8ABC&color=fff&rounded=true&name=";

    const [modal, setModal] = useState(null)
    const [updateDetailModal, setupdateDetailModal] = useState(null)
    const [updatePermissionsModal, setupdatePermissionsModal] = useState(null)

    const exampleModal = useRef()
    const exampleUpdateDetailModal = useRef()
    const exampleUpdatePermissionsModal = useRef()

    const companyModal = useRef()
    const updateDetailModalRef = useRef()
    const updatePermissionsModalRef = useRef()


    const [groupedPermissions,setGroupedPermissions] = useState([]);



    const getCompanies = () => {
        setCompanies([]);
        loader=true;
        setLoader(loader)
        axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_ALL_COMPANIES_URL+'?page='+currentPage+'&flag=false')
            .then((response) => {
                loader=false;
                setLoader(loader);
                setCompanies(response.data.data);
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
    const getAllGroupedPermissions = () => {
        axios.post(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_ALL_GROUPED_PERMISSIONS_URL)
            .then((response) => {
              setGroupedPermissions(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const addCompany = () => {
        /*setTimeout(() => {
            companyModal.current.resetForm();
            companyModal.current.companyModelInstanse;
            modal.show();
        }, 1000);*/

        companyModal.current.resetForm();
        companyModal.current.setPermissions(groupedPermissions)
        modal.show();
    }
    const editDetail = (company) => {
       updateDetailModalRef.current.resetErrors();
        updateDetailModalRef.current.setFormData(previous => ({
            ...previous,
            id: company.id
        }))
       updateDetailModalRef.current.setFormData(previous => ({
           ...previous,
           company_name: company.company_name
       }));
        updateDetailModalRef.current.setFormData(previous => ({
            ...previous,
            status: company.status
        }));
        updateDetailModalRef.current.setFormData(previous => ({
            ...previous,
            object: company.object
        }))
        updateDetailModalRef.current.setFormData(previous => ({
            ...previous,
            user: company.user
        }))
        updateDetailModalRef.current.setFormData(previous => ({
            ...previous,
            user_id: company.user_id
        }))
        updateDetailModal.show();
    }
    const editPermission = (company) => {
        loader=true;
        setLoader(loader);
        updatePermissionsModalRef.current.resetCheckedItemsData();
        axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_USER_PERMISSIONS_URL+'?flag=true&user_id='+company.user_id)
            .then((response) => {
                loader=false;
                setLoader(loader);
                let permissions_array = [];
                response.data.data.forEach((item) => {

                    updatePermissionsModalRef.current.setCheckedItemsData(item.id);

                })
                updatePermissionsModalRef.current.setPermissions(groupedPermissions)
                updatePermissionsModalRef.current.setUserID(company.user_id)
                updatePermissionsModal.show();
            })
            .catch((error) => {
                loader=false;
                setLoader(loader);
            });

     //   updatePermissionsModalRef.current.setUserPermissions()



    }

    var [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 10;

    const handlePageClick = (currentPage) => {
        alert(currentPage);





    };



    useEffect(() => {
        getCompanies();
        getAllGroupedPermissions()
        setModal(
            new Modal(exampleModal.current)
        ),
        setupdateDetailModal(
            new Modal(exampleUpdateDetailModal.current)
        ),
            setupdatePermissionsModal(
                new Modal(exampleUpdatePermissionsModal.current)
            )
    }, []);
    const loaderSizeStyle={
        width: "3rem",
        height: "3rem"
    }
    var [loader,setLoader] = useState(false);


    return (
        <>
            {loader &&
            <div className="d-flex loader justify-content-center">
                <div className="spinner-border text-primary" style={loaderSizeStyle} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            }
            <h2>Companies</h2>

            <div className="row">
                <div className="col-12">
                    <div className="text-center">
                        {companies.length > 0
                            ?
                        <p>Showing results {meta.pagination?.current_page} to {meta?.pagination?.count} of {meta?.pagination?.total}</p>:''}
                    </div>
                </div>
                <div className="col-12">
                    <div className="fa fa-refresh bg-primary p-2 text-white" onClick={getCompanies}></div>
                    <div className="float-end">
                        <button type="button" onClick={()=>addCompany()} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Add Company
                        </button>
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
                    {companies.length > 0 && companies.map((company, index) => (

                        <tr key={company.id} className="align-middle">
                            <td className="text-center">
                                <div className="avatar avatar-md">
                                    <img className="avatar-img" src={avatarUrl+company.company_name} height="40" alt={company.company_name}></img>
                                    <span className="avatar-status bg-success"></span>
                                </div>
                            </td>
                            <td>
                                <div>{company.name}</div>
                                <div className="small text-medium-emphasis">
                                    <div className="fw-bold">{company.company_name}</div>
                                    <div><b>Admin Email : </b> {company.user?company.user.email:''}</div>
                                </div>
                            </td>
                            <td >
                                <b>Admin Name : </b> {company.user?company.user.name:''}
                            </td>
                            <td>
                                {company.status==1?
                                <span className="badge bg-success">Active</span>
                                    :
                                    <span className="badge bg-danger">InActive</span>
                                }

                            </td>

                            <td>

                                <div>
                                    <span data-bs-toggle="modal" data-bs-target="#exampleUpdatePermissionsModal" onClick={()=>editPermission(company)} className="fa fa-1x fa-eye m-2"></span>
                                    <span data-bs-toggle="modal" data-bs-target="#exampleUpdateDetailModal" onClick={()=>editDetail(company)}  className="fa fa-1x fa-pencil"></span>
                                </div>
                            </td>


                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
            <div className="modal fade " data-bs-backdrop="static"  ref={exampleModal} id="addCompanyModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
            <div className="modal-dialog modal-xl" data-bs-backdrop="static">
                <AddCompanyModal companies={getCompanies} companyModal={modal} ref={companyModal}></AddCompanyModal>
            </div>
            </div>
            <div className="modal fade " data-bs-backdrop="static"  ref={exampleUpdateDetailModal} id="addCompanyModal" tabIndex="-1" aria-labelledby="updateDetailModalLabel"  aria-hidden="true">
                <div className="modal-dialog modal-xl" data-bs-backdrop="static">
                    <UpdateCompanyModal  ref={updateDetailModalRef} updateDetailModal={updateDetailModal} companies={getCompanies} loader={loader}></UpdateCompanyModal>
                </div>
            </div>
            <div className="modal fade " data-bs-backdrop="static" ref={exampleUpdatePermissionsModal} id="addCompanyModal" tabIndex="-1" aria-labelledby="updatePermissionModalLabel"  aria-hidden="true">
                <div className="modal-dialog modal-xl" data-bs-backdrop="static">
                    <UpdateCompaniesPermissions ref={updatePermissionsModalRef} updatePermissionModal={updatePermissionsModal} companies={getCompanies} loader={loader} setLoader={setLoader}></UpdateCompaniesPermissions>
                </div>
            </div>

        </>
    );
}

export default Companies;