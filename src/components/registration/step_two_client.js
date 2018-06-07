import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'
import { changeStep, sendSignUpOne, sendSignUpTwo } from 'actions'
import { SelectField } from 'components/form/inputs'
import Btn from 'components/form/buttons/button.js'
import BlockSmall from 'components/blocks/block_small.js'
import Validator from 'validate'

class SignUpTwoClient extends Component {
    constructor(props) {
        super(props)
        this.signup = {}
    }

    getSignUpTwo = (event) => {
        event.preventDefault()
        let error = 1
        
        if (error) {
            const data = {
                education: this.signup.education.value,
                field_of_work: this.signup.field_of_work.value,
                living_situation: this.signup.living_situation.value,
                employment_status: this.signup.employment_status.value,
                languages: [{}],
                remember_token: this.props.signup.remember_token
            }
            const step = this.props.signup.data.role === 'client' ? 2 : 5

            store.dispatch(sendSignUpTwo(data, step, this.props.signup.data.role))
        }
    }

    prevStep = () => {
        store.dispatch(changeStep(1))
    }

    skip = () => {
        const step = this.props.signup.data.role === 'client' ? 2 : 5
        store.dispatch(changeStep(step))
    }

    getArray = (type) => {
        let name = ''
        switch(type) {
            case 'education': name = 'Education'; break;
            case 'living_situation': name = 'Living Situation'; break;
            case 'field_of_work': name = 'Field of work'; break;
            case 'primary_language': name = 'Language'; break;
            case 'employment_status': name = 'Employment Status'; break;
            
            default: name = ''; break;
        }
        let temp = [{ 'value': '', 'name': name }]
        
        for (var k in this.props.options[type]) {
            temp.push({
                'value': this.props.options[type][k].id,
                'name': this.props.options[type][k].value
            })
        }
        return temp
    }

    render() {
        const { data } = this.props.signup
        return (
            <form onSubmit={this.getSignUpTwo} noValidate={true}>
                <Row>
                    <Col xs={12} className="text-center">
                        <h3 className="title">Work and background</h3>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.education = ref }}
                                options={this.getArray('education')}
                                value={data.education}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.field_of_work = ref }}
                                options={this.getArray('field_of_work')}
                                value={data.field_of_work}
                            />
                        </FormGroup>
                        
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.living_situation = ref }}
                                options={this.getArray('living_situation')}
                                value={data.living_situation}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.primary_language = ref }}
                                options={this.getArray('primary_language')}
                                value={data.primary_language}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.employment_status = ref }}
                                options={this.getArray('employment_status')}
                                value={data.employment_status}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="text-center">
                        <div className="position-relative">
                            <Btn
                                type="button"
                                text="Prev"
                                orientation="left"
                                onClick={this.prevStep} />
                            <Btn
                                type="submit"
                                text="Next"
                                orientation="right" />
                            <a href="javascript:;" className="skip-link" onClick={this.skip}>Skip</a>
                        </div>
                    </Col>
                </Row>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        signup: state.signup,
        options: state.options
    }
}

export default connect(
    mapStateToProps
)(SignUpTwoClient);