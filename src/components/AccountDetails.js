import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row} from 'reactstrap';

class AccountDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fName: 'Anne',
            lName: 'Miller',
            email: 'anne.miller@gosh.nhs.uk',
            role: 'Lab Supervisor'
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
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
                            <Form>
                                <FormGroup row>
                                    <Label md={2} forHTML="fName">First Name</Label>                        
                                    <Col md={8}>
                                        <Input id="fName" type="text" name="fName"
                                            value={this.state.fName} onChange={this.handleInputChange}/>                                        
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label md={2} forHTML="lName">Last Name</Label>                        
                                    <Col md={8}>
                                        <Input id="lName" type="text" name="lName"
                                            value={this.state.lName} onChange={this.handleInputChange}/>                                        
                                    </Col>                            
                                </FormGroup>
                                <FormGroup row>
                                    <Label md={2} forHTML="email">Email</Label>                        
                                    <Col md={8}>
                                        <Input id="email" type="text" name="email"
                                            value={this.state.email} onChange={this.handleInputChange}/>
                                    </Col>                            
                                </FormGroup>
                                <FormGroup row>
                                    <Label md={2} forHTML="role">Role</Label>        
                                    <Col md={8}>
                                        <Input id="role" type="text" name="role"
                                            value={this.state.role} onChange={this.handleInputChange}/>
                                    </Col>                
                                </FormGroup>
                                <FormGroup row> 
                                    <Label md={2} forHTML="password">Password</Label>                                                    
                                    <Col md={6}>
                                        <Input id="password" type="text" name="password"
                                            value='********' onChange={this.handleInputChange}/>
                                    </Col>
                                    <Col md={{size:4}}>
                                        <Button>Edit</Button>
                                    </Col>                            
                                </FormGroup>                                
                                <FormGroup row>
                                    <Col md={{size:10, offset: 2}}>
                                        <Button>Save Changes</Button>
                                    </Col>
                                </FormGroup>                            
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