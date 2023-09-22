import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axiosAdminInstance from "../../axiosAdminInstance";
import { FaUserPlus, FaTimes, FaTrash, FaPencilAlt } from "react-icons/fa";
import 'datatables.net-dt/css/jquery.dataTables.css';
import $ from 'jquery';
import 'datatables.net';
import Swal from "sweetalert2";


const BranchList = () => {
    const [errorLog, setErrorLog] = useState("");
    const [successLog, setSuccessLog] = useState("");
    const [validateErr, setValidateErr] = useState("");

    const [listLoader, setListLoader] = useState(false);
    const [formLoader, setFormLoader] = useState(false);
    
    const [branchList, setBranchList] = useState([]);
    
    const [userCreateHtml, setUserCreateHtml] = useState(false);
    const [createFormData, setCreateFormData] = useState({name:'', email:'', password:'', re_password:''});
    
    const [userEditHtml, setUserEditHtml] = useState(false);
    const [editFormData, setEditFormData] = useState({editName:'', editEmail:''});

    useEffect(() => {
        setListLoader(true);
        getUsersList();
    },[]);

    const getUsersList = () => {
        axiosAdminInstance.get('/branch/list').then((response) => {
            setTimeout(() => {
                console.log('check-data:: ', response);
                setListLoader(false); 
                setBranchList(response.data);
                setTimeout(() => { $('#branch-list-tbl').DataTable(); }, 500);
            },500);
        }).catch((error) => {
            setListLoader(false); setErrorLog(error.response);
        });
    }

    const handleHtmlForm = () => {

    }

    const deleteUserInfo = (bId) => {

    }

    const editUserInfo = (bId) => {

    }

    const changeDateFormat = (date) => {
        const options = { day:'2-digit', 'month':'long', year:'numeric' };
        const formatedDate = new Date(date).toLocaleDateString('en-US', options);
        const [month, day, year] = formatedDate.split(' ')
        return `${day} ${month} ${year}`;
    }

    return (
        <>
            {(listLoader) ?
                <><div className="spinner-border spinner"></div></> 
                :
                <>
                    <div className="pagetitle">
                        <h1>Branch List</h1>
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item">Branch</li>
                                <li className="breadcrumb-item active">List</li>
                            </ol>
                        </nav>
                    </div>

                    <section className="section">
                        {errorLog && (<>
                            <div className="alert alert-danger justify-content-between d-flex">
                                <div className="text-left"> {errorLog.msg} </div>
                                <span className="component-cross-icon" onClick={() => setErrorLog("")}><FaTimes/></span>
                            </div>
                        </>)}
                        {successLog && (<>
                            <div className="alert alert-success justify-content-between d-flex">
                                <div className="text-left"> {successLog.msg} </div>
                                <span className="component-cross-icon" onClick={() => setSuccessLog("")}><FaTimes/></span>
                            </div>
                        </>)}
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title justify-content-between d-flex">
                                            <h5>Branch List</h5>
                                            <Link to="/admin/branch/create" className="btn btn-dark btn-sm btn-click"><FaUserPlus/>&nbsp; Add Branch </Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <table className="table mt-4" id="branch-list-tbl">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Phone</th>
                                                    <th scope="col">Address</th>
                                                    <th scope="col">Created AT</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {branchList.length > 0 && (
                                                branchList.map((list, index) => {
                                                    return (
                                                        <>
                                                            <tr key={list.id}>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{list.name}</td>
                                                                <td>{list.email}</td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>{changeDateFormat(list.created_at)}</td>
                                                                <td>
                                                                    <div onClick={() => deleteUserInfo( btoa(btoa(list.id)) )} className="btn btn-outline-danger btn-sm fa-btn-danger mr-1"><FaTrash /></div>
                                                                    <div onClick={() => editUserInfo( btoa(btoa(list.id)) )} className="btn btn-outline-dark btn-sm fa-btn-primary"><FaPencilAlt /></div>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    );
                                                })
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            }
        </>
    )
}

export default BranchList;