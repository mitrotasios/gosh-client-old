import React, { Component } from 'react';
import { Accordion, Card, Modal, Button}  from "react-bootstrap";
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'

const required = value => (value ? undefined : 'Required')

function RenderAssay({ assayType }) {
    return (
        <div className="col-4"> 
            <Card id={assayType._id} key={assayType._id}>                            
                <Card.Title><h4>{assayType.assayName}</h4></Card.Title>
                <Card.Body>                    
                    <div className="container-fluid">
                        <div className="row">                                
                            <h5>Reagents</h5>
                            {assayType.metadata[0].children.map(reagent => {
                                return(
                                    <div key={reagent.key} className="col-4">
                                        {reagent.label}
                                    </div>
                                );
                            })}
                        </div>                         
                        <div className="row">                                
                            <h5>Reagent Data</h5>
                                {assayType.metadata[1].children.map(reagentDataInput => {
                                    return(
                                        <div key={reagentDataInput.key} className="col-4">
                                            {reagentDataInput.label}
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="row">                                
                            <h5>Other</h5>
                            {assayType.metadata[2].children.map(otherInput => {
                                return(
                                    <div key={otherInput.key} className="col-4">
                                        {otherInput.label}
                                    </div>
                                );
                            })}
                        </div> 
                    </div>                          
                </Card.Body>
            </Card>
        </div>
    )
}

function AssayAccordionCard(props) {
    return(
        props.assayTypes.map(assayType => {
            if (Number(assayType.createdAt.substring(5,7)) == props.date.substring(5,7)) {
                return(
                    <RenderAssay key={assayType._id} assayType={assayType}/>
                );
            }
            else {
                return(
                    null
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
            assayTypes: props.testTypes,
            dateSeries: [],
            monthCounter: []
        }
    }

    componentDidMount() {
        var dateSeries = this.state.assayTypes.map(assayType => new Date(assayType.createdAt));
        dateSeries.sort().reverse();
        dateSeries = dateSeries.map(date => date.toISOString().substring(0, 7))
        dateSeries = [...new Set(dateSeries)]
        
        this.setState({
            dateSeries: dateSeries
        });
    }

    addToMonthCounter(date) {
        this.setState(prevState => ({
            monthCounter: [...prevState.monthCounter, date]
        }))
        console.log(this.state.monthCounter);
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

    handleSubmit = async values => {
        var newAssayType = {
            assayName: values.assayName,
            metadata: [
                {
                    key: "reagents",
                    children: []
                },
                {
                    key: "reagentData",
                    children: []
                },
                {
                    key: "other",
                    children: []
                }
            ]
        };

        if (values.reagents) {
            var reagentChildren = values.reagents.filter(inputField => inputField != null);
            reagentChildren = reagentChildren.map(inputField => {
                let key = inputField.label.toLowerCase();
                key = key.replace(" ","_");
                return(
                    {
                        key: key,
                        label: inputField.label,
                        required: true,
                        type: "text"
                    }
                );
            });
            newAssayType.metadata[0].children = reagentChildren;
        }

        if (values.reagentData) {
            var reagentDataChildren = values.reagentData.filter(inputField => inputField.label != null);
            reagentDataChildren = reagentDataChildren.map(inputField => {
                let key = inputField.label.toLowerCase();
                key = key.replace(" ","_");
                return(
                    {
                        key: key,
                        label: inputField.label,
                        required: inputField.required,
                        type: inputField.type
                    }
                );
            });

            newAssayType.metadata[1].children = reagentDataChildren;
        }
        
        if (values.other) {
            var otherDataChildren = values.other.filter(inputField => inputField.label != null);
            var otherDataChildren = otherDataChildren.map(inputField => {
                let key = inputField.label.toLowerCase();
                key = key.replace(" ","_");
                return(
                    {
                        key: key,
                        label: inputField.label,
                        required: inputField.required,
                        type: inputField.type
                    }
                );
            });

            newAssayType.metadata[2].children = otherDataChildren;
        }
        
        this.props.postTestType(newAssayType);

        //window.alert(JSON.stringify(newAssayType, 0, 2));
        
    }

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
                            <Accordion>
                                {this.state.dateSeries.map(date => {
                                        var strDate = date
                                        var mapping = ["JAN", "FEB", "MAR", "APR", "MAI", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEZ"];
                                            
                                        console.log("triggerred")
                                        //alert(this.state.monthCounter)
                                        return(
                                            <Card key={strDate.substring(0, 7)}>
                                                <Card.Header>
                                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey={strDate.substring(5, 7)}>
                                                        {String(mapping[Number(strDate.substring(5, 7))-1]) + ' ' + String(strDate.substring(0, 4))}
                                                    </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey={strDate.substring(5, 7)}>
                                                        <Card.Body>
                                                            <AssayAccordionCard assayTypes={this.state.assayTypes} date={strDate}/>
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
                            onSubmit={this.handleSubmit}
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