import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { changeStep, sendSignUpTwo } from 'actions'
import { FormGroup, Row, Col } from 'react-bootstrap'
import Btn from 'components/form/buttons/button.js'
import BtnFacebook from 'components/form/buttons/button_facebook.js'
import BtnGoogle from 'components/form/buttons/button_google.js'
import BtnUpload from 'components/form/buttons/button_upload.js'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Validator from 'validate'

class SignUpTwo extends Component {
    constructor(props) {
        super(props)
        this.signup = {
            birth: {},
            match: {}
        }
    }

    _crop() {
        this.refs.cropper.getCroppedCanvas().toDataURL()
    }

    getSignUpThree = (event) => {
        event.preventDefault()
    }

    getConfirm = () => {
        let error = 1
        error *= Validator.check(this.props.signup.avatar, ['required'], 'Avatar')
        if (error) {
            let data = {
                width: '200',
                height: '200',
                x: '50',
                y: '50',
                avatar: this.props.signup.file,
                remember_token: this.props.signup.remember_token
            }
            //store.dispatch(sendSignUpTwo(data))
            store.dispatch(changeStep(3))
        }
        
        //let image = await this.refs.crop.cropImage()
    }

    prevStep = () => {
        store.dispatch(changeStep(1))
    }

    render() {
        const content = this.props.signup.avatar ? <Cropper
            ref='cropper'
            src={this.props.signup.avatar}
            style={{ height: '200px', width: '255px', margin: '0 auto' }}
            // Cropper.js options
            aspectRatio={1 / 1}
            guides={false}
            crop={this._crop.bind(this)}
        /> : <img src="/assets/img/default-avatar.jpg" className="default-avatar" />
        return (
            <form onSubmit={this.getSignUpThree} noValidate={true}>
                <Row>
                    <Col sm={5}>
                        <div className="upload-btn-group">
                            <FormGroup>
                                <BtnUpload />
                            </FormGroup>
                            <FormGroup>
                                <BtnFacebook />
                            </FormGroup>
                            <FormGroup>
                                <BtnGoogle />
                            </FormGroup>
                        </div>
                    </Col>
                    <Col sm={2}>
                        <div className="title text-center text-step-two">
                            <h4>How Ladies See You Matters</h4>
                            <span>Use A Clear Photo Be Alone In Your Photo Be In A Well-Lit Place</span>
                        </div>
                    </Col>
                    <Col sm={5}>
                        <FormGroup>
                            { content }
                        </FormGroup>
                        
                    </Col>
                </Row>
                <FormGroup className="text-center">
                    <Btn
                        type="button"
                        text="Prev"
                        orientation="left"
                        onClick={this.prevStep}
                    />
                    <Btn
                        type="button"
                        text="Next"
                        orientation="right"
                        onClick={this.getConfirm}
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
)(SignUpTwo);