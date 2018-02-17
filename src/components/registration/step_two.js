import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { changeStep } from 'actions'
import { FormGroup, Row, Col } from 'react-bootstrap'
import Btn from 'components/form/buttons/button.js'
import BtnUpload from 'components/form/buttons/button_upload.js'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; 

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
        //store.dispatch(changeStep(3))
    }

    getConfirm = () => {
        console.log(this.props.signup)
        //let image = await this.refs.crop.cropImage()
    }

    prevStep = () => {
        store.dispatch(changeStep(1))
    }

    render() {
        return (
            <form onSubmit={this.getSignUpThree} noValidate={true}>
                <Row>
                    <Col sm={6}>
                        <BtnUpload />
                    </Col>
                    <Col sm={6}>
                        <div>
                            <Cropper
                                ref='cropper'
                                src={this.props.signup.avatar}
                                style={{ height: '200px', width: '200px' }}
                                // Cropper.js options
                                aspectRatio={1 / 1}
                                guides={false}
                                crop={this._crop.bind(this)} 
                            />
                        </div>
                        
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
                        text="Get Confirm"
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