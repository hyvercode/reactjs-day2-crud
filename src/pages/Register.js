import React, {useState} from "react";
import Api from "../api";
import {windowReload} from "../helpers/Common";
import {useNavigate} from 'react-router-dom';

function Register(props) {
    const [email,setEmail] = useState('')
    const [password,setPassword]=useState('')
    const active ='Y';
    const employeeId = 1;
    const outletId=1;
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        Api.post('/v1/auth/register', {
            username: email,
            password: password,
            active:active,
            employeeId:employeeId,
            outletId:outletId
        }).then(response => {
            setIsLoading(false)
            navigate('/register-success');
        }, (error) => {
            alert(error.response.data.message)
            windowReload();
        });
    }

    return (
        <div className="d-flex justify-content-center py-5">
            <div className="card">
                <div className="card-header">
                    <h1>Register</h1>
                </div>
                <div className="card-body">
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter email"/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                                anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                        </div>
                        {
                            isLoading?<i className="text-danger">Loading...</i>:<button type="submit" className="btn btn-primary">Submit</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;
