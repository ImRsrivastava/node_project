import React from 'react';
import {Link} from "react-router-dom";


const NotFound = () => {
    return (
        <>
            <div className="error-section">
                <h1 className="error">404</h1>
                <div className="page">Ooops!!! The page you are looking for is not found in website section </div>
                <Link className="back-home" to="/">Back to home</Link>
            </div>
        </>
    )
}


export default NotFound;