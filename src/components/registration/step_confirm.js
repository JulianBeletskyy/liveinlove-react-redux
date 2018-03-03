import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'

class SignUpConfirm extends Component {
    
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