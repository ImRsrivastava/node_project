import React, {useEffect, useState} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useWebStateContext} from "../../Contexts/WebContextProvider";

const AppLayout = () => {
    const {token} = useWebStateContext();
    const [loading, setLoading] = useState(false);

    useEffect(() => { setLoading(true); },[]);
    if(token) { return <Navigate to="/" /> }
    
    setTimeout(() => {
        setLoading(false);
    },1000);

    return (
        <>
            {(loading) ?
                <>
                    <div className="spinner-border spinner"></div>
                </>
                :
                <>
                    <main>
                        <div className="container">
                            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                            < Outlet />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>
                </>
            }
        </>
    );
}

export default AppLayout;