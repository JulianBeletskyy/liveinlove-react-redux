import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormGroup, Col, Radio, Row } from 'react-bootstrap'
import Validator from 'validate'
import { 
    sendSignUpStart, 
    getHeights, 
    getWeights, 
    getEyesColor, 
    getHairColor, 
    getHairLength, 
    getEthnicities, 
    getMaritalStatus,
    getInterests 
} from 'actions'
import TextField from 'components/form/inputs/text_field.js'
import SelectField from 'components/form/inputs/select_field.js'
import Btn from 'components/form/buttons/button.js'
import CheckboxField from 'components/form/inputs/checkbox_field.js'
import style from './step_zero.css'

class SignUpStart extends Component {
    constructor(props) {
        super(props)
        this.signup = {
            role: 'client',
            birth: {}
        }
        this.role = {}

        const getFunc = {
            heights: () => {store.dispatch(getHeights())},
            weights: () => {store.dispatch(getWeights())},
            eyesColor: () => {store.dispatch(getEyesColor())},
            hairColor: () => {store.dispatch(getHairColor())},
            hairLength: () => {store.dispatch(getHairLength())},
            ethnicities: () => {store.dispatch(getEthnicities())},
            maritalStatus: () => {store.dispatch(getMaritalStatus())},
            interests: () => {store.dispatch(getInterests())}
        }

        for (let k in getFunc) {
            if (! this.props.signup[k].length) {
                getFunc[k]()
            }
        }
    }

    getSignUpOne = (event) => {
        event.preventDefault()
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

    render() {
        const { data } = this.props.signup;
        
        return (
            <form onSubmit={this.getSignUpOne} noValidate={true}>
                <Row>
                    <Col xs={12}>
                        <FormGroup>
                            <div className="text-center title">
                                <span className={style.spanMale}>Male</span>
                                    <Radio 
                                        name="sex" 
                                        value="male"
                                        defaultChecked={data.role != 'girl'}
                                        onChange={this.toggleRole}
                                        inputRef={ref => { this.role.male = ref }}
                                        className={style.gender}
                                        inline
                                    >
                                        <i className="fas fa-mars fa-2x"></i>
                                    </Radio>
                                    
                                
                                <Radio 
                                    name="sex" 
                                    value="female"
                                    defaultChecked={data.role == 'girl'}
                                    onChange={this.toggleRole}
                                    inputRef={ref => { this.role.female = ref }}
                                    className={style.gender}
                                    inline
                                >
                                    <i className="fas fa-venus fa-2x"></i>
                                </Radio>
                                <span className={style.spanFemale}>Female</span>
                            </div>
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <TextField
                                        type="text"
                                        placeholder="First Name"
                                        inputRef={ref => { this.signup.first_name = ref }}
                                        value={data.first_name}
                                        name="First Name"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup sm={6}>
                                    <TextField
                                        type="text"
                                        placeholder="Last Name"
                                        inputRef={ref => { this.signup.last_name = ref }}
                                        name="Last Name"
                                        value={data.last_name}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <TextField
                                type="email"
                                placeholder="Enter email"
                                inputRef={ref => { this.signup.email = ref }}
                                value={data.email}
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                type="password"
                                placeholder="Enter password"
                                inputRef={ref => { this.signup.password = ref }}
                                value={data.password}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <Row>
                                <Col sm={4}>
                                    <SelectField
                                        componentClass="select"
                                        inputRef={ref => { this.signup.birth.month = ref }}
                                        options={this.monthArray()}
                                        value={data.birth.month}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <SelectField
                                        componentClass="select"
                                        inputRef={ref => { this.signup.birth.day = ref }}
                                        options={this.dayArray()}
                                        value={data.birth.day}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <SelectField
                                        componentClass="select"
                                        inputRef={ref => { this.signup.birth.year = ref }}
                                        options={this.yearArray()}
                                        value={data.birth.year}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                type="text"
                                placeholder="Country"
                                inputRef={ref => { this.signup.country = ref }}
                                value={data.country}
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                type="text"
                                placeholder="City"
                                inputRef={ref => { this.signup.city = ref }}
                                value={data.city}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="text-center">
                        <CheckboxField
                            inputRef={ref => { this.signup.terms = ref }}
                            text='By clicking " Join Us for Free" above you agree to "Terms of Use" & "Privacy Policy"'
                            value={data.terms}
                        />
                        <FormGroup>
                            <Btn
                                type="submit"
                                bsStyle="success"
                                text="Join Us for Free"
                                orientation="right"
                            />
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
)(SignUpStart);