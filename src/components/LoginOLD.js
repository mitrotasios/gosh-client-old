import React, { Component } from 'react';
import { useHistory } from "react-router-dom";
import { Redirect} from 'react-router-dom';
import { Form, Field } from 'react-final-form';

const required = value => (value ? undefined : 'Required')

class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        alert(this.props.location)
    }
    
    handleLogin = (values) => {
        this.props.loginUser({username: values.username, password: values.password});
        return <Redirect to="/inventory/primary-reagents/overview" />
        /*
        if(this.props.location.state && this.props.location.state.from) {
            this.props.history.push(this.props.location.state.from);
        } else {
            this.props.history.push('/inventory/primary-reagents/overview');
        }
        */
    }

    onSuccessLogin = () => {
        //const {location} = props;
        return <Redirect to="/inventory/primary-reagents/overview" />
        
    }
    /*
    props.auth.isAuthenticated ? (
            //history.push("/inventory/primary-reagents/overview")
            onSuccessLogin()
        ) : (
    */
    //alert(props.auth.errMess)
    render() {
        if (!this.props.auth.isAuthenticated) {
            return(
                <div className="container-fluid">
                    <Form
                        onSubmit={this.handleLogin}
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
                    <div className="row">{this.props.auth.errMess == "Error 401: Unauthorized" ? ("Login Unsuccessfull") : ""}</div>                   
                </div>
            );
        }
        else {
            return <div>{this.onSuccessLogin()}</div>
        }
         
    }  
};

export default Login;