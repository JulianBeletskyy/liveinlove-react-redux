import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'
import { changeStep, sendSignUpThreeGirl } from 'actions'
import TextField from 'components/form/inputs/text_field.js'
import Textarea from 'components/form/inputs/textarea.js'
import Btn from 'components/form/buttons/button.js'
import Validator from 'validate'
import BlockSmall from 'components/blocks/block_small.js'
import { SelectField } from 'components/form/inputs'

class SignUpThreeGirl extends Component {
    constructor(props) {
        super(props)
        this.signup = {
            match: {}
        }
    }

    getSignUpThree = (event) => {
        event.preventDefault()
        let error = 1

        error *= Validator.check(this.signup.mobile.value, ['required', 'integer'], 'Phone')

        if (error) {
            let data = {
                mobile: this.signup.mobile.value,
                about_children: this.signup.about_children ? this.signup.about_children.value : '',
                remember_token: this.props.signup.remember_token
            }

            store.dispatch(sendSignUpThreeGirl(data))
        }
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

    skip = () => {
        store.dispatch(changeStep(3))
    }

    prevStep = () => {
        store.dispatch(changeStep(2))
    }

    printInterest = (interest, i) => {
        return (<Col sm={3} xs={6} className="text-center ethniticy-block" key={i}><BlockSmall text={interest.value} id={interest.id} data="signup" type={"interest"} /></Col>)
    }

    render() {
    	const { data } = this.props.signup
        const { interests } = this.props.options
    	return (
            <form onSubmit={this.getSignUpThree} noValidate={true}>
                <Row>
                    <Col sm={12}>
                         <FormGroup>
                            <Textarea
                                inputRef={ref => { this.signup.about_me = ref }}
                                value={data.about_me}
                                placeholder="More about me"
                                label={true} />
                        </FormGroup>
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.signup.like_to_meet = ref }}
                                value={data.like_to_meet}
                                placeholder="The one I would like to meet"
                                label={true} />
                        </FormGroup>
                        <h4 className="font-bebas">Interests</h4>
                        { interests.map((interest, i) => this.printInterest(interest, i)) }
                        <FormGroup>
                            <Row>
                                <Col sm={4}>
                                    <div>
                                        <span className="title">Future Partner Preferred age</span>
                                    </div>
                                </Col>
                                <Col sm={4}>
                                    <SelectField
                                        componentClass="select"
                                        inputRef={ref => { this.signup.match.from = ref }}
                                        options={this.getNumArray('from', 18, 99)}
                                        value={data.match.from}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <SelectField
                                        componentClass="select"
                                        inputRef={ref => { this.signup.match.to = ref }}
                                        options={this.getNumArray('to', 99, 18)}
                                        value={data.match.to}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.signup.leisure_time = ref }}
                                value={data.leisure_time}
                                placeholder="More about my Leisure time"
                                label={true} />
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
                                text="Finish"
                                orientation="right" />
                            <a href="javascript:;" className="skip-link" onClick={this.skip}>Skip</a>
                        </div>

                    </Col>
                </Row>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        signup: {
            data: {
                children: state.signup.data.children,
                mobile: state.signup.data.mobile,
                about_children: state.signup.data.about_children,
                match: state.signup.data.match,
            },
            remember_token: state.signup.remember_token
        },
        options: {
            interests: state.options.interests
        }
    }
}

export default connect(
    mapStateToProps
)(SignUpThreeGirl);