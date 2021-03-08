import React, { Component } from 'react';
import { Button, Label, Input, Col, Row} from 'reactstrap';
import {Control, Form, Errors, actions} from 'react-redux-form';

class AccountDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // fName: 'Anne',
            // lName: 'Miller',
            // email: 'anne.miller@gosh.nhs.uk',
            // role: 'Lab Supervisor',

            inputs: [
                'fName',
                'lName',
                'email',
                'role',
                'password'
            ]
        }
    }

    // handleInputChange = (event) => {
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;

    //     this.setState({
    //         [name]: value
    //     });
    // }

    handleSubmit = () => {

    }

    changePassword = () => {
        this.setState(prevState => ({ inputs: prevState.inputs.concat(['oldPassword', 'newPassword']) }));
    }

    render() {
        return(
            <>
            <div id="page-wrap" className="container-fluid">
                <div className="container-fluid">
                    <div className="row text-center">
                        <img id="logo" src="/assets/images/GOSH.png" height="40px" width="200px"/>                    
                        <div className="ml-auto">
                        </div>   
                    </div>                
                </div>
                <div className="table-container container-fluid">    
                    <div className="container-fluid lm-3 ">
                        <div className="row">
                            <div className="col-md-6">
                            <Form model="accountInfo" onSubmit={(values) => this.handleSubmit(values)}>
                                {this.state.inputs.map(input => {
                                    var label = '';
                                    var inputName = '';
                                    var validation = false;
                                    var value = null;
                                    
                                    switch(input) {
                                        case 'fName':
                                            label = 'First Name'
                                            inputName = 'fName';
                                            validation = false;
                                            value=this.state.fName;
                                            break;
                                        case 'lName':
                                            label = 'Last Name'
                                            inputName = 'lName';
                                            validation = false;
                                            value=this.state.lName;
                                            break;
                                        case 'email':
                                            label = 'Email'
                                            inputName = 'email';
                                            validation = false;
                                            value=this.state.email;
                                            break;
                                        case 'role':
                                            label = 'Role'
                                            inputName = 'role';
                                            validation = false;
                                            value=this.state.role;
                                            break;
                                        case 'password':
                                            label = 'Password'
                                            inputName = 'password';
                                            validation = false;
                                            value='********';
                                            break;
                                        case 'oldPassword':
                                            label = 'Old Password'
                                            inputName = 'oldPassword';
                                            validation = true;
                                            value=null
                                            break;
                                        case 'newPassword':
                                            label = 'New Password'
                                            inputName = 'newPassword';
                                            validation = true;
                                            value=null
                                            break;
                                    }   
                                    return(
                                        <Row className="form-group">
                                            <Label md={2} forHTML={inputName}>{label}</Label>                        
                                            <Col md={inputName=="password" ? 6 : 8}>
                                                {inputName=="password" || inputName=="oldPassword" || inputName=="oldPassword" ? (
                                                    <Control type="password" model={'.'+inputName} id={inputName} name={inputName}
                                                    />                                            
                                                ) : <Control.text model={'.'+inputName} id={inputName} name={inputName}
                                                    />}                                        
                                            </Col>
                                            <Col>
                                                {inputName=="password" ? <Button onClick={this.changePassword}>Edit</Button> : null}
                                            </Col>                                            
                                        </Row>
                                    );                                                          
                                })}
                                <Row className="form-group">
                                    <Col md={{size:10, offset:2}}>
                                        <Button type="submit">
                                            Save Changes
                                        </Button>
                                    </Col>
                                </Row>                        
                            </Form>

                            </div>
                        </div>
                    
                    </div>                    
                </div>
            </div>
            </>
        );
    }
}

export default AccountDetails;