import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'
import { changeStep, sendSignUpOne} from 'actions'
import SelectField from 'components/form/inputs/select_field.js'
import Btn from 'components/form/buttons/button.js'
import BlockSmall from 'components/blocks/block_small.js'
import Validator from 'validate'

class SignUpOne extends Component {
    constructor(props) {
        super(props)
        this.signup = {
            match: {}
        }
    }

    getSignUpTwo = (event) => {
        event.preventDefault()
        let error = 1
        for (let k in this.signup.match) {
            if (error) {
                error *= Validator.check(this.signup.match[k].value, ['required'], 'Ideal Match')
            }
        }
        error *= Validator.check(this.signup.height.value, ['required'], 'Height')
        error *= Validator.check(this.signup.weight.value, ['required'], 'Weight')
        error *= Validator.check(this.signup.eyes.value, ['required'], 'Eyes Color')
        error *= Validator.check(this.signup.hair_color.value, ['required'], 'Hair Color')
        error *= Validator.check(this.signup.hair_length.value, ['required'], 'Hair Length')
        error *= Validator.check(this.signup.ethnicity.value, ['required'], 'Ethnicity')
        error *= Validator.check(this.signup.marital.value, ['required'], 'Marital')
        error *= Validator.check(this.signup.children.value, ['required'], 'Children')
        error *= Validator.check(this.props.signup.data.female_ethnicity, ['reqiredArray'], 'Ethnicity Match')
        
        if (error) {
            const data = {
                height_id: this.signup.height.value,
                weight_id: this.signup.weight.value,
                eyes_id: this.signup.eyes.value,
                hair_color_id: this.signup.hair_color.value,
                hair_length_id: this.signup.hair_length.value,
                ethnicity_id: this.signup.ethnicity.value,
                marital_status_id: this.signup.marital.value,
                children: this.signup.children.value,
                female_ethnicity: this.props.signup.data.female_ethnicity,
                match: {
                    from: this.signup.match.from.value,
                    to: this.signup.match.to.value
                },
                interest: this.props.signup.data.interest,
                remember_token: this.props.signup.remember_token
            }
            
            store.dispatch(sendSignUpOne(data))
        }
    }

    prevStep = () => {
        store.dispatch(changeStep(0))
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
            default: name = ''; break;
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
        if (type === 'from') {
            for (from; from <= to; from++) {
                temp.push({ 'value': from, 'name': from })
            }
            temp.unshift({ 'value': '', 'name': type })
        } else {
            for (from; from >= to; from--) {
                temp.push({ 'value': from, 'name': from })
            }
            temp.unshift({ 'value': '', 'name': type })
        }
        return temp;
    }

    printEthnicity = (ethnicity, i) => {
        return (<Col sm={2} xs={6} className="text-center ethniticy-block" key={i}><BlockSmall text={ethnicity.value} id={ethnicity.id} type="female_ethnicity"  /></Col>)
    }

    render() {
        const { data, ethnicities } = this.props.signup
        return (
            <form onSubmit={this.getSignUpTwo} noValidate={true}>
                <Row>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.height = ref }}
                                options={this.heightsArray()}
                                value={data.height_id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.weight = ref }}
                                options={this.weightsArray()}
                                value={data.weight_id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.eyes = ref }}
                                options={this.getArray('eyesColor')}
                                value={data.eyes_id}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.hair_color = ref }}
                                options={this.getArray('hairColor')}
                                value={data.hair_color_id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.hair_length = ref }}
                                options={this.getArray('hairLength')}
                                value={data.hair_length_id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.ethnicity = ref }}
                                options={this.getArray('ethnicities')}
                                value={data.ethnicity_id}
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
                                value={data.marital_status_id}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.children = ref }}
                                options={[{ 'value': '', 'name': 'Children' }, { 'value': '1', 'name': 'Yes' }, { 'value': '0', 'name': 'No' }]}
                                value={data.children}
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
                                        value={data.match.from}
                                    />
                                </Col>
                                <Col sm={5}>
                                    <SelectField
                                        componentClass="select"
                                        inputRef={ref => { this.signup.match.to = ref }}
                                        options={this.getNumArray('to', 99, 18)}
                                        value={data.match.to}
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
                            onClick={this.prevStep}
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