import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app from "./firebase/firebase"
import swal from 'sweetalert';
import { addDoc } from 'firebase/firestore';
import { userRef } from './firebase/firebase';
import { useNavigate } from 'react-router-dom';
import bcrypt from "bcryptjs"




const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        mobile: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [otpsent, setotpsent] = useState(false)
    const [otp, setotp] = useState("")

    const auth = getAuth(app);

    const genrateRecaptcaptha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
            }
        }, auth);
    }
    const Requestotp = () => {
        setLoading(true)
        genrateRecaptcaptha();
        let appverifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${form.mobile}`, appverifier)
            .then(confirmationResult => {
                window.confirmationResult = confirmationResult;
                swal({
                    text: "otp sent",
                    icon: "success",
                    buttons: false,
                    timer: 3000,
                })
                setotpsent(true)
                setLoading(false)
            }).catch((error) => {
                console.log(error)
            })
    }
    const verifyOTP = () => {
        try {
            setLoading(true);
            window.confirmationResult.confirm(otp).then((result) => {
                uploadData();
                swal({
                    text: "Sucessfully Registered",
                    icon: "success",
                    buttons: false,
                    timer: 3000,
                });
                navigate('/login')
                setLoading(false);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const uploadData = async () => {
        try {
            const salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(form.password, salt);
            await addDoc(userRef, {
                name: form.name,
                password: hash,
                mobile: form.mobile
            });
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <>
            <h1 className="form-title">Signup</h1>
            {
                otpsent ? <div><div className="form-group">
                    <label htmlFor="mobile" className="form-label">
                        Otp verfication
                    </label>
                    <input
                        type="number"
                        id="mobile"
                        name="mobile"
                        value={otp}
                        onChange={(e) => setotp(e.target.value)}
                        className="form-input"
                    />

                </div>
                    <div className="form-group">
                        <button className="form-button" onClick={verifyOTP} >
                            {loading ? 'Loading...' : 'Signup'}
                        </button>
                    </div>
                </div>

                    :

                    <div className="login-form-container">
                        <div className="form-group">
                            <label htmlFor="mobile" className="form-label">
                                username
                            </label>
                            <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="form-input"
                            />
                        </div>
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
                            <button className="form-button" onClick={Requestotp}>
                                {loading ? 'Loading...' : 'Requestotp'}
                            </button>
                        </div>
                        <div className="form-group">
                            <p className='p'>
                                you have not account? <Link to={'/login'}><span className="form-link">login</span></Link>
                            </p>
                        </div>
                        <div id='sign-in-button'></div>
                    </div>
            }

        </>);
};

export default Signup;