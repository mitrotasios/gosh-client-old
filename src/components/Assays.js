import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText, Button, Modal, ModalHeader, ModalBody, Row, Col, Label} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';

function RenderAssay({ assay }) {
    return (
        <div className="col-4">
            <Card id={assay.assay_id}>                            
                <CardBody>                    
                    <CardTitle><h4>{assay.test_name}</h4></CardTitle>
                    <CardText>
                        <h5>Reagents</h5>
                        <div className="container-fluid">
                            <div className="row">                                
                                {assay.metadata[0].children.map(reagent => {
                                    return(
                                        <>
                                            <div className="col-4">
                                                {reagent.label}
                                            </div>
                                        </>
                                    );
                                })}
                            </div>                            
                        </div>
                        <p>{}</p>
                        <h5>Other</h5>
                        <div className="container">
                            <div className="row">                                
                                {assay.metadata[1].children.map(reagent => {
                                    return(
                                        <>
                                            <div className="col-4">
                                                {reagent.label}
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                    </CardText>
                </CardBody>
            </Card>
        </div>        
    )
}

class Assays extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            reagentInputs: ['r_1'],
            reagentDataInputs: ['rd_1'],
            otherInputs: ['o_1'],
            
            assays: [
                {
                    test_name: 'Test Assay',
                    assay_id: 1,
                    metadata: [
                        {
                            key: 'reagents',
                            type: 'group',
                            children: [
                                {
                                    key: 'int_std_lot',
                                    type: 'input',
                                    label: 'INT STD LOT',
                                    required: false
                                },
                                {
                                    key: 'acn_lot',
                                    type: 'input',
                                    label: 'ACN LOT',
                                    required: false
                                },
                                {
                                    key: 'meqh_lot',
                                    type: 'input',
                                    label: 'MEQH LOT',
                                    required: false
                                },
                            ] 
                        },
                        {
                            key: 'other',
                            type: 'group',
                            children: [
                                {
                                    key: 'seal_wash_date_lot',
                                    type: 'date',
                                    label: 'Seal Wash Date',
                                    required: false
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    addReagentInput = () => {
        var curr =  this.state.reagentInputs[this.state.reagentInputs.length-1]
        curr = String(Number(curr.split("_").pop())+1)
        console.log("create", 'r_'+curr)
        this.setState(
            prevState => ({ reagentInputs: prevState.reagentInputs.concat(['r_'+curr])})
        );
    }

    removeReagentInput = (num) => {
        console.log("remove", num)
        var tempArray = this.state.reagentInputs.slice();
        var index = tempArray.indexOf(num);
        console.log("The index is", index)
        if (index !== -1) {
            tempArray.splice(index, 1);
        }
        //tempArray.splice(-1,1);
        console.log("TempArray", tempArray)
        this.setState(
            {reagentInputs: tempArray}
        );
    }

    addReagentDataInput = () => {
        var curr =  this.state.reagentDataInputs[this.state.reagentDataInputs.length-1]
        curr = String(Number(curr.split("_").pop())+1)
        console.log("create", 'rd_'+curr)
        this.setState(
            prevState => ({ reagentDataInputs: prevState.reagentDataInputs.concat(['rd_'+curr])})
        );
    }

    removeReagentDataInput = (num) => {
        console.log("remove", num)
        var tempArray = this.state.reagentDataInputs.slice();
        var index = tempArray.indexOf(num);
        console.log("The index is", index)
        if (index !== -1) {
            tempArray.splice(index, 1);
        }
        //tempArray.splice(-1,1);
        console.log("TempArray", tempArray)
        this.setState(
            {reagentDataInputs: tempArray}
        );
    }

    addOtherInput = () => {
        var curr =  this.state.otherInputs[this.state.otherInputs.length-1]
        curr = String(Number(curr.split("_").pop())+1)
        console.log("create", 'o_'+curr)
        this.setState(
            prevState => ({ otherInputs: prevState.otherInputs.concat(['o_'+curr])})
        );
    }

    removeOtherInput = (num) => {
        console.log("remove", num)
        var tempArray = this.state.otherInputs.slice();
        var index = tempArray.indexOf(num);
        console.log("The index is", index)
        if (index !== -1) {
            tempArray.splice(index, 1);
        }
        //tempArray.splice(-1,1);
        console.log("TempArray", tempArray)
        this.setState(
            {otherInputs: tempArray}
        );
    }

    handleSubmit = (values) => {
        this.toggleModal();
        alert("Current State is: " + JSON.stringify(values));
    }

    render() {
        return(            
            <div id="page-wrap" className="container-fluid">
                <div className="container-fluid">
                    <div className="row text-center">
                        <img id="logo" src="/assets/images/GOSH.png" height="40px" width="200px"/>                    
                        <div className="ml-auto">
                            <Button onClick={this.toggleModal}>Add Assay</Button>
                        </div>                 
                    </div>                
                </div>
                <div className="table-container container-fluid">                    
                    <div className="row">
                        {this.state.assays.map(assay => {
                            return <RenderAssay assay={assay}/>
                        })}
                                         
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} size="lg">
                    <ModalHeader toggle={this.toggleModal}>Add New Assay Type</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <h4>Reagents</h4>               
                                {this.state.reagentInputs.map(num => {  
                                    return(
                                        <Row className="form-group">
                                            <Col md={10}>                                            
                                                <Control.text model={'.reagent_'+String(num)} id={'reagent_'+String(num)} name={'reagent_'+String(num)}
                                                placeholder="Reagent Name" 
                                                className="form-control"
                                                withFieldValue={true}/>
                                            </Col>     
                                            {num === this.state.reagentInputs[0] ? (                                                
                                                <Col md={1}>
                                                    <Button onClick={this.addReagentInput}>+</Button>
                                                </Col>
                                            ) : (
                                                <Col md={1}>
                                                    <Button color="danger" onClick={() => this.removeReagentInput(String(num))}>-</Button>
                                                </Col>
                                            )}                                
                                        </Row>
                                    );                                                                                                   
                                })}     
                            <h4>Reagent Data</h4>    
                                {this.state.reagentDataInputs.map(num => {  
                                    return(
                                        <Row className="form-group">
                                            <Col md={5}>                                            
                                                <Control.text model={'.rd_name_'+String(num)} id={'rd_name_'+String(num)} name={'rd_name_'+String(num)}
                                                placeholder="Field Name" 
                                                className="form-control"
                                                withFieldValue={true}/>
                                            </Col>
                                            <Col md={2}>                                            
                                                <Control.select model={'.rd_type_'+String(num)} id={'rd_type_'+String(num)} name={'rd_type_'+String(num)}                                 
                                                className="form-control">
                                                    <option>Text</option>
                                                    <option>Date</option>
                                                </Control.select>
                                            </Col>    
                                            <Col md={3}>                                            
                                                <Control.select model={'.rd_req_'+String(num)} id={'rd_req_'+String(num)} name={'rd_req_'+String(num)}                                 
                                                className="form-control">
                                                    <option>Not Required</option>
                                                    <option>Required</option>
                                                </Control.select>
                                            </Col> 
                                            {num === this.state.reagentDataInputs[0] ? (                                                
                                                <Col md={1}>
                                                    <Button onClick={this.addReagentDataInput}>+</Button>
                                                </Col>
                                            ) : (
                                                <Col md={1}>
                                                    <Button color="danger" onClick={() => this.removeReagentDataInput(String(num))}>-</Button>
                                                </Col>
                                            )}                                
                                        </Row>
                                    );                                                                                                   
                                })}    
                            <h4>Other</h4>    
                                {this.state.otherInputs.map(num => {  
                                    return(
                                        <Row className="form-group">
                                            <Col md={5}>                                            
                                                <Control.text model={'.o_name_'+String(num)} id={'o_name_'+String(num)} name={'o_name_'+String(num)}
                                                placeholder="Field Name" 
                                                className="form-control"
                                                withFieldValue={true}/>
                                            </Col>
                                            <Col md={2}>                                            
                                                <Control.select model={'.o_type_'+String(num)} id={'o_type_'+String(num)} name={'o_type_'+String(num)}                                 
                                                className="form-control">
                                                    <option>Text</option>
                                                    <option>Date</option>
                                                </Control.select>
                                            </Col> 
                                            <Col md={3}>                                            
                                                <Control.select model={'.o_req_'+String(num)} id={'o_req_'+String(num)} name={'o_req_'+String(num)}                                 
                                                className="form-control">
                                                    <option>Not Required</option>
                                                    <option>Required</option>
                                                </Control.select>
                                            </Col>    
                                            {num === this.state.otherInputs[0] ? (                                                
                                                <Col md={1}>
                                                    <Button onClick={this.addOtherInput}>+</Button>
                                                </Col>
                                            ) : (
                                                <Col md={1}>
                                                    <Button color="danger" onClick={() => this.removeOtherInput(String(num))}>-</Button>
                                                </Col>
                                            )}                                
                                        </Row>
                                    );                                                                                                   
                                })}
                                <Row className="form-group">
                                    <Col>
                                        <Button type="submit" color="primary">
                                            Add Assay
                                        </Button>
                                    </Col>
                                </Row>
                        </LocalForm>    
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Assays;