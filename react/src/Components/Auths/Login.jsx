import React, {useState} from 'react';
import {useWebStateContext} from "../../Contexts/WebContextProvider";
import axiosWebInstance from "../../axiosWebInstance";


const Login = () => {

    const [formData, setFormData] = useState({email: '', password: ''});
    const [formDataErr, setFormDataErr] = useState('');
    const [errors, setErrors] = useState("");

    const {setAuthUser, manageToken} = useWebStateContext();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = () => {
        setFormDataErr(''); setErrors('');
        axiosWebInstance.post('/login', {email:formData.email, password:formData.password, role:2})
        .then((response) => {
            setAuthUser(response.data.user);
            manageToken(response.data.token);
        })
        .catch((error) => {
            const errors = error.response;
            console.log('check-errors:: ',errors);
            if(errors && errors.status === 422) {
                setFormDataErr(errors.data.errors); }
            else {
                setErrors(errors.data.msg); }
        });
    }

    return (
        <>
            <div className="card mb-3">
                <div className="card-body">
                    <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                        <p className="text-center small">Enter your Email & Password to login</p>
                    </div>

                    {errors.length > 0 && (
                        <>
                            <div className="alert alert-danger">
                                <div className="text-center"> {errors} </div>
                            </div>
                        </>
                    )}

                    <form className="row g-3 needs-validation" >
                        <div className="col-12">
                            <label htmlFor="email" className="form-label">Email</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">@</span>
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    id="email"
                                    autoComplete="off"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            {(formDataErr.email) ? <div className="invalid-feedback">{formDataErr.email}</div> : ''}
                        </div>

                        <div className="col-12">
                            <label htmlFor="yourPassword" className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="yourPassword"
                                autoComplete="off"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {(formDataErr.password) ? <div className="invalid-feedback">{formDataErr.password}</div> : ''}
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary w-100" type="button" onClick={handleSubmit}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;