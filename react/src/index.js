import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from "./Router";
import {RouterProvider} from "react-router-dom";
import {WebContextProvider} from "./Contexts/WebContextProvider";
import { AdminContextProvider } from './Contexts/AdminContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <WebContextProvider>
            <AdminContextProvider>
                <RouterProvider router={Router} />
            </AdminContextProvider>
        </WebContextProvider>
    </React.StrictMode>
);
