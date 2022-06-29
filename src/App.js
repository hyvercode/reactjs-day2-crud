import './App.css';
import Login from "./pages/Login";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PublicRoute from "./router/PublicRouter";
import NavBar from "./component/Navigation/NavBar";
import PrivateRoute from "./router/PrivateRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import RegisterSuccess from "./component/register/RegisterSuccess";
import Bank from "./pages/Bank";
import BankCreate from "./component/Bank/Create";
import BankUpdate from "./component/Bank/Update";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/Login"
                    element={
                        <PublicRoute>
                            <Login/>
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register/>
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register-success"
                    element={
                        <PublicRoute>
                            <RegisterSuccess/>
                        </PublicRoute>
                    }
                />
                <Route
                    exact
                    path="/"
                    element={
                        <PrivateRoute>
                            <div className="app">
                                <NavBar/>
                                <Home/>
                            </div>
                        </PrivateRoute>
                    }
                />
                <Route
                    exact
                    path="/bank"
                    element={
                        <PrivateRoute>
                            <div className="app">
                                <NavBar/>
                                <Bank/>
                            </div>
                        </PrivateRoute>
                    }
                />
                <Route
                    exact
                    path="/bank/create"
                    element={
                        <PrivateRoute>
                            <div className="app">
                                <NavBar/>
                                <BankCreate/>
                            </div>
                        </PrivateRoute>
                    }
                />
                <Route
                    exact
                    path="/bank/update/:id"
                    element={
                        <PrivateRoute>
                            <div className="app">
                                <NavBar/>
                                <BankUpdate/>
                            </div>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
