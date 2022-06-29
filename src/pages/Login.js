import React, {useState} from "react";
import Api from "../api";
import {setUserSession, windowReload} from "../helpers/Common";
import {NavLink, useNavigate} from 'react-router-dom';

function Login(props) {
    let navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        Api.post('/v1/auth/login', {
            username: username,
            password: password
        }).then(response => {
            setUserSession(response.data.accessToken, response.data.employeeId, response.data.outletId);
            setIsLoading(false)
            navigate('/');
        }, (error) => {
            alert(error.response.data.message)
            windowReload();
        });
    }

    return (
        <div className="container p-5">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-6">
                    <div className="card card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="text" className="form-control"
                                       placeholder="Enter email" required={true} value={username}
                                       onChange={event => setUsername(event.target.value)}/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                                    anyone else.</small>
                            </div>
                            <div className="form-group mb-5">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control"
                                       placeholder="Password" required={true}
                                       value={password} onChange={event => setPassword(event.target.value)}
                                />
                            </div>
                            <div className="form-group mb-5">
                                <NavLink to="/register">Register now</NavLink>
                            </div>
                            {isLoading ? <i className="text-danger">Loading....</i> :
                                <button type="submit" className="btn btn-primary">LOGIN</button>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login