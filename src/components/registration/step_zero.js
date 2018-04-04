import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormGroup, Col, Radio, Row } from 'react-bootstrap'
import Validator from 'validate'
import { sendSignUpStart, setSignUpData, saveImage, saveFile, setEmptyData, toggleRegistration } from 'actions'
import { TextField, SelectField, CheckboxField, Autocomplete } from 'components/form/inputs'
import Btn from 'components/form/buttons/button.js'
//import BtnGoogle from 'components/form/buttons/button_google.js'
//import BtnFacebook from 'components/form/buttons/button_facebook.js'
import style from './step_zero.css'
import Options from 'options'

class SignUpStart extends Component {
    constructor(props) {
        super(props)
        this.signup = {
            role: this.props.signup.data.role,
            birth: {}
        }
        this.role = {}
        store.dispatch(setEmptyData())
    }

    showRegistration = () => {
        if (this.props.signup.showRegistration) {
            this.getSignUpOne()
        } else {
            store.dispatch(toggleRegistration(true))
            if (! this.checkData()) {
                Options.getAll()
            }
        }
    }

    checkData = () => {
        for (let k in this.props.options) {
            if (! this.props.options[k].length) {
                return false
            }
        }
        return true
    }

    getSignUpOne = () => {
        let error = 1
        for (var k in this.signup.birth) {
            if (error) {
                error *= Validator.check(this.signup.birth[k].value, ['required'], 'Birthday')
            }
        }
        
        error *= Validator.check(this.signup.first_name.value, ['required', 'string', 'alphabet'], 'First Name')
        error *= Validator.check(this.signup.last_name.value, ['required', 'string', 'alphabet'], 'Last Name')
        error *= Validator.check(this.signup.email.value, ['required', 'email'], 'Email')
        error *= Validator.check(this.signup.password.value, ['required'], 'Password')
        error *= Validator.check(this.signup.country.value, ['required'], 'Country')
        error *= Validator.check(this.signup.city.value, ['required'], 'City')
        error *= Validator.check(this.signup.terms.checked, ['checked'], 'Terms & Privacy')
        
        if (error) {
            const data = {
                first_name: this.signup.first_name.value,
                last_name: this.signup.last_name.value,
                role: this.signup.role,
                birth: {
                    month: this.signup.birth.month.value,
                    day: this.signup.birth.day.value,
                    year: this.signup.birth.year.value
                },
                country: this.signup.country.value,
                city: this.signup.city.value,
                email: this.signup.email.value,
                password: this.signup.password.value,
                terms: this.signup.terms.checked
            }
            store.dispatch(sendSignUpStart(data))
        }
    }

    facebookSignUp = () => {
        window.FB.login((response) => {
            window.FB.api('/me', {fields: ['first_name, last_name, email, picture.width(2048), gender, locale']}, (response) => {
                this.signup.first_name.value = response.first_name
                this.signup.last_name.value = response.last_name
                this.signup.email.value = response.email
                this.role.female.checked = response.gender === 'female'
                this.role.male.checked = response.gender === 'male'

                store.dispatch(saveImage(response.picture.data.url))
                let file = new File([''], response.picture.data.url, {type: 'image'})
                store.dispatch(saveFile(file))

                const data = {
                    first_name: response.first_name,
                    last_name: response.last_name,
                    email: response.email,
                    role: response.gender === 'female' ? 'girl' : 'client'
                }
                this.signup.role = data.role
                store.dispatch(setSignUpData(data))
            });
        }, {scope: 'public_profile, email'});
    }

    googleSignUp = () => {
        window.gapi.load('auth2', () => {
            let auth2 = window.gapi.auth2.init({
                'client_id': '614936763337-p55fs7mrcgtknam26o26g6766mdjlmgv.apps.googleusercontent.com',
                'cookiepolicy': 'single_host_origin',
                'scope': 'profile email'
            });
        let element = document.getElementById('google')

        auth2.attachClickHandler(element, {}, (googleUser) => {
                
            })
       });
    }

    toggleRole = () => {
        this.signup.role = this.role.female.checked ? 'girl' : 'client'
    }

    monthArray = () => {
        return [
            { 'value': '', 'name': 'Month'},
            { 'value': '1', 'name': 'Jan' }, 
            { 'value': '2', 'name': 'Feb' },
            { 'value': '3', 'name': 'Mar' },
            { 'value': '4', 'name': 'Apr' },
            { 'value': '5', 'name': 'May' },
            { 'value': '6', 'name': 'Jun' },
            { 'value': '7', 'name': 'Jul' },
            { 'value': '8', 'name': 'Aug' },
            { 'value': '9', 'name': 'Sep' },
            { 'value': '10', 'name': 'Oct' },
            { 'value': '11', 'name': 'Nov' },
            { 'value': '12', 'name': 'Dec' }
        ]
    }

    dayArray = () => {
        let temp = [{'value': '', 'name': 'Day'}]
        for (var k = 1; k <= 31; k++) {
            temp.push({'value': k, 'name': k})
        }
        return temp
    }

