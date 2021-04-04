import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Form, Field } from 'react-final-form';

const required = value => (value ? undefined : 'Required')

export const Login = (props) => {
    

    const { state } = useLocation();
    const { from } = state || { from: { pathname: "/" } };
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

    const login = () => {
        setRedirectToReferrer(true);
    };

    if (redirectToReferrer) {
        props.fetchReagents();
        props.fetchDeletedReagents();
        props.fetchSecReagents();
        props.fetchDeletedSecReagents();
        props.fetchTests();
        props.fetchTestTypes();
        return <Redirect to={from} />;
    }

    const handleLogin = (values) => {
        props.loginUser({username: values.username, password: values.password});
    }


    if (!props.auth.isAuthenticated) {
        return(
            <div className="container-fluid">
                <Form
                    onSubmit={handleLogin}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <>                                     
                        <h4>Login</h4>
                        <div className="row ml-2 mt-2">
                            <div className="container">
                                <form id="loginForm" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <Field
                                        name="username"
                                        component="input"
                                        type="text"
                                        validate={required}
                                        >
                                        {({ input, meta }) => (
                                            <div className="col-12">
                                                <label>Username</label>
                                                <input {...input} placeholder="Reagent Name"/>
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </div>
                                        )}
                                        </Field>
                                    </div>
                                    <div className="row">
                                        <Field
                                        name="password"
                                        component="input"
                                        type="password"
                                        validate={required}
                                        >
                                        {({ input, meta }) => (
                                            <div className="col-12">
                                                <label>Password</label>
                                                <input {...input} placeholder="Password"/>
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </div>
                                        )}
                                        </Field>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <button type="submit" disabled={submitting || pristine}>
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>  
                        </div>                                             
                        </>
                    )}
                /> 
                <div className="row">{props.auth.errMess == "Error 401: Unauthorized" ? ("Login Unsuccessfull") : ""}</div>                   
            </div>
        );
    }
    else {
        return login()
    }
}  
