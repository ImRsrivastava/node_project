import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaRegArrowAltCircleLeft } from "react-icons/fa";


const BranchCreate = () => {

    const [loader, setLoader] = useState(false);
    const [errorLog, setErrorLog] = useState("");
    const [successLog, setSuccessLog] = useState("");

    return (
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
                        <div class="card">
                            <div className="card-header">
                                <div className="card-title justify-content-between d-flex">
                                    <h5>Create Branch</h5>
                                    <Link to="/admin/branch" className="btn btn-dark btn-sm btn-click"><FaRegArrowAltCircleLeft/>&nbsp; Back </Link>
                                </div>
                            </div>
                            <div class="card-body">
                                <form class="row g-3">
                                    <div className="form-group row mt-4">
                                        <div class="col-4">
                                            <label for="branch_name" class="form-label">Branch Name :</label>
                                            <input type="text" class="form-control" id="branch_name" name="branch_name" autoComplete="off" placeholder="Branch Name" maxLength="50" />
                                        </div>

                                        <div class="col-4">
                                            <label for="branch_email" class="form-label">Branch Email :</label>
                                            <input type="text" class="form-control" id="branch_email" name="branch_email" autoComplete="off" placeholder="Branch Email" maxLength="50" />
                                        </div>
                                        
                                        <div class="col-4">
                                            <label for="branch_contact" class="form-label">Branch Contact :</label>
                                            <input type="number" class="form-control" id="branch_contact" name="branch_contact" autoComplete="off" placeholder="Branch Contact" maxLength="10" />
                                        </div>
                                    </div>

                                    <div className="form-group row mt-4">
                                        <div class="col-4">
                                            <label for="branch_address" class="form-label">Address :</label>
                                            <textarea name="branch_address" className="form-control" id="branch_address" rows="3" placeholder="Branch Address"></textarea>
                                        </div>

                                        <div class="col-1">
                                            <label for="branch_pincode" class="form-label"> Pincode :</label>
                                            <input type="number" class="form-control" id="branch_pincode" name="branch_pincode" autoComplete="off" placeholder="Pincode" maxLength="6"/>
                                        </div>
                                        
                                        <div class="col-3">
                                            <label for="branch_city" class="form-label"> City :</label>
                                            <input type="text" class="form-control" id="branch_city" name="branch_city" autoComplete="off" placeholder="City" maxLength="50" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default BranchCreate;
