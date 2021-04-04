import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import Sidebar from './Sidebar';

const required = value => (value ? undefined : 'Required')
const matchesOldPassword = oldPassword => value => ( value == oldPassword ? undefined : 'Does not match old password' )
const newPasswordsMatch = newPassword => value => ( value == newPassword ? undefined : 'Passwords do not match' )
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

class AccountDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: 'Anne',
            lastName: 'Miller',
            username: 'anne.miller@gosh.nhs.uk',
            role: 'Lab Supervisor',
            oldPassword: '1234567',
            editPassword: false,
        }
    }

    editPassword = () => {
        this.setState({
            editPassword: true
        });
    }

    handleSubmit = async values => {
        alert(values);
    }

    render() {
        return (
            <div className="container-fluid">
                <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} logoutUser={this.props.logoutUser} />                        
                <div className="row">
                    <div className="col">
                        First Name
                    </div>
                    <div className="col">
                        {this.state.firstName}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Last Name
                    </div>
                    <div className="col">
                        {this.state.lastName}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Username
                    </div>
                    <div className="col">
                        {this.state.username}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Password
                    </div>
                    <div className="col">
                        <button onClick={this.editPassword}>
                            Edit
                        </button>
                    </div>
                </div>
                {!this.state.editPassword ? <div></div> : (
                    <Form
                        onSubmit={this.handleSubmit}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit}>
                            <Field
                                name="oldPassword"
                                validate={composeValidators(required, matchesOldPassword(this.state.oldPassword))}
                            >
                                {({ input, meta }) => (
                                <div className="row">
                                    <div className="col">
                                        <label>Old Password</label>
                                    </div>
                                    <div className="col">
                                        <input {...input} type="password" placeholder="Old Pasasword" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                </div>
                                )}
                            </Field>
                            <Field
                                name="newPassword"
                                validate={required}
                            >
                                {({ input, meta }) => (
                                <div className="row">
                                    <div className="col">
                                        <label>New Password</label>
                                    </div>
                                    <div className="col">
                                        <input {...input} type="password" placeholder="New Pasasword" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                </div>
                                )}
                            </Field>
                            <Field
                                name="confirmPassword"
                                validate={composeValidators(required, newPasswordsMatch(values.newPassword))}
                            >
                                {({ input, meta }) => (
                                <div className="row">
                                    <div className="col">
                                        <label>Confirm New Password</label>
                                    </div>
                                    <div className="col">
                                        <input {...input} type="password" placeholder="Confirm New Pasasword" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                </div>
                                )}
                            </Field>
                            <div className="row">
                                <div className="col">
                                    <button type="submit" disabled={submitting}>
                                    Save Password
                                    </button>
                                </div>
                            </div>
                            </form>
                        )}
                    />
                )}
            </div>
        );
    };
}

export default AccountDetails