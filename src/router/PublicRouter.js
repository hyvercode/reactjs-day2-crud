import React from 'react';
import {getToken} from "../helpers/Common";
import {Navigate} from "react-router-dom";

// handle the public routes
function PublicRoute({children}) {
    if (getToken()) {
        return <Navigate to="/" replace/>;
    }
    return children;
}

export default PublicRoute;