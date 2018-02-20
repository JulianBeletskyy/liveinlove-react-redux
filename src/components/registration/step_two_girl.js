import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'
import { changeStep, sendSignUpTwoGirl } from 'actions'
import SelectField from 'components/form/inputs/select_field.js'
import TextField from 'components/form/inputs/text_field.js'
import Btn from 'components/form/buttons/button.js'
import Validator from 'validate'

class SignUpTwoGirl extends Component {
    constructor(props) {
        super(props)
        this.signup = {
            
        }
    }

    getSignUpThree = (event) => {
        event.preventDefault()
        let error = 1

        error *= Validator.check(this.signup.education.value, ['required'], 'Education')
        error *= Validator.check(this.signup.profession.value, ['required'], 'Profession')
        error *= Validator.check(this.signup.occupation.value, ['required'], 'Occupation')
        error *= Validator.check(this.signup.smoke.value, ['required'], 'Smoking')
        error *= Validator.check(this.signup.primaryLanguage.value, ['required'], 'Primary Language')
        error *= Validator.check(this.signup.englishLanguage.value, ['required'], 'English Language')
        error *= Validator.check(this.signup.russianLanguage.value, ['required'], 'Russian Language')
        error *= Validator.check(this.signup.drink.value, ['required'], 'Drink')

        if (error) {
            let data = {
                education_id: this.signup.education.value,
                smoke_id: this.signup.smoke.value,
                drink_id: this.signup.drink.value,
                profession: this.signup.profession.value,
                occupation: this.signup.occupation.value,
                primary_language_id: this.signup.primaryLanguage.value,
                english_language_id: this.signup.englishLanguage.value,
                russian_language_id: this.signup.russianLanguage.value,
                remember_token: this.props.signup.remember_token
            }
            console.log(data)
            store.dispatch(sendSignUpTwoGirl(data))
        }
    }

    prevStep = () => {
        store.dispatch(changeStep(1))
    }

    getArray = (type) => {
        let name = ''
        switch(type) {
            case 'education': name = 'Education'; break;
            case 'smoke': name = 'Do You Smoking?'; break;
            case 'primary_language': name = 'Primary Language'; break;
            case 'english_language': name = 'English Language'; type = 'language_level'; break;
            case 'russian_language': name = 'Russian Language'; type = 'language_level'; break;
            case 'drink': name = 'Do You Drink?'; break;
            default: name = ''; break;
        }
        let temp = [{ 'value': '', 'name': name }]
        
        for (var k in this.props.signup[type]) {
            temp.push({
                'value': this.props.signup[type][k].id,
                'name': this.props.signup[type][k].value
            })
        }
        return temp
    }
    

    render() {
    	const { data } = this.props.signup
    	return (
            <form onSubmit={this.getSignUpThree} noValidate={true}>
                <Row>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.education = ref }}
                                options={this.getArray('education')}
                                value={data.education_id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                type="text"
                                placeholder="Profession"
                                inputRef={ref => { this.signup.profession = ref }}
                                value={data.profession}
                                name="First Name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                type="text"
                                placeholder="Occupation"
                                inputRef={ref => { this.signup.occupation = ref }}
                                value={data.occupation}
                                name="First Name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.smoke = ref }}
                                options={this.getArray('smoke')}
                                value={data.smoke_id}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.primaryLanguage = ref }}
                                options={this.getArray('primary_language')}
                                value={data.primary_language_id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.englishLanguage = ref }}
                                options={this.getArray('english_language')}
                                value={data.english_language_id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.russianLanguage = ref }}
                                options={this.getArray('russian_language')}
                                value={data.russian_language_id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.drink = ref }}
                                options={this.getArray('drink')}
                                value={data.drink_id}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="text-center">
                        <Btn
                            type="button"
                            text="Prev"
                            orientation="left"
                            onClick={this.prevStep}
                        />
                        <Btn
                            type="submit"
                            text="Next"
                            orientation="right"
                        />
                    </Col>
                </Row>
            </form>
            )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(SignUpTwoGirl);