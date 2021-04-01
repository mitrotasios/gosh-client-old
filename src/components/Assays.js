import React, { Component } from 'react';
import { Accordion, Card, Modal, Button}  from "react-bootstrap";
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'

const required = value => (value ? undefined : 'Required')

function RenderAssay({ assay }) {
    return (
        <div className="col-4"> 
            <Card id={assay.id}>                            
            <Card.Body>                    
                <Card.Title><h4>{assay.assayName}</h4></Card.Title>
                    <Card.Text>
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
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>        
    )
}

function AssayAccordionCard(props) {
    return(
        props.assays.map(assay => {
            if (Number(assay.addedAt.substring(5,7)) == props.month) {
                return(
                    <RenderAssay assay={assay}/>
                );
            }
            else {
                return(
                    <div></div>
                );
            }
        })  
    );    
}

class Assays extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            reagentInputs: ['r_1'],
            reagentDataInputs: ['rd_1'],
            otherInputs: ['o_1'],

            months: [],
            
            assays: props.testTypes
        }
    }

    componentDidMount() {
        var minMonth = 0;
        var minYear = 0;
        var maxMonth = 12;
        var maxYear = 3000;
        this.state.assays.forEach(assay => {
           minMonth = Math.min(minMonth, Number(assay.addedAt.substring(5, 7)))
           minYear = Math.min(minYear, Number(assay.addedAt.substring(0, 4)))

           maxMonth = Math.max(minMonth, Number(assay.addedAt.substring(5, 7)))
           maxYear = Math.max(maxYear, Number(assay.addedAt.substring(0, 4)))

        });

        minMonth = 7
        maxMonth = 9
        var months = [9,8,7]
        this.setState({
            months: months
        });        
    }

    handleModalShow = () => {
        this.setState({
            isModalOpen: true
        });
    }

    handleModalClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    // onSubmit = (values) => {
    //     this.toggleModal();
    //     alert("Current State is: " + JSON.stringify(values));
    // }

    onSubmit = async values => {
        //await sleep(300)
        window.alert(JSON.stringify(values, 0, 2))
    }

    render() {
        return(            
            <div id="page-wrap" className="container-fluid">
                <div className="container-fluid">
                    <div className="row text-center">
                        <img id="logo" src="/assets/images/GOSH.png" height="40px" width="200px"/>                    
                        <div className="ml-auto">
                            <Button onClick={this.handleModalShow}>Add Assay</Button>
                        </div>                 
                    </div>                
                </div>
                <div className="table-container container-fluid">                    
                    <div className="row">
                        {/*this.state.assays.map(assay => {
                            return <RenderAssay assay={assay}/>
                        })*/}
                        <div className="col-12">
                            <Accordion defaultActiveKey={this.state.months[0] ? (
                                String(this.state.months[0])
                            ):'9'}>
                                {
                                    this.state.months.map(month => {
                                        var mapping = ["JAN", "FEB", "MAR", "APR", "MAI", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEZ"]
                                        return(
                                            <Card>
                                                <Card.Header>
                                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey={String(month)}>
                                                        {String(mapping[month-1])}
                                                    </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey={String(month)}>
                                                        <Card.Body>
                                                            <AssayAccordionCard assays={this.state.assays} month={month}/>
                                                        </Card.Body>                                                    
                                                    </Accordion.Collapse>
                                                </Card.Header>
                                            </Card>
                                        );
                                    })
                                }                                         
                            </Accordion>                        
                        </div>                        
                    </div>
                </div>
                <Modal show={this.state.isModalOpen} onHide={this.handleModalClose} size="lg">
                    <Modal.Header closeButton>Add New Assay Type</Modal.Header>
                    <Modal.Body>
                        <Form 
                            onSubmit={this.onSubmit}
                            mutators={{
                              ...arrayMutators
                            }}
                            render={({
                              handleSubmit,
                              form: {
                                mutators: { push, pop }
                              }, // injected from final-form-arrays above
                              pristine,
                              form,
                              submitting,
                              values
                            }) => {
                                return(
                                    <form onSubmit={handleSubmit}>
                                        <div className="container">
                                                <Field
                                                    name="assayName"
                                                    component="input"
                                                    type="text"
                                                    validate={required}
                                                    >
                                                    {({ input, meta }) => (
                                                        <div className="row">
                                                            <div className="col">
                                                                <label>Reagent Name</label>
                                                            </div>                                                            
                                                            <div className="col">
                                                                <input {...input} placeholder="Reagent Name"/>
                                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Field>
                                            <div className="row">
                                                <div className="col"><h4>Reagents</h4></div>
                                                <div className="col">
                                                    <button type="button" onClick={() => push('reagents', undefined)}>
                                                        Add
                                                    </button>
                                                </div>
                                                <div className="col">
                                                    <button type="button" onClick={() => pop('reagents')}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                            <FieldArray name="reagents">
                                                {({ fields }) =>
                                                    fields.map((name, index) => (
                                                    <div className="row" key={name}>
                                                        {/*<label>Reagent #{index + 1}</label>*/}
                                                        <div className="col">
                                                            <Field
                                                            name={`${name}.label`}
                                                            component="input"
                                                            placeholder="Reagent Name"
                                                            />
                                                        
                                                            <span
                                                            onClick={() => fields.remove(index)}
                                                            style={{ cursor: 'pointer' }}
                                                            >
                                                            ❌
                                                            </span>
                                                        </div>
                                                    </div>
                                                    ))
                                                }
                                            </FieldArray> 
                                        </div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col"><h4>Reagent Data</h4></div>
                                                <div className="col">
                                                    <button type="button" onClick={() => push('reagentData', undefined)}>
                                                        Add
                                                    </button>
                                                </div>
                                                <div className="col">
                                                    <button type="button" onClick={() => pop('reagentData')}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                            <FieldArray name="reagentData">
                                                {({ fields }) =>
                                                    fields.map((name, index) => (
                                                    <div className="row" key={name}>
                                                        {/*<label>{index + 1}</label>*/}
                                                        <div className="col">
                                                            <Field
                                                            name={`${name}.label`}
                                                            component="input"
                                                            placeholder="Input Name"
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <Field
                                                            name={`${name}.type`}
                                                            component="select"
                                                            defaultValue="text"
                                                            >
                                                                <option selected value="text">Text</option>
                                                                <option value="false">Date</option>
                                                            </Field>
                                                        </div>
                                                        <div className="col">
                                                            <Field
                                                            name={`${name}.required`}
                                                            component="select"
                                                            defaultValue="true"
                                                            >
                                                                <option selected value="true">Required</option>
                                                                <option value="false">Not Required</option>
                                                            </Field>
                                                            <span
                                                            onClick={() => fields.remove(index)}
                                                            style={{ cursor: 'pointer' }}
                                                            >
                                                            ❌
                                                            </span>
                                                        </div>
                                                    </div>
                                                    ))
                                                }
                                            </FieldArray>
                                            <div className="row">
                                                <div className="col"><h4>Other Inputs</h4></div>
                                                <div className="col">
                                                    <button type="button" onClick={() => push('other', undefined)}>
                                                        Add
                                                    </button>
                                                </div>
                                                <div className="col">
                                                    <button type="button" onClick={() => pop('other')}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                            <FieldArray name="other">
                                                {({ fields }) =>
                                                    fields.map((name, index) => (
                                                    <div className="row" key={name}>
                                                        {/*<label>{index + 1}</label>*/}
                                                        <div className="col">
                                                            <Field
                                                            name={`${name}.label`}
                                                            component="input"
                                                            placeholder="Input Name"
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <Field
                                                            name={`${name}.type`}
                                                            component="select"
                                                            defaultValue="text"
                                                            >
                                                                <option selected value="text">Text</option>
                                                                <option value="false">Date</option>
                                                            </Field>
                                                        </div>
                                                        <div className="col">
                                                            <Field
                                                            name={`${name}.required`}
                                                            component="select"
                                                            defaultValue="true"
                                                            >
                                                                <option selected value="true">Required</option>
                                                                <option value="false">Not Required</option>
                                                            </Field>
                                                            <span
                                                            onClick={() => fields.remove(index)}
                                                            style={{ cursor: 'pointer' }}
                                                            >
                                                            ❌
                                                            </span>
                                                        </div>
                                                    </div>
                                                    ))
                                                }
                                            </FieldArray>
                                            <div className="container">
                                                <div className="row">
                                                    <button type="submit" disabled={submitting || pristine}>
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )
                            }
                        }/>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default Assays;