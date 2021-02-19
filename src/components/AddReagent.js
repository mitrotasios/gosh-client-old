import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row} from 'reactstrap';
import {FaTimes} from 'react-icons/fa'

class AddReagent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        reagentName: ''
      }
          
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ reagentName: nextProps.selectedRow.selectedFlatRows ? nextProps.selectedRow.selectedFlatRows.first_name : ''});
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {        
      return (        
        <div className={`sidebar-content${this.props.isSidebarOpen === true ? ' open' : ''}`}>
            <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-1">
                        <a onClick={this.props.onSidebarToggle}><FaTimes /></a>
                    </div>                                        
                    <div className="col text-center">
                        <h4>Add New Reagent</h4>
                    </div>
                </div>
                <div className="row ml-2 mt-2">
                    <div className="col-12">
                        <Form>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label forHTML="reagentName">Reagent Name</Label>                        
                                        <Input id="reagentName" type="text" name="reagentName" placeholder="Reagent Name"
                                            value={this.state.reagentName} onChange={this.handleInputChange}/>                                        
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>                                
                                <Col>
                                    <FormGroup>
                                        <Label forHTML="lotNr">Lot Number</Label>                        
                                        <Input id="lotNr" type="text" name="lotNr" placeholder="Lot Number"/>
                                    </FormGroup>
                                </Col>                       
                                <Col>
                                    <FormGroup>
                                        <Label forHTML="catNr">Cat Number</Label>                        
                                        <Input id="catNr" type="catNr" name="catNr" placeholder="Cat Number"/>
                                    </FormGroup>
                                </Col>         
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label forHTML="expDate">Expiry Date</Label>                        
                                        <Input id="expDate" type="date" name="expDate" placeholder="date placeholder"/>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label forHTML="receivedDate">Date Received</Label>                        
                                        <Input id="receivedDate" type="date" name="receivedDate" placeholder="date placeholder"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label forHTML="unit">Unit</Label>                        
                                        <Input id="unit" type="number" name="unit" placeholder="-.-"/>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label forHTML="packNr">Pack Number</Label>                        
                                        <Input id="packNr" type="number" name="packNr" placeholder="-.-"/>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label forHTML="outOf">Out Of</Label>                        
                                        <Input id="outOf" type="number" name="outOf" placeholder="-.-"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label forHTML="condition">Condition</Label>                        
                                        <Input id="condition" type="select" name="condition">
                                            <option>GOOD</option>
                                            <option>ACCEPTABLE</option>
                                            <option>BAD</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label forHTML="storageLocation">Storage Location</Label>                        
                                        <Input id="storageLocation" type="select" name="storageLocation">
                                            <option>Met Prep Room</option>
                                            <option>Room 2</option>
                                            <option>Room 3</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label forHTML="action">Action (If condition is unacceptable)</Label>                        
                                        <Input rows="2" id="action" type="textarea" name="action"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label forHTML="comment">Comment</Label>                        
                                        <Input rows="5" id="comment" type="textarea" name="comment"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Button>Submit</Button>
                                    </FormGroup>                            
                                </Col>
                            </Row>                            
                        </Form>                        
                    </div>                    
                </div>
            </div>          
        </div>
      );
    }
}

export default AddReagent;