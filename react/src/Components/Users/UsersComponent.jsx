import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axiosWebInstance from "../../axiosWebInstance";
import { FaUserPlus, FaTimes, FaTrash, FaPencilAlt } from "react-icons/fa";
import 'datatables.net-dt/css/jquery.dataTables.css';
import $ from 'jquery';
import 'datatables.net';
import Swal from "sweetalert2";


const UsersComponent = () => {
    const [errorLog, setErrorLog] = useState("");
    const [successLog, setSuccessLog] = useState("");
    const [validateErr, setValidateErr] = useState("");

    const [listLoader, setListLoader] = useState(false);
    const [formLoader, setFormLoader] = useState(false);
    
    const [usersList, setUsersList] = useState([]);
    
    const [userCreateHtml, setUserCreateHtml] = useState(false);    // to show create user html for
    const [createFormData, setCreateFormData] = useState({name:'', email:'', password:'', re_password:''});
    
    const [userEditHtml, setUserEditHtml] = useState(false);    // to show edit user html for
    const [editFormData, setEditFormData] = useState({editName:'', editEmail:''});
    // const [createFileData, setCreateFileData] = useState('');

    useEffect(() => {
        setListLoader(true);
        getUsersList();
    },[]);

    const getUsersList = () => {
        axiosWebInstance.get('/users/list').then((response) => {
            setTimeout(() => {
                setListLoader(false); 
                setUsersList(response.data);
                setTimeout(() => { $('#users-list-tbl').DataTable(); }, 500);
            },500);
        }).catch((error) => {
            setListLoader(false); setErrorLog(error.response);
        });
    }

    const changeDateFormat = (date) => {
        const options = { day:'2-digit', 'month':'long', year:'numeric' };
        const formatedDate = new Date(date).toLocaleDateString('en-US', options);
        const [month, day, year] = formatedDate.split(' ')
        return `${day} ${month} ${year}`;
    }

    const handleFormData = (e) => {
        setValidateErr('');  setErrorLog('');  setSuccessLog('');
        setCreateFormData({
            ...createFormData,
            [e.target.name]: e.target.value
        });
    }

    const handleFormImage = (e) => {
        setValidateErr('');  setErrorLog('');  setSuccessLog('');
        // setCreateFileData(e.target.files[0]);
    }

    const handleHtmlForm = () => {
        setFormLoader(true);
        setTimeout(() => {
            setFormLoader(false);
            setUserCreateHtml(true);
            setUserEditHtml(false);
            setValidateErr('');  setErrorLog('');  setSuccessLog('');
            setCreateFormData({name:'', email:'', password:'', re_password:'', profile:''});
        },500);
    }

    const handleFormSubmit = () => {
        setValidateErr('');  setErrorLog('');  setSuccessLog('');
        // without images use this
        axiosWebInstance.post('/users/create',{name:createFormData.name, email:createFormData.email, password:createFormData.password, re_password:createFormData.re_password})

        // with images use this
        /*const formData = new FormData();
        formData.append('data', JSON.stringify(createFormData));
        formData.append('profile', createFileData);

        axiosWebInstance.post('/users/create', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })*/
        .then((response) => {
            getUsersList();
            setSuccessLog(response.data);
            setUserCreateHtml(false);
            setCreateFormData({name:'', email:'', password:'', re_password:''});
            setTimeout(() => { setSuccessLog("");  }, 2000);
        })
        .catch((error) => {
            const errors = error.response;
            if((errors) && (errors.status === 422)) {
                setValidateErr(errors.data); }
            else {
                setErrorLog(errors.data);
                setTimeout(() => { setErrorLog("");  }, 2000); }
        });
    }

    const deleteUserInfo = (deleteId) => {
        setErrorLog('');  setSuccessLog('');
        Swal.fire({
            position: 'top',
            title: 'Are you sure ?',
            text: "You want to delete this user ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#212529',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosWebInstance.delete('/users/'+deleteId).then((response) => {
                    setSuccessLog(response.data);
                    getUsersList();
                    setTimeout(() => { setSuccessLog("");  }, 2000);
                }).catch((error) => {
                    const errors = error.response;
                    if(errors && errors.status === 500) {
                        setErrorLog(errors.data);   
                        setTimeout(() => { setErrorLog("");  }, 2000); }
                })
            }
        })
    }

    const editUserInfo = (editId) => {
        setValidateErr('');  setErrorLog('');  setSuccessLog('');
        setEditFormData({editName:'', editEmail:''});
        setUserCreateHtml(false);
        
        axiosWebInstance.get('/users/'+editId).then((response) => {
            setUserEditHtml(true);
            setEditFormData({ editName: response.data[0].name, editEmail: response.data[0].email });
            handleEditFormData();
        })
        .catch((error) => {
            const errors = error.response;
            if(errors && errors.status === 500) {
                setErrorLog(errors.data);
                setTimeout(() => { setErrorLog("");  }, 2000); }
        });
    }

    const handleEditFormData = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name] : e.target.value
        });
        console.log('check-editFormData:: ',editFormData);
    }

    const handleFormUpdate = () => {

    }

    return (
        <>
            <div className="pagetitle">
                <h1>Users Component</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item">Users</li>
                        <li className="breadcrumb-item active">Component</li>
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
                    <div className="col-lg-7">
                    {(listLoader) ?
                        <><div className="spinner-border spinner"></div></> :
                        <>
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title justify-content-between d-flex">
                                        <h5>List of User's</h5>
                                        <button type="button" className="btn btn-dark btn-sm btn-click" onClick={handleHtmlForm} ><FaUserPlus/>&nbsp; Add User </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <table className="table mt-4" id="users-list-tbl">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Created AT</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {usersList.length > 0 && (
                                            usersList.map((list, index) => {
                                                return (
                                                    <>
                                                        <tr key={list.id}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{list.name}</td>
                                                            <td>{list.email}</td>
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
                        </>
                    }
                    </div>

                    <div className="col-lg-5">
                    {(formLoader) ?
                        <><div className="spinner-border spinner"></div></> :
                        <>
                        { (userCreateHtml) ?
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title justify-content-between d-flex">
                                        <h5>Create User</h5>
                                        <span className="component-cross-icon" onClick={() => setUserCreateHtml(false)}><FaTimes/></span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form method="post" className="mt-4">
                                        <div className="row mb-3">
                                            <label htmlFor="name" className="col-sm-3 col-form-label">Name :</label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="User Name"
                                                    autoComplete="off"
                                                    value={createFormData.name}
                                                    onChange={handleFormData}
                                                />
                                                {(validateErr.name) ? <div className="invalid-feedback">{validateErr.name}</div> : ''}
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label htmlFor="email" className="col-sm-3 col-form-label">Email :</label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    placeholder="User Email"
                                                    autoComplete="off"
                                                    value={createFormData.email}
                                                    onChange={handleFormData}
                                                />
                                                {(validateErr.email) ? <div className="invalid-feedback">{validateErr.email}</div> : ''}
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    autoComplete="off"
                                                    value={createFormData.password}
                                                    onChange={handleFormData}
                                                />
                                                {(validateErr.password) ? <div className="invalid-feedback">{validateErr.password}</div> : ''}
                                            </div>
                                        </div>

                                        <div className="row mb-4">
                                            <label htmlFor="re_password" className="col-sm-3 col-form-label">Re-Password</label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="re_password"
                                                    name="re_password"
                                                    placeholder="Re - Password"
                                                    autoComplete="off"
                                                    value={createFormData.re_password}
                                                    onChange={handleFormData}
                                                />
                                                {(validateErr.re_password) ? <div className="invalid-feedback">{validateErr.re_password}</div> : ''}
                                            </div>
                                        </div>

                                        <div className="row mb-4">
                                            <label htmlFor="profile" className="col-sm-3 col-form-label">Profile Photo</label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="profile"
                                                    name="profile"
                                                    accept=".jpg,.png,.jpeg"
                                                    placeholder="Profile Photo"
                                                    autoComplete="off"
                                                    onChange={handleFormImage}
                                                />
                                                {(validateErr.profile) ? <div className="invalid-feedback">{validateErr.profile}</div> : ''}
                                            </div>
                                        </div>

                                        <div className="col-sm-12 text-end">
                                            <button type="button" className="btn btn-dark btn-sm btn-click" onClick={handleFormSubmit}>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        : "" }

                        { (userEditHtml) ?
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title justify-content-between d-flex">
                                        <h5>Edit User</h5>
                                        <span className="component-cross-icon" onClick={() => setUserEditHtml(false)}><FaTimes/></span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form method="post" className="mt-4">
                                        <div className="row mb-3">
                                            <label htmlFor="editName" className="col-sm-3 col-form-label">Name :</label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="editName"
                                                    name="editName"
                                                    placeholder="User Name"
                                                    autoComplete="off"
                                                    value={editFormData.editName}
                                                    onChange={handleEditFormData}
                                                />
                                                {(validateErr.editName) ? <div className="invalid-feedback">{validateErr.editName}</div> : ''}
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label htmlFor="editEmail" className="col-sm-3 col-form-label">Email :</label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="editEmail"
                                                    name="editEmail"
                                                    placeholder="User Email"
                                                    autoComplete="off"
                                                    value={editFormData.editEmail}
                                                    onChange={handleEditFormData}
                                                />
                                                {(validateErr.editEmail) ? <div className="invalid-feedback">{validateErr.editEmail}</div> : ''}
                                            </div>
                                        </div>

                                        <div className="col-sm-12 text-end">
                                            <button type="button" className="btn btn-dark btn-sm btn-click" onClick={handleFormUpdate}>Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        : "" }
                        </>
                    }
                    </div>
                </div>
            </section>
        </>
    )
}

export default UsersComponent;