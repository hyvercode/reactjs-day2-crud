import React from "react";
import {NavLink} from "react-router-dom";
import {removeUserSession} from "../../helpers/Common";

function NavBar() {

    const logout=(e)=>{
        e.preventDefault()
        if (window.confirm("Do yo want logout?") === true) {
            removeUserSession()
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
            <a className="navbar-brand" href="#">Solusione</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" href="#">Home </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/bank" className="nav-link">Bank </NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a onClick={logout} className="nav-link">Logout </a>
                    </li>
                </ul>

            </div>
        </nav>
    )
}

export default NavBar
