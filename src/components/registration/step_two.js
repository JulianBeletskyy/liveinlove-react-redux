import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { changeStep, sendSignUpTwo, saveImage,  saveFile, sendSignUpThree} from 'actions'
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
        this.signup = {}
    }

    getSignUpThree = (event) => {
        event.preventDefault()
    }

    getConfirm = () => {
        let crop
        if (this.refs.cropper) {
            crop = this.refs.cropper.getData()
        }        
        let error = 1

        if (error) {
            let data = {
                width: crop ? crop.width.toFixed() : '',
                height: crop ? crop.height.toFixed() : '',
                x: crop ? crop.x.toFixed() : '',
                y: crop ? crop.y.toFixed() : '',
                avatar: this.props.signup.avatar,
                custom_remember_token: this.props.signup.custom_remember_token
            }

            const step = this.props.signup.data.role === 'client' ? 3 : 6
            if (crop) {
                store.dispatch(sendSignUpThree(data, this.props.signup.data.role, step))
            } else {
                this.skip()
            }
        }
    }

    skip = () => {
        const step = this.props.signup.data.role === 'client' ? 3 : 6
        store.dispatch(changeStep(step))
    }

    facebookSignUp = () => {
        window.FB.login((response) => {
            window.FB.api('/me', {fields: ['first_name, last_name, email, picture.width(2048), gender, locale']}, (response) => {
                fetch(response.picture.data.url)
                .then(res => {
                    const result = res.blob()
                    result.then(responseImg => {
                        let reader = new FileReader()
                        reader.onloadend = () => {
                            store.dispatch(saveImage(reader.result))
                            let file = new File([''], reader.result, {type: 'image'})
                            store.dispatch(saveFile(file))
                        }
                        reader.readAsDataURL(responseImg);
                    })
                })
            });
        }, {scope: 'public_profile, email'});
    }

    googleSignUp = () => {
        window.gapi.load('auth2', () => {
            let auth2 = window.gapi.auth2.init({
                'client_id': '567378795616-ng6a5sqd13t0ii0a9c5jcv8emrv3fc1g.apps.googleusercontent.com',
                'cookiepolicy': 'single_host_origin',
                'scope': 'profile email'
            });
            let element = document.getElementById('google')

            auth2.attachClickHandler(element, {}, (googleUser) => {
                store.dispatch(saveImage(googleUser.w3.Paa))
                let file = new File([''], googleUser.w3.Paa, {type: 'image'})
                store.dispatch(saveFile(file))
                this.setState({social: true})
            })
       });
    }

    prevStep = () => {
        const step = this.props.signup.data.role === 'client' ? 7 : 5
        store.dispatch(changeStep(step))
    }

    onDrop = (picture) => {
        if (picture) {
            store.dispatch(saveFile(picture[0]))
            let reader = new FileReader();
            reader.readAsDataURL(picture[0])
            reader.onload = function() {
                store.dispatch(saveImage(reader.result))
            }
        }
    }

    componentDidMount() {
        this.googleSignUp()
    }

    render() {
        const content = this.props.signup.avatar ? 
        <Cropper
            ref='cropper'
            src={this.props.signup.avatar}
            style={{ height: '200px', width: '100%', margin: '0 auto' }}
            aspectRatio={1 / 1}
            guides={false}
            background={false} /> 
        : <img src="/assets/img/default-avatar.jpg" className="default-avatar" alt="" />

        return (
            <form onSubmit={this.getSignUpThree} noValidate={true}>
                <Row>
                    <Col xs={12} className="text-center">
                        <FormGroup>
                            <h3 className="title">Choose and load primary photo to your profile</h3>
                        </FormGroup>
                    </Col>
                    <Col sm={5}>
                        <div className="upload-btn-group">
                            <FormGroup>
                                <BtnUpload
                                    onChange={this.onDrop}
                                    title="upload photo" />
                            </FormGroup>
                            <FormGroup>
                                <BtnFacebook
                                    title="Upload from Facebook"
                                    onClick={this.facebookSignUp} />
                            </FormGroup>
                            <FormGroup>
                                <BtnGoogle
                                    title="Upload from Google"
                                    onClick={this.googleSignUp} />
                            </FormGroup>
                        </div>
                    </Col>
                    <Col sm={2}>
                        <div className="title text-center text-step-two">
                            <FormGroup className="text-center">
                                <span className="small-italic">
                                    Use A Clear Photo <br />
                                    Be Alone In Your Photo <br />
                                    Be In A Well-Lit Place</span>
                            </FormGroup>
                        </div>
                    </Col>
                    <Col sm={5}>
                        <FormGroup>
                            { content }
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup className="text-center position-relative">
                    <Btn
                        type="button"
                        text="Prev"
                        orientation="left"
                        onClick={this.prevStep} />
                    <Btn
                        type="button"
                        text="Next"
                        orientation="right"
                        onClick={this.getConfirm} />
                        {
                            this.props.signup.data.role === 'client'
                            ?   <a href="javascript:;" className="skip-link" onClick={this.skip}>Skip</a>
                            :   ''
                        }
                </FormGroup>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        signup: state.signup
    }
}

export default connect(
    mapStateToProps
)(SignUpTwo);