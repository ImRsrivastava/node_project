import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, Link, useLocation} from "react-router-dom";
import {useWebStateContext} from "../../Contexts/WebContextProvider";
import axiosWebInstance from "../../axiosWebInstance";


const HeadLayout = () => {

    const location = useLocation();
    const pathName = location.pathname;

    const {authUser, token, setAuthUser, manageToken} = useWebStateContext();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosWebInstance.get('/auth').then((response) => {
            setAuthUser(response.data);
            setLoading(false);
        }).catch((error) => {
            const errors = error.response;
            if((errors) && (errors.status === 401)) {
                manageToken(null); }
        });
    },[]);

    if(!token) {
        return <Navigate to="/login" /> }


    const onLogout = () => {
        setAuthUser({});
        manageToken(null);
    }

    return (
        <>
            {(loading) ?
                <>
                    <div className="spinner-border spinner"></div>
                </>
                :
                <>
                    <header id="header" className="header fixed-top d-flex align-items-center">
                        <div className="d-flex align-items-center justify-content-between">
                            <Link to="index.html" className="logo d-flex align-items-center">
                                {/*<img src="assets/img/logo.png" alt="" />*/}
                                <span className="d-none d-lg-block"> Docker Compose React </span>
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
                                                {/*<img src="assets/img/messages-1.jpg" alt="" className="rounded-circle" />*/}
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
                                        {/*<img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" />*/}
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
                                <Link className={(pathName === '/') ? 'nav-link' : 'nav-link collapsed'}  to="/">
                                    <i className="bi bi-grid"></i>
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            {/*nav-link collapsed*/}

                            <li className="nav-item">
                                <Link className={(pathName === '/users') ? 'nav-link' : 'nav-link collapsed'} to="/users">
                                    <i className="bi bi-grid"></i>
                                    <span>Users</span>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" to="#!">
                                    <i className="bi bi-journal-text"></i><span>Forms</span><i className="bi bi-chevron-down ms-auto"></i>
                                </Link>
                                <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                    <li>
                                        <Link to="forms-elements.html">
                                            <i className="bi bi-circle"></i><span>Form Elements</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="forms-layouts.html">
                                            <i className="bi bi-circle"></i><span>Form Layouts</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="forms-editors.html">
                                            <i className="bi bi-circle"></i><span>Form Editors</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="forms-validation.html">
                                            <i className="bi bi-circle"></i><span>Form Validation</span>
                                        </Link>
                                    </li>
                                </ul>
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