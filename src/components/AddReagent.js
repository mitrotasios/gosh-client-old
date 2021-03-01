import React, { Component } from 'react';
//import { Button, Form, FormGroup, Label, Input, Col, Row} from 'reactstrap';
import { Label, Button, Col, Row} from 'reactstrap';
import {FaTimes} from 'react-icons/fa'
import {Control, Form, Errors, actions} from 'react-redux-form';

const required = (val) => val && val.length;

class AddReagent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        reagentName: '',
        supplier: '',
        lotNr: '',
        catNr: '',
        expDate: null,
        receivedDate: null,
        condition: null,
        storageLocation: null,
        action: '',
        comment: '',
        unit: null
      }
          
    }

    componentWillReceiveProps(nextProps) {
        const data = {
            reagentName: nextProps.selectedRow.selectedFlatRows ? nextProps.selectedRow.selectedFlatRows.reagent_name : '', 
            supplier: nextProps.selectedRow.selectedFlatRows ? nextProps.selectedRow.selectedFlatRows.supplier : '', 
            lotNr: nextProps.selectedRow.selectedFlatRows ? nextProps.selectedRow.selectedFlatRows.lot_number : '', 
            catNr: nextProps.selectedRow.selectedFlatRows ? nextProps.selectedRow.selectedFlatRows.cat_number : '', 
            expDate: null,
            receivedDate: null,             
            condition: null, 
            storageLocation: null, 
            comment: '',
            action: ''
        }
        this.props.changeAddReagentForm(data)
        console.log(nextProps)
    }

    handleSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
        var expDate = "2010-01-01T23:56:02Z";
        var receivedDate = "2010-01-01T23:56:02Z";

        this.props.postReagents(
            values.reagentName, 
            values.supplier,
            values.lotNr,
            values.catNr,
            expDate,
            receivedDate,
            values.condition,
            values.storageLocation,
            values.comment)
        //this.props.resetAddReagentsForm();
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
                        <Form model="addReagent" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Label forHTML="reagentName">Reagent Name</Label>                        
                                    <Control.text model=".reagentName" id="reagentName" name="reagentName"
                                        placeholder="Reagent Name" 
                                        className="form-control" 
                                        validators={{
                                            required
                                        }} />  
                                    <Errors 
                                        className="text-danger"
                                        model=".supplier"
                                        show="touched"
                                        messages={{
                                            required: 'Required',                                            
                                        }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label forHTML="supplier">Supplier</Label>                        
                                    <Control.text model=".supplier" id="supplier" name="supplier"
                                        placeholder="Supplier" 
                                        className="form-control" 
                                        validators={{
                                            required
                                        }} />  
                                    <Errors 
                                        className="text-danger"
                                        model=".supplier"
                                        show="touched"
                                        messages={{
                                            required: 'Required',                                            
                                        }}/>                                                                          
                                </Col>
                            </Row>
                            <Row className="form-group">                                
                                <Col>
                                    <Label forHTML="lotNr">Lot Number</Label>                        
                                    <Control.text model=".lotNr" id="lotNr" name="lotNr"
                                        placeholder="Lot Number" 
                                        className="form-control" 
                                        validators={{
                                            required
                                        }} />  
                                    <Errors 
                                        className="text-danger"
                                        model=".lotNr"
                                        show="touched"
                                        messages={{
                                            required: 'Required',                                            
                                        }}/> 
                                </Col>                                                       
                                <Col>
                                    <Label forHTML="catNr">Cat Number</Label>                        
                                    <Control.text model=".catNr" id="catNr" name="catNr"
                                        placeholder="Cat Number" 
                                        className="form-control" 
                                        validators={{
                                            required
                                        }} />  
                                    <Errors 
                                        className="text-danger"
                                        model=".catNr"
                                        show="touched"
                                        messages={{
                                            required: 'Required',                                            
                                        }}/>                                        
                                </Col>                                                       
                            </Row>
                            <Row className="form-group">                                
                                <Col>
                                    <Label forHTML="expDate">Expiry Date</Label>                        
                                    <Control type="date" model=".expDate" id="expDate" 
                                        name="expDate" className="form-control"
                                        validators={{
                                            required
                                        }}/>  
                                    <Errors 
                                        className="text-danger"
                                        model=".expDate"
                                        show="touched"
                                        messages={{
                                            required: 'Required',                                            
                                        }}/>                                        
                                </Col>
                                <Col>
                                    <Label forHTML="receivedDate">Date Received</Label>                        
                                    <Control type="date" model=".receivedDate" id="receivedDate" name="receivedDate" 
                                        className="form-control"
                                        validators={{
                                            required
                                        }}/>  
                                    <Errors 
                                        className="text-danger"
                                        model=".receivedDate"
                                        show="touched"
                                        messages={{
                                            required: 'Required',                                            
                                        }}/>                                        
                                </Col>                                                       
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label forHTML="condition">Condition</Label>                            
                                    <Control.select model=".condition" name="condition"                                 
                                        className="form-control"
                                        validators={{
                                            required
                                        }}>
                                        <option>–</option>
                                        <option>GOOD</option>
                                        <option>INACCEPTABLE</option>                                                
                                    </Control.select>
                                    <Errors 
                                        className="text-danger"
                                        model=".condition"
                                        show="touched"
                                        messages={{
                                            required: 'Required',                                            
                                        }}/>   
                                </Col>
                                <Col >    
                                    <Label forHTML="storageLocation">Storage Location</Label>
                                    <Control.select model=".storageLocation" name="storageLocation"                                 
                                        className="form-control"
                                        validators={{
                                            required
                                        }}>
                                        <option>–</option>
                                        <option>ROOM1</option>
                                        <option>ROOM2</option>
                                        <option>ROOM3</option>                                                
                                    </Control.select>
                                    <Errors 
                                        className="text-danger"
                                        model=".storageLocation"
                                        show="touched"
                                        messages={{
                                            required: 'Required',                                            
                                        }}/>                                    
                                </Col>
                            </Row>
                            <Row className="form-group">                                
                                <Col>
                                    <Label htmlFor="action">Action (If condition is unacceptable)</Label>
                                    <Control.textarea model=".action" id="action" name="action" rows="3"
                                        className="form-control"/>  
                                </Col>
                            </Row>
                            <Row className="form-group">                                
                                <Col>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="3"
                                        className="form-control"/>  
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit">
                                    Add Reagent
                                    </Button>
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