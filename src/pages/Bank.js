import React, {useEffect, useState} from "react";
import Api from "../api";
import {getToken} from "../helpers/Common";
import {NavLink, useNavigate} from "react-router-dom";

function Bank() {
    let navigate = useNavigate();
    const [banks, setBanks] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [pagination, setPagination] = useState({
        pageSize: 10,
        currentPage: 1,
        totalPages: 1,
        totalRecords: 1,
        isFirstPage: false,
        isLastPage: false,
    })
    const [sortBy, setSortBy] = useState("bankName")
    const [sortType, setSortType] = useState('ASC')
    const [searchBy, setSearchBy] = useState("")

    useEffect(() => {
        getListBank(pagination).then(res => {
            return res;
        })
    }, [])

    const getListBank = async (page) => {
        setIsLoading(true)
        await Api.get(`/v1/bank/list?pageSize=${page.pageSize}&pageNumber=${page.currentPage}&sortBy=${sortBy}&sortType=${sortType}&searchBy=${searchBy}`, {
            headers: {
                Authorization: getToken(),
            },
        }).then((response) => {
            setIsLoading(false)
            setBanks(response.data.content)
            setPagination(response.data.pagination)
        }, (error) => {
            setIsLoading(false)
            console.log(error.response.data.message)
        });
    }

    const refresh = async (e) => {
        let page = Object.assign({}, pagination);
        await getListBank(page).then(r => {
            return r;
        });
    }

    const create = (e) => {
        e.preventDefault();
        navigate('/bank/create');
    }

    const searching = async (e) => {
        let page = Object.assign({}, pagination);
        await getListBank(page).then(r => {
            return r;
        });
    }

    const prev = async (e) => {
        e.preventDefault();
        let page = Object.assign({}, pagination);
        if (!pagination.isFirstPage) {
            page.currentPage = pagination.currentPage - 1;
            await getListBank(page)
        }
    }

    const next = async (e) => {
        e.preventDefault();
        let page = Object.assign({}, pagination);
        if (!pagination.isLastPage) {
            page.currentPage = pagination.currentPage + 1;
            await getListBank(page)
        }
    }

    const changePageSize = async (e) => {
        e.preventDefault();
        let page = Object.assign({}, pagination);
        page.pageSize = e.target.value;
        page.currentPage = 1;
        await getListBank(page)
    }

    return (<div className="container mt-3">
        <h2>Banks</h2>
        <div className="row">
            <div className="col-9">
                <div className="input-group mb-3 col-12">
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="form-select">
                        <option value="" selected>Choose...</option>
                        <option value="bankId">Bank Code</option>
                        <option value="bankName">Bank Name</option>
                        <option value="countryCode">Country Code</option>
                    </select>
                    <input type="text" value={searchBy} onChange={(e) => setSearchBy(e.target.value)}
                           className="form-control w-50 " placeholder="Searching"/>
                    <select value={sortType} onChange={(e) => setSortType(e.target.value)}
                            className="form-select input-group-text">
                        <option value="ASC" selected>Asc</option>
                        <option value="DESC">Desc</option>
                    </select>
                    <button className="input-group-text btn btn-primary" onClick={searching}>Search</button>
                </div>
            </div>
            <div className="col-3">
                <button className="btn btn-primary float-end mx-2" onClick={create}>Add New</button>
                <button className="btn btn-primary float-end" onClick={refresh}>Refresh</button>
            </div>
        </div>
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead>
                <tr className="border-top">
                    <th>No.</th>
                    <th>Bank Code</th>
                    <th>Bank Name</th>
                    <th>Country Code</th>
                    <th>Active</th>
                    <th>Action</th>
                </tr>
                </thead>
                {isLoading ? <tbody>
                <tr>
                    <td className="" colSpan="6">
                        <i className="text-danger text-center">Loading...</i>
                    </td>
                </tr>
                </tbody> : <tbody>
                {banks.filter((item) => {
                    return item.bankName.includes(searchBy)
                }).map((item, index) => (<tr key={index}>
                    <td>
                        {
                            pagination.pageSize * (pagination.currentPage - 1) + index + 1
                        }
                    </td>
                    <td>{item.bankId}</td>
                    <td>{item.bankName}</td>
                    <td>{item.countryCode}</td>
                    <td>
                        <span
                            className={item.active ? 'badge bg-success' : 'badge bg-danger'}>{item.active === "Y" ? "Yes" : "No"}</span>
                    </td>
                    <td className="mx-auto">
                        <NavLink className="btn btn-sm btn-outline-success mx-2" to={`/bank/update/${item.bankId}`}
                        >
                            Edit
                        </NavLink>
                    </td>
                </tr>))}
                </tbody>}
            </table>
        </div>
        {/* Pagination */}
        <div className="d-flex justify-content-md-between justify-content-around pagination mb-5 bg-light py-3 px-2">
            <div className="btn-toolbar mb-2 mb-md-0">
                <label style={{marginTop: 1}}>Total Records :{pagination.totalRecords} </label>
                <label style={{marginTop: 1}} className="mx-3"> Per Page : </label>
                <select
                    className="form-select form-select-sm d-block w-25"
                    style={{width: 80, marginLeft: 5}}
                    value={pagination.pageSize}
                    onChange={changePageSize}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                </select>
            </div>
            <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={prev}
                    >
                        Prev
                    </button>
                    <button className="btn btn-sm btn-outline-secondary" disabled>
                        {pagination.currentPage}/{pagination.totalPages}
                    </button>
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={next}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>)
}

export default Bank
