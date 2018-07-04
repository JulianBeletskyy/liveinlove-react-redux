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
import Options from 'options'

class SignUpThree extends Component {
    constructor(props) {
        super(props)
        this.signup = {}
        Options.get('interests')
    }

    getConfirm = () => {
        let error = 1
        if (error) {
            let data = {
                about_me: this.signup.about_me.value,
                like_to_meet: this.signup.like_to_meet.value,
                interest_id: this.props.signup.data.interest,
                mobile: this.signup.mobile.value,
                custom_remember_token: this.props.signup.custom_remember_token
            }
            store.dispatch(sendSignUpFour(data, 4))
        }
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
                        <div style={{fontSize: 12, opacity: 0.8}}>* Please do not post any contact details in your profile. We review each profile manually.</div>
                    </Col>
                    <Col sm={6}>
                        <FormGroup className="pt-15">
                            <TextField
                                type="text"
                                placeholder="Phone"
                                inputRef={ref => { this.signup.mobile = ref }}
                                description="* Your phone number is visible only for administrator."
                                value={data.mobile} />
                        </FormGroup>
                    </Col>
                    <Col sm={12}>
                        <div className="pt-15"><span className="font-bebas fs-18">Interests <span className="small-italic">(pick at least 5)</span></span></div>
                        <div className="form-group">
                            { interests.map((interest, i) => this.printInterest(interest, i)) }
                        </div>
                    </Col>
                    
                </Row>
                <FormGroup className="text-center pt-15">
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
            custom_remember_token: state.signup.custom_remember_token
        },
        options: {
            interests: state.options.interests
        }
    }
}

export default connect(
    mapStateToProps
)(SignUpThree);