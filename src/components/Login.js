
import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { query, where, getDocs } from 'firebase/firestore'
import { userRef } from "./firebase/firebase";
import { appstate } from "../App";
import bcrypt from 'bcryptjs'
import swal from "sweetalert";


const LoginForm = () => {
    let navigate = useNavigate();
    const useAppstate = useContext(appstate);
    const [form, setForm] = useState({
        mobile: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        try {
            const quer = query(userRef, where('mobile', '==', form.mobile.toString()))
            const querySnapshot = await getDocs(quer);

            querySnapshot.forEach((doc) => {
                const _data = doc.data();
                const isUser = bcrypt.compareSync(form.password, _data.password);
                if (isUser) {
                    useAppstate.setlogin(true);
                    useAppstate.setusername(_data.name);
                    swal({
                        title: "Logged In",
                        icon: "success",
                        buttons: false,
                        timer: 3000
                    })
                    navigate('/')
                } else {
                    swal({
                        title: "Invalid Credentials",
                        icon: "error",
                        buttons: false,
                        timer: 3000
                    })
                }
            })
        } catch (error) {
            swal({
                title: error.message,
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
        setLoading(false);
    }

    return (
        <div className="login-form-container">
            <h1 className="form-title">Login</h1>
            <div className="form-group">
                <label htmlFor="mobile" className="form-label">
                    Mobile No.
                </label>
                <input
                    type="number"
                    id="mobile"
                    name="mobile"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="form-input passward"
                />
            </div>
            <div className="form-group">
                <button className="form-button" onClick={login}>
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </div>
            <div className="form-group">
                <p className='p'>
                    Do not have an account? <Link to={'/signup'}><span className="form-link">Sign Up</span></Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;

