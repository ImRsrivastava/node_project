import React from 'react';
import {Link} from "react-router-dom";


const AdminNotFound = () => {
    return (
        <>
            <div className="error-section">
                <h1 className="error">404</h1>
                <div className="page">Ooops!!! The page you are looking for is not found in admin section </div>
                <Link className="back-home" to="/admin">Back to home</Link>
            </div>
        </>
    )
}


export default AdminNotFound;