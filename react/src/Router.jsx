import React from "react";
import {createBrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style-sheet/style.css";
import AppLayout from "./Components/Layouts/AppLayout";
import HeadLayout from "./Components/Layouts/HeadLayout";
import Login from "./Components/Auths/Login";
import Dashboard from "./Components/Dashboard";
import UsersComponent from "./Components/Users/UsersComponent";
import NotFound from "./Components/NotFound";
import AdminNotFound from "./Components/AdminNotFound";
import AdminHeadLayout from "./Admin/Layouts/HeadLayout"
import AdminAppLayout from "./Admin/Layouts/AppLayout"
import AdminDashboard from "./Admin/Dashboard";
import AdminLogin from "./Admin/Auths/Login";
import BranchList from "./Admin/Branch/BranchList";
import BranchCreate from "./Admin/Branch/BranchCreate";


const Router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                path: '/',
                element: <HeadLayout />,
                children: [
                    {
                        path: '/',
                        element: <Dashboard />
                    },
                    {
                        path: '/users',
                        element: <UsersComponent />
                    }
                ]
            },
            {
                path: '/',
                element: <AppLayout />,
                children: [
                    {
                        path: '/login',
                        element: <Login />
                    }
                ]
            },
            {
                path: "*",
                element: <NotFound/>
            }
        ]
    },
    

    {
        path: 'admin/',
        element: <AdminHeadLayout />,
        children: [
            {
                path: '',
                element: <AdminDashboard />
            },
            {
                path: 'branch/',
                children: [
                    {
                        path: '',
                        element: <BranchList />
                    },
                    {
                        path: 'create/',
                        element: <BranchCreate />
                    }
                ]
            },
        ]
    },
    {
        path: 'admin',
        element: <AdminAppLayout />,
        children: [
            {
                path: 'login',
                element: <AdminLogin />
            },
        ]
    },
    {
        path: "*",
        element: <AdminNotFound/>
    },
    
]);

export default Router;