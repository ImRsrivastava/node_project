import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaRegArrowAltCircleLeft } from "react-icons/fa";
import axiosAdminInstance from "../../axiosAdminInstance";


const BranchCreate = () => {

    const [loader, setLoader] = useState(false);
    const [errorLog, setErrorLog] = useState("");
    const [validateErr, setValidateErr] = useState("");
    const [successLog, setSuccessLog] = useState("");

    const [formField, setFormField] = useState({branch_name:"", branch_email:"", branch_contact:"", branch_address:"", branch_pincode:"", branch_city:"", branch_state:"", branch_country:""});

    const handleFormField = (e) => {
        setFormField({
            ...formField,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        setLoader(true);
        setTimeout(() => {
            setValidateErr(""); setFormField({branch_name:"", branch_email:"", branch_contact:"", branch_address:"", branch_pincode:"", branch_city:"", branch_state:"", branch_country:""})
            setLoader(false);
        },500);
    }, []);


    const handleBranchCreate = (e) => {
        e.preventDefault();
        setValidateErr("");
        axiosAdminInstance.post('/branch/create', {name:formField.branch_name, email:formField.branch_email, phone:formField.branch_contact, address:formField.branch_address, pincode:formField.branch_pincode, city:formField.branch_city, state:formField.branch_state, country:formField.branch_country }).then((response) => {
            console.log('check-response:: ', response);
        })
        .catch ((error) => {
            console.log('check-error:: ', error.response);
            const errors = error.response
            if((errors) && (errors.status == 422)) {
                setValidateErr(errors.data); }
        });
    }

    

    return (
        <>
            {(loader) ?
                <><div className="spinner-border spinner"></div></> 
                :
                <>
                    <div className="pagetitle">
                        <h1>Branch Create</h1>
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item">Branch</li>
                                <li className="breadcrumb-item active">Create</li>
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
                                            <h5>Create Branch</h5>
                                            <Link to="/admin/branch" className="btn btn-dark btn-sm btn-click"><FaRegArrowAltCircleLeft/>&nbsp; Back </Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <form className="row g-3" onSubmit={handleBranchCreate}>

                                            <div className="form-group row mt-4">
                                                <div className="col-4">
                                                    <label htmlFor="branch_name" className="form-label">Branch Name <span className="text-danger">*</span> :</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="branch_name" 
                                                        name="branch_name" 
                                                        autoComplete="off" 
                                                        placeholder="Branch Name" 
                                                        maxLength="50"
                                                        value={formField.branch_name}
                                                        onChange={handleFormField}
                                                    />
                                                    {(validateErr.name) ? <div className="invalid-feedback">{validateErr.name}</div> : ''}
                                                </div>

                                                <div className="col-4">
                                                    <label htmlFor="branch_email" className="form-label">Branch Email <span className="text-danger">*</span> :</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="branch_email" 
                                                        name="branch_email" 
                                                        autoComplete="off" 
                                                        placeholder="Branch Email" 
                                                        maxLength="50" 
                                                        value={formField.branch_email}
                                                        onChange={handleFormField}
                                                    />
                                                    {(validateErr.email) ? <div className="invalid-feedback">{validateErr.email}</div> : ''}
                                                </div>
                                                
                                                <div className="col-4">
                                                    <label htmlFor="branch_contact" className="form-label">Branch Contact <span className="text-danger">*</span> :</label>
                                                    <input 
                                                        type="number" 
                                                        className="form-control" 
                                                        id="branch_contact" 
                                                        name="branch_contact" 
                                                        autoComplete="off" 
                                                        placeholder="Branch Contact" 
                                                        maxLength="10" 
                                                        value={formField.branch_contact}
                                                        onChange={handleFormField}
                                                    />
                                                    {(validateErr.phone) ? <div className="invalid-feedback">{validateErr.phone}</div> : ''}
                                                </div>
                                            </div>

                                            <div className="form-group row mt-4">
                                                <div className="col-4">
                                                    <label htmlFor="branch_address" className="form-label">Address <span className="text-danger">*</span> :</label>
                                                    <textarea 
                                                        name="branch_address" 
                                                        className="form-control" 
                                                        id="branch_address" 
                                                        rows="3" 
                                                        placeholder="Branch Address...!!" 
                                                        maxLength="150"
                                                        value={formField.branch_address}
                                                        onChange={handleFormField}
                                                    ></textarea>
                                                    {(validateErr.address) ? <div className="invalid-feedback">{validateErr.address}</div> : ''}
                                                </div>

                                                <div className="col-1">
                                                    <label htmlFor="branch_pincode" className="form-label"> Pincode <span className="text-danger">*</span> :</label>
                                                    <input 
                                                        type="number" 
                                                        className="form-control" 
                                                        id="branch_pincode"
                                                        name="branch_pincode" 
                                                        autoComplete="off" 
                                                        placeholder="Pincode" 
                                                        maxLength="6"
                                                        value={formField.branch_pincode}
                                                        onChange={handleFormField}
                                                    />
                                                    {(validateErr.pincode) ? <div className="invalid-feedback">{validateErr.pincode}</div> : ''}
                                                </div>
                                                
                                                <div className="col-3">
                                                    <label htmlFor="branch_city" className="form-label"> City <span className="text-danger">*</span> :</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="branch_city" 
                                                        name="branch_city" 
                                                        autoComplete="off" 
                                                        placeholder="Branch City" 
                                                        maxLength="50" 
                                                        value={formField.branch_city}
                                                        onChange={handleFormField}
                                                    />
                                                    {(validateErr.city) ? <div className="invalid-feedback">{validateErr.city}</div> : ''}
                                                </div>

                                                <div className="col-2">
                                                    <label htmlFor="branch_state" className="form-label"> State <span className="text-danger">*</span> :</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="branch_state" 
                                                        name="branch_state" 
                                                        autoComplete="off" 
                                                        placeholder="Branch State" 
                                                        maxLength="50"
                                                        value={formField.branch_state}
                                                        onChange={handleFormField}
                                                    />
                                                    {(validateErr.state) ? <div className="invalid-feedback">{validateErr.state}</div> : ''}
                                                </div>
                                                
                                                <div className="col-2">
                                                    <label htmlFor="branch_country" className="form-label"> Country <span className="text-danger">*</span> :</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="branch_country" 
                                                        name="branch_country" 
                                                        autoComplete="off" 
                                                        placeholder="Branch Country" 
                                                        maxLength="50" 
                                                        value={formField.branch_country}
                                                        onChange={handleFormField}
                                                    />
                                                    {(validateErr.country) ? <div className="invalid-feedback">{validateErr.country}</div> : ''}
                                                </div>
                                            </div>

                                            <div className="form-group row mt-4">
                                                <div className="offset-10 col-2">
                                                    <button type="submit" className="btn btn-dark btn-sm btn-click float-end px-3">Submit</button>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            }
        </>
    );
}

export default BranchCreate;
