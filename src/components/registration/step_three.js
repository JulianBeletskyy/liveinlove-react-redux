import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { FormGroup, Col, Row } from 'react-bootstrap'
import BtnMain from 'components/form/buttons/main_button.js'
import Btn from 'components/form/buttons/button.js'
import { changeStep, sendSignUpThree } from 'actions'
import BlockSmall from 'components/blocks/block_small.js'
import Textarea from 'components/form/inputs/textarea.js'
import Validator from 'validate'

class SignUpThree extends Component {
    constructor(props) {
        super(props)
        this.signup = {}
        console.log(this.props.signup.data)
    }

    getConfirm = () => {
        let error = 1
        error *= Validator.check(this.signup.message.value, ['required'], 'Message')
        error *= Validator.check(this.props.signup.data.interest, ['reqiredArray'], 'Interests')
        if (error) {
            let data = {
                message: this.signup.message.value,
                interest_id: this.props.signup.data.interest,
                remember_token: this.props.signup.remember_token
            }
            store.dispatch(sendSignUpThree(data))
        }
    }

    prevStep = () => {
        store.dispatch(changeStep(2))
    }

    printInterest = (interest, i) => {
        return (<Col sm={2} xs={6} className="text-center ethniticy-block" key={i}><BlockSmall text={interest.value} id={interest.id} type={"interest"} /></Col>)
    }

    render() {
        const { interests, data } = this.props.signup
        return (
            <form onSubmit={this.confirm} noValidate={true}>
                
                <Row>
                    <Col sm={12}>
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.signup.message = ref }}
                                value={data.message}
                                placeholder="Message"
                            />
                        </FormGroup>
                        <h4 className="title">Interests</h4>
                        {
                            interests.map((interest, i) => this.printInterest(interest, i))
                        }
                    </Col>
                </Row>
                <FormGroup className="text-center">
                    <Btn
                        type="button"
                        text="Prev"
                        orientation="left"
                        onClick={this.prevStep}
                    />
                    <BtnMain
                        type="button"
                        bsStyle="success"
                        text="Finish"
                        onClick = {this.getConfirm}
                    />
                </FormGroup>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(SignUpThree);