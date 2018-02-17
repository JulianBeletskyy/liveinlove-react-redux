import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { changeStep, sendSignUpTwo, toggleModalRegistration } from 'actions'
import { FormGroup, Row, Col } from 'react-bootstrap'
import BtnMain from 'components/form/buttons/main_button.js'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Validator from 'validate'
import TextField from 'components/form/inputs/text_field.js'

class SignUpConfirm extends Component {
    constructor(props) {
        super(props)
        this.signup= {}
    }

    confirm = () => {
        store.dispatch(toggleModalRegistration(false))
    }

    render() {
        return (
            <form onSubmit={this.getSignUpThree} noValidate={true}>
                <Row>
                    <Col sm={8} smOffset={2}>
                        <FormGroup className="text-center">
                            <p>Email verification link was sent to <strong>{this.props.signup.data.email}</strong>. To activate your account please check your email and click on the confirmation link.</p>
                            <p>Didn't receive confirmation an email? Click here to resend.</p>
                            <p>You can update or change your email here:</p>
                        </FormGroup>
                    </Col>
                    <Col sm={6} smOffset={3}>
                        <TextField
                            type="email"
                            placeholder="New Email"
                            name="New Email"
                            inputRef={ref => { this.signup.new_email = ref }}
                        />
                    </Col>
                    
                </Row>
                <FormGroup className="text-center">
                    <BtnMain
                        type="button"
                        text="Confirm"
                        onClick={this.confirm}
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
)(SignUpConfirm);