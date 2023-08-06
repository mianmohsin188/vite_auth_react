import React, {useEffect, useState} from 'react';
import {Modal} from "bootstrap";
import axios from "axios";

function Branches(props) {
    const [products, setProducts] = useState([]);
    const [meta, setMeta] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const avatarUrl = "https://ui-avatars.com/api/?background=0D8ABC&color=fff&rounded=true&name=";
    const getProducts = () => {
        setProducts([]);
        axios.get(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_ALL_PRODUCTS_URL)
            .then((response) => {
                console.log(response.data.products)
                setProducts(response.data.products);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getProducts();
    }, []);
    return (
        <>
            <h2>Products</h2>
            <div className="row">

            <div className="col-12">
                <div className="fa fa-refresh bg-primary p-2 text-white" onClick={getProducts}></div>
                <div className="float-end">
                   {/* <button type="button" onClick={()=>addCompany()} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add Company
                    </button>*/}
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
            {products.length > 0 && products.map((product, index) => (

                <tr key={product.id} className="align-middle">
                    <td className="text-center">
                        <div className="avatar avatar-md">
                            <img className="avatar-img" src={product.images[0]} height="40" alt={product.title}></img>
                            <span className="avatar-status bg-success"></span>
                        </div>
                    </td>
                    <td>
                        <div>{product.title}</div>
                        <div className="small text-medium-emphasis">
                            <div className="fw-bold">{product.title}</div>
                            <div><b>Admin Email : </b> {product.brand}</div>
                        </div>
                    </td>
                    <td >
                        <b>Admin Name : </b> {product.category}
                    </td>
                    <td>
                        kkk

                    </td>

                    <td>

                        <div>
                            <span  className="fa fa-1x fa-eye m-2"></span>
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

export default Branches;