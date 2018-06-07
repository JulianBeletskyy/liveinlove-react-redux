import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { FormGroup, Col, Row } from 'react-bootstrap'
import BtnMain from 'components/form/buttons/main_button.js'
import Btn from 'components/form/buttons/button.js'
import { changeStep, sendSignUpThree, sendSignUpFour } from 'actions'
import BlockSmall from 'components/blocks/block_small.js'
import Textarea from 'components/form/inputs/textarea.js'
import Validator from 'validate'
import TextField from 'components/form/inputs/text_field.js'

class SignUpThree extends Component {
    constructor(props) {
        super(props)
        this.signup = {}
    }

    getConfirm = () => {
        let error = 1
        if (error) {
            let data = {
                about_me: this.signup.about_me.value,
                like_to_meet: this.signup.like_to_meet.value,
                interest_id: this.props.signup.data.interest,
                mobile: this.props.signup.mobile,
                remember_token: this.props.signup.remember_token
            }
            store.dispatch(sendSignUpFour(data, 4))
        }
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
            <form noValidate={true}>
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
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <TextField
                                        type="text"
                                        placeholder="Phone"
                                        inputRef={ref => { this.signup.mobile = ref }}
                                        value={data.mobile} />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <FormGroup className="text-center">
                    <Btn
                        type="button"
                        text="Prev"
                        orientation="left"
                        onClick={this.prevStep} />
                    <BtnMain
                        type="button"
                        bsStyle="success"
                        text="Finish"
                        onClick = {this.getConfirm} />
                </FormGroup>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        signup: {
            data: state.signup.data,
            remember_token: state.signup.remember_token
        },
        options: {
            interests: state.options.interests
        }
    }
}

export default connect(
    mapStateToProps
)(SignUpThree);