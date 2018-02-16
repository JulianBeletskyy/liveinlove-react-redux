import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl, Button, Row, Col } from 'react-bootstrap'
import Validator from 'validate'
import { 
    changeStep, 
    getHeights, 
    getWeights, 
    getEyesColor, 
    getHairColor, 
    getHairLength, 
    getEthnicities, 
    getMaritalStatus
} from 'actions'
import TextField from 'components/form/inputs/text_field.js'
import SelectField from 'components/form/inputs/select_field.js'
import Btn from 'components/form/buttons/button.js'
import BlockSmall from 'components/blocks/block_small.js'

class SignUpOne extends Component {
    constructor(props) {
        super(props)
        this.signup = {
            match: {}
        }
        store.dispatch(getHeights())
        store.dispatch(getWeights())
        store.dispatch(getEyesColor())
        store.dispatch(getHairColor())
        store.dispatch(getHairLength())
        store.dispatch(getEthnicities())
        store.dispatch(getMaritalStatus())
    }

    getSignUpTwo = (event) => {
        event.preventDefault()
        store.dispatch(changeStep(2))
    }

    heightsArray = () => {
        let temp = [{ 'value': '', 'name': 'Height' }]
        for (var k in this.props.signup.heights) {
            temp.push({ 
                'value': this.props.signup.heights[k].id,
                'name': this.props.signup.heights[k].cm + ' cm / (' + this.props.signup.heights[k].inch + ')' })
        }
        return temp
    }

    weightsArray = () => {
        let temp = [{ 'value': '', 'name': 'Weight' }]
        for (var k in this.props.signup.weights) {
            temp.push({
                'value': this.props.signup.weights[k].id,
                'name': this.props.signup.weights[k].kg + ' kg / ' + this.props.signup.weights[k].lbs + ' lbs'
            })
        }
        return temp
    }

    getArray = (type) => {
        let name = ''
        switch(type) {
            case 'ethnicities': name = 'Your Ethnicities'; break;
            case 'hairLength': name = 'Hair Length'; break;
            case 'hairColor': name = 'Hair Color'; break;
            case 'eyesColor': name = 'Eyes Color'; break;
            case 'maritalStatus': name = 'Marital Status'; break;
        }
        let temp = [{ 'value': '', 'name': name }]
        
        for (var k in this.props.signup[type]) {
            temp.push({
                'value': this.props.signup[type][k].id,
                'name': this.props.signup[type][k].value
            })
        }
        return temp
    }

    getNumArray = (type, from, to) => {
        let temp = []
        if (type == 'from') {
            for (from; from <= to; from++) {
                temp.push({ 'value': type, 'name': from })
            }
            temp.unshift({ 'value': type, 'name': type })
        } else {
            for (from; from >= to; from--) {
                temp.push({ 'value': from, 'name': from })
            }
            temp.unshift({ 'value': type, 'name': type })
        }
        return temp;
    }

    printEthnicity = (ethnicity, i) => {
        return (<Col sm={2} xs={6} className="text-center ethniticy-block" key={i}><BlockSmall text={ethnicity.value} id={ethnicity.id} /></Col>)
    }

    render() {
        const { step, data, heights, ethnicities } = this.props.signup
        return (
            <form onSubmit={this.getSignUpTwo} noValidate={true}>
                <Row>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.height = ref }}
                                options={this.heightsArray()}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.weight = ref }}
                                options={this.weightsArray()}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.eyes = ref }}
                                options={this.getArray('eyesColor')}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.hair_color = ref }}
                                options={this.getArray('hairColor')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.hair_length = ref }}
                                options={this.getArray('hairLength')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.ethnicity = ref }}
                                options={this.getArray('ethnicities')}
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
                                options={this.getArray('maritalStatus')}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.children = ref }}
                                options={[{ 'value': '', 'name': 'Children' }, { 'value': '1', 'name': 'Yes' }, { 'value': '0', 'name': 'No' }]}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="text-center">
                        <h3 className="title">Seeking A Female</h3>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <Row>
                                <Col sm={2}>
                                    <span className="title">Ideal match</span>
                                </Col>
                                <Col sm={5}>
                                    <SelectField
                                        componentClass="select"
                                        inputRef={ref => { this.signup.match.from = ref }}
                                        options={this.getNumArray('from', 18, 99)}
                                    />
                                </Col>
                                <Col sm={5}>
                                    <SelectField
                                        componentClass="select"
                                        inputRef={ref => { this.signup.match.to = ref }}
                                        options={this.getNumArray('to', 99, 18)}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <Row>
                            <Col sm={12}>
                            {
                                ethnicities.map((ethnicity, i) => this.printEthnicity(ethnicity, i))
                            }
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} className="text-center">
                        <Btn
                            type="button"
                            text="Prev"
                            orientation="left"
                        />
                        <Btn
                            type="submit"
                            text="Next"
                            orientation="right"
                        />
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