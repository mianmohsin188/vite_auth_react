import React, {useEffect, useState} from 'react';
import axios from "axios";
import Swal from "sweetalert2";

function Companies(props) {
    const [companies, setCompanies] = useState([]);
    const [meta, setMeta] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const avatarUrl = "https://ui-avatars.com/api/?background=0D8ABC&color=fff&rounded=true&name=";
    const getCompanies = () => {
        axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_ALL_COMPANIES_URL+'?page='+currentPage)
            .then((response) => {
                setCompanies(response.data.data);
                setMeta(response.data.meta);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const editDetail = (company) => {
        alert(company.id);
      //  props.history.push(`/companies/edit/${company.id}`);
    }

    useEffect(() => {
        getCompanies()
    }, []);

    return (
        <>
            <h2>Companies</h2>

            <div className="row">
                <div className="col-12">
                    <div className="text-center">
                        {companies.length > 0
                            ?
                        <p>Showing results {meta.pagination.current_page} to {meta.pagination.count} of {meta.pagination.total}</p>:''}
                    </div>
                    <div className="float-end">
                        <input type="search" className="form-control" placeholder="Search"/>
                    </div>
                </div>

            </div>
            <div className="table-responsive">
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
                                    <span onClick={()=>editDetail(company)} className="fa fa-1x fa-eye m-2"></span>
                                    <span className="fa fa-1x fa-trash"></span>
                                </div>
                            </td>


                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Companies;