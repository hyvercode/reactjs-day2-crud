import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import Api from "../../api";
import {getToken} from "../../helpers/Common";

function BankCreate() {
    let navigate = useNavigate();
    const [active, setActive] = useState('Y')
    const [countries, setCountries] = useState([])
    const [bankId, setBankId] = useState('')
    const [countryCode, setCountryCode] = useState('')
    const [bankName, setBankName] = useState('')
    const [bankImageLink, setBankImageLink] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getCountries()
    }, []);


    const getCountries = async (e) => {
        await Api.get(
            `/v1/country/countries?countryName=`,
            {
                headers: {
                    Authorization: getToken(),
                },
            },
        ).then((response) => {
                setCountries(response.data.content)
            }, (error) => {
                console.log(error.response.data.message)
            }
        );
    }

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        Api.post('/v1/bank/add', {
                bankId: bankId,
                bankName: bankName,
                active: active,
                countryCode: countryCode,
                bankImageLink: bankImageLink
            }, {
                headers: {
                    Authorization: getToken(),
                }
            }
        ).then(response => {
            setIsLoading(false)
            alert('Record has been saved')
            navigate('/bank');
        }, (error) => {
            setIsLoading(false)
            alert(error.response.data.message)
        });
    }


    return (
        <div className="container">
            <div className="row mt-5 d-flex align-items-center justify-content-center">
                <div className="col-8">
                    <div className="card">
                        <div className="card-header">
                            <span className="text-center">Create Bank</span>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submit}>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 col-form-label">Bank Code</label>
                                    <div className="col-sm-10">
                                        <input type="text"
                                               className="form-control"
                                               value={bankId}
                                               onChange={(e) => setBankId(e.target.value)}
                                               required={true}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 col-form-label">Bank Name</label>
                                    <div className="col-sm-10">
                                        <input type="text"
                                               className="form-control"
                                               value={bankName}
                                               onChange={(e) => setBankName(e.target.value)}
                                               required={true}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 col-form-label">Country</label>
                                    <div className="col-sm-10">
                                        <select
                                            className="form-select"
                                            value={countryCode}
                                            onChange={(e) => setCountryCode(e.target.value)}
                                            required={true}
                                        >
                                            <option value="" disabled>Choose...</option>
                                            {
                                                countries.map((item, index) => (
                                                    <option key={index} value={item.countryCode}>
                                                        {item.countryName}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 col-form-label">Active</label>
                                    <div className="col-sm-10">
                                        <select className="form-select"
                                                value={active}
                                                onChange={(e) => setActive(e.target.value)}
                                                required={true}
                                        >
                                            <option value="Y">Yes</option>
                                            <option value="N">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3 row d-flex justify-content-end">
                                    <div className="col-sm-10">
                                        <NavLink to="/bank" className="btn btn-primary col-sm-2 mx-2">Cancel</NavLink>
                                        {
                                            isLoading ? <span className="btn btn-danger col-sm-2">Loading...</span>
                                                :
                                                <button className="btn btn-primary col-sm-2">Submit</button>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BankCreate
