import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'
import { changeStep, sendSignUpThreeGirl, sendSignUpFour, setAlert } from 'actions'
import TextField from 'components/form/inputs/text_field.js'
import Textarea from 'components/form/inputs/textarea.js'
import Btn from 'components/form/buttons/button.js'
import Validator from 'validate'
import BlockSmall from 'components/blocks/block_small.js'
import { SelectField, CheckboxField } from 'components/form/inputs'
import Options from 'options'

class SignUpThreeGirl extends Component {
    constructor(props) {
        super(props)
        this.signup = {
            match: {}
        }
        Options.get('interests')
    }

    getSignUpThree = (event) => {
        event.preventDefault()
        let error = 1

        for (var k in this.signup.match) {
            if (error) {
                error *= Validator.check(this.signup.match[k].value, ['required'], 'Future Partner')
            }
        }

        error *= Validator.check(this.signup.about_me.value, ['required'], 'About me')
        error *= Validator.check(this.signup.like_to_meet.value, ['required'], 'Like to meet')
        error *= Validator.check(this.signup.leisure_time.value, ['required'], 'About Leisure time')
        error *= Validator.check(this.props.signup.data.interest, ['required'], 'Interests')
        error *= Validator.check(this.signup.terms.checked, ['checked'], 'Terms & Privacy')
        
        if (this.props.signup.data.interest.length < 5) {
            store.dispatch(setAlert('Pick at least 5 interest', 'error'))
            error = 0
        }
        

        if (error) {
            let data = {
                about_me: this.signup.about_me.value,
                like_to_meet: this.signup.like_to_meet.value,
                leisure_time: this.signup.leisure_time.value,
                interest_id: this.props.signup.data.interest,
                match: {
                    from: this.signup.match.from.value,
                    to: this.signup.match.to.value
                },
                custom_remember_token: this.props.signup.custom_remember_token
            }
            store.dispatch(sendSignUpFour(data, 4))
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
        return (<Col lg={3} md={4} sm={6} xs={12} className="text-center ethniticy-block" key={i}><BlockSmall text={interest.value} id={interest.id} data="signup" type={"interest"} /></Col>)
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
                        <div><span className="font-bebas fs-18">Interests <span className="small-italic">(pick at least 5)</span></span></div>
                        { interests.map((interest, i) => this.printInterest(interest, i)) }
                        
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Row>
                                <Col sm={4}>
                                    <div>
                                        <span className="text-uppercase font-bebas">Future Partner Preferred age</span>
                                    </div>
                                </Col>
                                <Col sm={4}>
                                    <SelectField
                                        componentClass="select"
                                        inputRef={ref => { this.signup.match.from = ref }}
                                        options={this.getNumArray('from', 19, 70)}
                                        value={data.match.from}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <SelectField
                                        componentClass="select"
                                        inputRef={ref => { this.signup.match.to = ref }}
                                        options={this.getNumArray('to', 70, 19)}
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
                        <CheckboxField
                            inputRef={ref => { this.signup.terms = ref }}
                            text='By clicking "Join Us for Free" above you agree to "Terms of Use" & "Privacy Policy"'
                            value={false} />
                        <div className="position-relative">
                            <Btn
                                type="submit"
                                text="Add profile to the women's gallery"
                                orientation="right" />
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
            data: state.signup.data,
            custom_remember_token: state.signup.custom_remember_token
        },
        options: {
            interests: state.options.interests
        }
    }
}

export default connect(
    mapStateToProps
)(SignUpThreeGirl);