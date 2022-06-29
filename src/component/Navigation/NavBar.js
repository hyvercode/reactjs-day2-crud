import React from "react";
import {NavLink} from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
            <a className="navbar-brand" href="#">Solusione</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <NavLink to="/" className="nav-link" href="#">Home </NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink to="/bank" className="nav-link">Bank </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar