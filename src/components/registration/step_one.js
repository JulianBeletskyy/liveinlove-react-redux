import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl, Button, Row, Col } from 'react-bootstrap'
import Validator from 'validate'
import { changeStep, getHeight } from 'actions'
import TextField from 'components/form/inputs/text_field.js'
import SelectField from 'components/form/inputs/select_field.js'

class SignUpOne extends Component {
    constructor(props) {
        super(props)
        this.signup = {
            match: {}
        }
        store.dispatch(getHeight())
    }

    getSignUpTwo = (event) => {
        event.preventDefault()
        store.dispatch(changeStep(2))
    }

    render() {
        const { step, data } = this.props.signup;
        return (
            <form onSubmit={this.getSignUpTwo} noValidate={true}>
                <Row>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.height = ref }}
                                options={[{ 'value': '', 'name': 'Height' }]}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.weight = ref }}
                                options={[{ 'value': '', 'name': 'Weight' }]}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.eyes = ref }}
                                options={[{'value': '', 'name': 'Eyes Color'}]}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.hair_color = ref }}
                                options={[{ 'value': '', 'name': 'Hair Color' }]}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.hair_length = ref }}
                                options={[{ 'value': '', 'name': 'Hair Length' }]}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.ethnicity = ref }}
                                options={[{ 'value': '', 'name': 'Your Ethnicity' }]}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="text-center">
                        <h3 className="title">Marital & Children Details</h3>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.marital = ref }}
                                options={[{ 'value': '', 'name': 'Marital Status' }]}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.children = ref }}
                                options={[{ 'value': '', 'name': 'Children' }]}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="text-center">
                        <h3 className="title">Seeking A Female</h3>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <Row>
                                <Col sm={6}>
                                    <SelectField
                                        componentClass="select"
                                        inputRef={ref => { this.signup.match.from = ref }}
                                        options={[{ 'value': '', 'name': 'Ideal match' }]}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <SelectField
                                        componentClass="select"
                                        inputRef={ref => { this.signup.match.to = ref }}
                                        options={[{ 'value': '', 'name': 'to' }]}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>

                    </Col>
                    <Col xs={12} className="text-center">
                        <Button type="submit" bsStyle="success">Next</Button>
                    </Col>
                </Row>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(SignUpOne);