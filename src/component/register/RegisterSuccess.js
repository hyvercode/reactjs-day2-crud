import React from "react";
import {NavLink} from "react-router-dom";

function RegisterSuccess() {
    return (
        <div className="container py-5">
            <div className="alert alert-success" role="alert">
                Register Success
            </div>
            <NavLink to="/login">Back to Login ></NavLink>
        </div>
    )
}

export default RegisterSuccess