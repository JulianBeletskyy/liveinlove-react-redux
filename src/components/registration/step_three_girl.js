import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'
import { changeStep, sendSignUpThreeGirl } from 'actions'
import SelectField from 'components/form/inputs/select_field.js'
import TextField from 'components/form/inputs/text_field.js'
import Textarea from 'components/form/inputs/textarea.js'
import Btn from 'components/form/buttons/button.js'
import Validator from 'validate'

class SignUpThreeGirl extends Component {
    constructor(props) {
        super(props)
        this.signup = {
            
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
            console.log(data)
            store.dispatch(sendSignUpThreeGirl(data))
        }
    }

    prevStep = () => {

        store.dispatch(changeStep(2))
    }

    render() {
    	const { data } = this.props.signup
    	return (
            <form onSubmit={this.getSignUpThree} noValidate={true}>
                <Row>
                    <Col xs={6} mdOffset={3}>
                        <FormGroup>
                            <TextField
                                type="text"
                                placeholder="Phone"
                                inputRef={ref => { this.signup.mobile = ref }}
                                value={data.mobile}
                            />
                        </FormGroup>
                        {
                            data.children == 1 ? 
                            (<FormGroup>
                                <Textarea
                                    inputRef={ref => { this.signup.about_children = ref }}
                                    value={data.about_children}
                                    placeholder="About Children"
                                />
                            </FormGroup>)
                            : ''
                        }
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
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(SignUpThreeGirl);