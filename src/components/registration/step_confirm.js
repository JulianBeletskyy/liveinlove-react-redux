import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'

class SignUpConfirm extends Component {
    constructor(props) {
        super(props)
        this.signup= {}
    }

    render() {
        return (
            <form onSubmit={this.getSignUpThree} noValidate={true}>
                <Row>
                    <Col sm={8} smOffset={2}>
                        <FormGroup className="text-center">
                            <p>Email verification link was sent to 
                            <strong>{this.props.signup.data.email}</strong>. 
                            To activate your account please check your email and click on the confirmation link.</p>
                        </FormGroup>
                    </Col>
                </Row>
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