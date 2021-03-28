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
        expiryDate: null,
        dateReceived: null,
        storageLocation: null,
      }
          
    }

    componentWillReceiveProps(nextProps) {
        const data = {
            reagentName: nextProps.selectedRow.selectedFlatRows ? nextProps.selectedRow.selectedFlatRows.reagentName : '', 
            supplier: nextProps.selectedRow.selectedFlatRows ? nextProps.selectedRow.selectedFlatRows.supplier : '', 
            lotNr: nextProps.selectedRow.selectedFlatRows ? nextProps.selectedRow.selectedFlatRows.lotNr : '', 
            catNr: nextProps.selectedRow.selectedFlatRows ? nextProps.selectedRow.selectedFlatRows.catNr : '', 
            expiryDate: null,
            dateReceived: null,             
            storageLocation: null, 
            unit: null
        }
        this.props.changeAddReagentForm(data)
        console.log(nextProps)
    }

    handleSubmit(values) {
        var expiryDate = "2010-01-01T23:56:02Z";
        var dateReceived = "2010-01-01T23:56:02Z";

        var times = Number(values.unit);
        
        for (var i=0; i<times; i++) {
            var unit = String(i+1) + "/" + String(times)
            this.props.postReagent(
                unit,
                values.reagentName, 
                values.supplier,
                values.lotNr,
                values.catNr,
                expiryDate,
                dateReceived,
                values.storageLocation)
        }        
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
                    {/*<Form
                        onSubmit={onSubmit}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit}>
                            <Field name="firstName" validate={required}>
                                {({ input, meta }) => (
                                <div>
                                    <label>First Name</label>
                                    <input {...input} type="text" placeholder="First Name" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                                )}
                            </Field>
                            <Field name="lastName" validate={required}>
                                {({ input, meta }) => (
                                <div>
                                    <label>Last Name</label>
                                    <input {...input} type="text" placeholder="Last Name" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                                )}
                            </Field>
                            <Field
                                name="age"
                                validate={composeValidators(required, mustBeNumber, minValue(18))}
                            >
                                {({ input, meta }) => (
                                <div>
                                    <label>Age</label>
                                    <input {...input} type="text" placeholder="Age" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                                )}
                            </Field>
                            <div className="buttons">
                                <button type="submit" disabled={submitting}>
                                Submit
                                </button>
                                <button
                                type="button"
                                onClick={form.reset}
                                disabled={submitting || pristine}
                                >
                                Reset
                                </button>
                            </div>
                            <pre>{JSON.stringify(values, 0, 2)}</pre>
                            </form>
                        )}
                    />*/}
                        {<Form model="addReagent" onSubmit={(values) => this.handleSubmit(values)}>
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
                                    <Label forHTML="expiryDate">Expiry Date</Label>                        
                                    <Control type="date" model=".expiryDate" id="expiryDate" 
                                        name="expiryDate" className="form-control"
                                        validators={{
                                            required
                                        }}/>  
                                    <Errors 
                                        className="text-danger"
                                        model=".expiryDate"
                                        show="touched"
                                        messages={{
                                            required: 'Required',                                            
                                        }}/>                                        
                                </Col>
                                <Col>
                                    <Label forHTML="dateReceived">Date Received</Label>                        
                                    <Control type="date" model=".dateReceived" id="dateReceived" name="dateReceived" 
                                        className="form-control"
                                        validators={{
                                            required
                                        }}/>  
                                    <Errors 
                                        className="text-danger"
                                        model=".dateReceived"
                                        show="touched"
                                        messages={{
                                            required: 'Required',                                            
                                        }}/>                                        
                                </Col>                                                       
                            </Row>
                            <Row className="form-group">
                                <Col md={6}>    
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
                                <Col md={2}>
                                    <Label htmlFor="unit">Unit</Label>
                                    <Control.text type="number" model=".unit" id="unit" name="unit"
                                        min="1"
                                        className="form-control"validators={{
                                            required
                                        }}/>  
                                    <Errors 
                                        className="text-danger"
                                        model=".unit"
                                        show="touched"
                                        messages={{
                                            required: 'Required',                                            
                                        }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit">
                                    Add Reagent
                                    </Button>
                                </Col>
                            </Row>
                        </Form>}                        
                    </div>                    
                </div>
            </div>          
        </div>
      );
    }
}

export default AddReagent;