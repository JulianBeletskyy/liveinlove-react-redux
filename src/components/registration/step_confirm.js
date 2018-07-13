import React, { Component } from 'react'
import store from 'store'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'
import { resendEmail } from 'actions'

class SignUpConfirm extends Component {
    resend = () => {
        store.dispatch(resendEmail(this.props.signup.send_email))
    }
    
    render() {
        return (
            <Row>
                <Col sm={8} smOffset={2}>
                    <FormGroup className="text-center">
                        <p>Email verification link was sent to
                        &nbsp;
                        <strong>{this.props.signup.send_email}</strong>. 
                            To activate your account please check your email and click on the confirmation link.
                        </p>
                        <p>Didn’t get the link? Click <a href="javascript:;" onClick={this.resend}>here</a> to resend.</p>
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        signup: {
            send_email: state.signup.send_email
        }
    }
}

export default connect(
    mapStateToProps
)(SignUpConfirm);