import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, Link, useLocation} from "react-router-dom";
import {useAdminStateContext} from "../../Contexts/AdminContextProvider";
import axiosAdminInstance from "../../axiosAdminInstance";
import { FaThLarge, FaCodeBranch, FaTrash, FaPencilAlt } from "react-icons/fa";


const HeadLayout = () => {

    const location = useLocation();
    const pathName = location.pathname;

    const {authUser, token, setAuthUser, manageToken} = useAdminStateContext();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosAdminInstance.get('/auth').then((response) => {
            console.log('check-admin-auth:: ', response);
            setAuthUser(response.data);
            setLoading(false);
        }).catch((error) => {
            const errors = error.response;
            if((errors) && (errors.status === 401)) {
                manageToken(null); }
        });
    },[]);

    if(!token) {
        return <Navigate to="login" /> }


    const onLogout = () => {
        setAuthUser({});
        manageToken(null);
    }

    return (
        <>
            {(loading) ?
                <> <div className="spinner-border spinner"></div> </>
                :
                <>
                    <header id="header" className="header fixed-top d-flex align-items-center">
                        <div className="d-flex align-items-center justify-content-between">
                            <Link to="index.html" className="logo d-flex align-items-center">
                                <span className="d-none d-lg-block"> React App </span>
                            </Link>
                            <i className="bi bi-list toggle-sidebar-btn"></i>
                        </div>

                        <div className="search-bar">
                            <form className="search-form d-flex align-items-center" method="POST" action="#">
                                <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                                <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                            </form>
                        </div>

                        <nav className="header-nav ms-auto">
                            <ul className="d-flex align-items-center">
                                <li className="nav-item d-block d-lg-none">
                                    <a className="nav-link nav-icon search-bar-toggle " href="#!">
                                        <i className="bi bi-search"></i>
                                    </a>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link nav-icon" href="#!" data-bs-toggle="dropdown">
                                        <i className="bi bi-bell"></i>
                                        <span className="badge bg-primary badge-number">4</span>
                                    </Link>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                                        <li className="dropdown-header">
                                            You have 4 new notifications
                                            <Link to="#!"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>

                                        <li className="notification-item">
                                            <i className="bi bi-exclamation-circle text-warning"></i>
                                            <div>
                                                <h4>Lorem Ipsum</h4>
                                                <p>Quae dolorem earum veritatis oditseno</p>
                                                <p>30 min. ago</p>
                                            </div>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>

                                        <li className="notification-item">
                                            <i className="bi bi-x-circle text-danger"></i>
                                            <div>
                                                <h4>Atque rerum nesciunt</h4>
                                                <p>Quae dolorem earum veritatis oditseno</p>
                                                <p>1 hr. ago</p>
                                            </div>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>

                                        <li className="dropdown-footer">
                                            <Link to="#!">Show all notifications</Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item dropdown">
                                    <Link className="nav-link nav-icon" to="#!" data-bs-toggle="dropdown">
                                        <i className="bi bi-chat-left-text"></i>
                                        <span className="badge bg-success badge-number">3</span>
                                    </Link>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                                        <li className="dropdown-header">
                                            You have 3 new messages
                                            <Link to="#!"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>

                                        <li className="message-item">
                                            <Link to="#!">
                                                <div>
                                                    <h4>Maria Hudson</h4>
                                                    <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                                    <p>4 hrs. ago</p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>

                                        <li className="dropdown-footer">
                                            <Link to="#!">Show all messages</Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item dropdown pe-3">
                                    <a className="nav-link nav-profile d-flex align-items-center pe-0" href="" onClick={onLogout} data-bs-toggle="dropdown">
                                        <span className="d-md-block dropdown-toggle ps-2">{authUser.name}</span>
                                    </a>

                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                        <li className="dropdown-header">
                                            <h6>Kevin Anderson</h6>
                                            <span>Web Designer</span>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>

                                        <li>
                                            <Link className="dropdown-item d-flex align-items-center" to="users-profile.html">
                                                <i className="bi bi-person"></i>
                                                <span>My Profile</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>

                                        <li>
                                            <Link className="dropdown-item d-flex align-items-center" to="users-profile.html">
                                                <i className="bi bi-gear"></i>
                                                <span>Account Settings</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>

                                        <li>
                                            <Link className="dropdown-item d-flex align-items-center" to="pages-faq.html">
                                                <i className="bi bi-question-circle"></i>
                                                <span>Need Help?</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>

                                        <li>
                                            <Link className="dropdown-item d-flex align-items-center" to="#">
                                                <i className="bi bi-box-arrow-right"></i>
                                                <span>Sign Out</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </header>

                    <aside id="sidebar" className="sidebar">
                        <ul className="sidebar-nav" id="sidebar-nav">
                            <li className="nav-item">
                                <Link className={(pathName === '/admin') ? 'nav-link' : 'nav-link collapsed'}  to="/admin">
                                    <FaThLarge />
                                    <span>Dashboard</span>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className={ 
                                    ((pathName === '/admin/branch') 
                                    || 
                                    (pathName === '/admin/branch/create')) 
                                    ? 'nav-link' 
                                    : 'nav-link collapsed'} 
                                    to="/admin/branch">
                                    <FaCodeBranch />
                                    <span>Branch</span>
                                </Link>
                            </li>

                            <li className="nav-heading">Pages</li>

                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="users-profile.html">
                                    <i className="bi bi-person"></i>
                                    <span>Profile</span>
                                </Link>
                            </li>
                        </ul>
                    </aside>

                    <main id="main" className="main">

                        < Outlet />

                    </main>

                    <footer id="footer" className="footer">
                        <div className="copyright mx-2">
                            &copy; Copyright <strong><span>React App</span></strong>. All Rights Reserved
                        </div>
                    </footer>
                </>
            }
        </>
    )
}
export default HeadLayout;