import React from 'react';
import {Navigate} from 'react-router-dom';
import {getToken} from '../helpers/Common'

// handle the private routes
function PrivateRoute({children}) {
    if (getToken()) {
        return children;
    }
    return <Navigate to="/login" replace/>;

}

export default PrivateRoute;