    yearArray = () => {
        let temp = [{'value': '', 'name': 'Year'}]
        let date = new Date()
        let year = date.getFullYear()
        year -= 18
        let from = year - 72
        for (year; year >= from; year--) {
            temp.push({'value': year, 'name': year})
        }
        return temp
    }

    getArray = (type) => {
        let name = ''
        switch(type) {
            case 'countries': name = 'Choose Country'; break;
            default: name = ''; break;
        }
        let temp = [{ 'value': '', 'name': name }]
        for (var k in this.props.options[type]) {
            temp.push({
                'value': this.props.options[type][k].country_code,
                'name': this.props.options[type][k].country_name
            })
        }
        return temp
    }

    componentDidMount() {
        //this.googleSignUp()
    }

    render() {
        const { role, first_name, last_name, email, password, birth, country, city, terms } = this.props.signup.data
        const { showRegistration } = this.props.signup
        const activeClass = showRegistration ? style.active : ''
        const col = showRegistration ? 6 : 12
        return (
            <form noValidate={true}>
                <Row>
                    <Col xs={12}>
                        <FormGroup>
                            <div className="text-center title">
                                <span className={style.spanMale}>Male</span>
                                <Radio 
                                    name="sex" 
                                    value="male"
                                    defaultChecked={role !== 'girl'}
                                    onChange={this.toggleRole}
                                    inputRef={ref => { this.role.male = ref }}
                                    className={style.gender}
                                    inline >
                                    <i className="fas fa-mars fa-2x"></i>
                                </Radio>
                                <Radio 
                                    name="sex" 
                                    value="female"
                                    defaultChecked={role === 'girl'}
                                    onChange={this.toggleRole}
                                    inputRef={ref => { this.role.female = ref }}
                                    className={style.gender}
                                    inline >
                                    <i className="fas fa-venus fa-2x"></i>
                                </Radio>
                                <span className={style.spanFemale}>Female</span>
                            </div>
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={col}>
                        <Row>
                            <Col sm={col}>
                                <FormGroup>
                                    <TextField
                                        type="text"
                                        placeholder="First Name"
                                        inputRef={ref => { this.signup.first_name = ref }}
                                        value={first_name}
                                        name="First Name"
                                        key="first_name" />
                                </FormGroup>
                            </Col>
                            <Col sm={col}>
                                <FormGroup>
                                    <TextField
                                        type="text"
                                        placeholder="Last Name"
                                        inputRef={ref => { this.signup.last_name = ref }}
                                        name="Last Name"
                                        value={last_name}
                                        key="last_name" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <TextField
                                type="email"
                                placeholder="Enter email"
                                inputRef={ref => { this.signup.email = ref }}
                                value={email} />
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                type="password"
                                placeholder="Enter password"
                                inputRef={ref => { this.signup.password = ref }}
                                value={password} />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className={style.rightPart + ' ' + activeClass}>
                            <FormGroup>
                                <Row>
                                    <Col sm={4}>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.signup.birth.month = ref }}
                                            options={this.monthArray()}
                                            value={birth.month}
                                        />
                                    </Col>
                                    <Col sm={4}>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.signup.birth.day = ref }}
                                            options={this.dayArray()}
                                            value={birth.day}
                                        />
                                    </Col>
                                    <Col sm={4}>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.signup.birth.year = ref }}
                                            options={this.yearArray()}
                                            value={birth.year}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <SelectField
                                    componentClass="select"
                                    inputRef={ref => { this.signup.country = ref }}
                                    options={this.getArray('countries')}
                                    value={country}
                                    name="country"
                                    city={this.signup.city}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Autocomplete 
                                    inputRef={ref => { this.signup.city = ref }}
                                    placeholder="City"
                                    value={city}
                                />
                            </FormGroup>
                        </div>
                    </Col>
                    <Col xs={12} className="text-center">
                        <div className={style.terms + ' ' + activeClass}>
                            <CheckboxField
                                inputRef={ref => { this.signup.terms = ref }}
                                text='By clicking "Join Us for Free" above you agree to "Terms of Use" & "Privacy Policy"'
                                value={terms} />
                        </div>
                        <FormGroup>
                            <Btn
                                type="button"
                                bsStyle="success"
                                text="Join Us for Free"
                                orientation="right"
                                onClick={this.showRegistration}
                            />
                        </FormGroup>
                        <FormGroup>
                        </FormGroup>
                        {/*<FormGroup>
                            <Row>
                                <Col sm={6}>
                                    <BtnFacebook
                                        title="Sign Up with Facebook"
                                        onClick={this.facebookSignUp}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <BtnGoogle
                                        title="Sign Up with Google"
                                    />
                                </Col>
                            </Row>
                        </FormGroup>*/}
                    </Col>
                </Row>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        signup: {
            data: {
                first_name: state.signup.data.first_name,
                last_name: state.signup.data.last_name,
                role: state.signup.data.role,
                email: state.signup.data.email,
                password: state.signup.data.email,
                birth: state.signup.data.birth,
                country: state.signup.data.country,
                city: state.signup.data.city,
                terms: state.signup.data.terms
            },
            showRegistration: state.signup.showRegistration
        },
        options: state.options
    }
}

export default connect(
    mapStateToProps
)(SignUpStart);