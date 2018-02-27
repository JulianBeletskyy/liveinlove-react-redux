import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, FormGroup } from 'react-bootstrap'
import store from 'store/'
import { getOptionsSignUp, updateUserProfile } from 'actions'
import style from './edit_profile.css'
import SelectField from 'components/form/inputs/select_field.js'
import TextField from 'components/form/inputs/text_field.js'
import TextFieldEdit from 'components/form/inputs/text_field_edit.js'
import Textarea from 'components/form/inputs/textarea.js'
import CheckboxField from 'components/form/inputs/checkbox_field.js';
import BtnMain from 'components/form/buttons/main_button.js';
import Autocomplete from 'components/form/inputs/autocomplete.js'
import BlockSmall from 'components/blocks/block_small.js'
import SmallDivider from 'components/divider/small_divider.js'
import Validator from 'validate'

class EditProfile extends Component {
   	constructor(props) {
		super(props)
		this.user = {
			birth: {},
            match: {}
		}

		const getFunc = {
	        height: () => {store.dispatch(getOptionsSignUp('height'))},
	        weight: () => {store.dispatch(getOptionsSignUp('weight'))},
	        eyes: () => {store.dispatch(getOptionsSignUp('eyes'))},
	        hair_colors: () => {store.dispatch(getOptionsSignUp('hair_colors'))},
	        hair_lengths: () => {store.dispatch(getOptionsSignUp('hair_lengths'))},
	        ethnicities: () => {store.dispatch(getOptionsSignUp('ethnicities'))},
	        marital_statuses: () => {store.dispatch(getOptionsSignUp('marital_statuses'))},
	        religions: () => {store.dispatch(getOptionsSignUp('religions'))},
	        want_children: () => {store.dispatch(getOptionsSignUp('want_children'))},
	        countries: () => {store.dispatch(getOptionsSignUp('countries'))},
            interests: () => {store.dispatch(getOptionsSignUp('interests'))},
            education: () => {store.dispatch(getOptionsSignUp('education'))},
            smoke: () => {store.dispatch(getOptionsSignUp('smoke'))},
            primary_language: () => {store.dispatch(getOptionsSignUp('primary_language'))},
            language_level: () => {store.dispatch(getOptionsSignUp('language_level'))},
            drink: () => {store.dispatch(getOptionsSignUp('drink'))}
	    }
        
        for (let k in getFunc) {
            if (! this.props.signup[k].length) {
                getFunc[k]()
            }
        }
  	}

  	save = () => {
        let error = 1

        for (let k in this.user.match) {
            if (error) {
                error *= Validator.check(this.user.match[k].value, ['required'], 'Ideal Match')
            }
        }

        error *= Validator.check(this.user.first_name.value, ['required', 'string', 'alphabet'], 'First Name')
        error *= Validator.check(this.user.last_name.value, ['required', 'string', 'alphabet'], 'Last Name')
        error *= Validator.check(this.user.email.value, ['required', 'email'], 'Email')
        error *= Validator.check(this.user.country.value, ['required'], 'Country')
        error *= Validator.check(this.user.city.value, ['required'], 'City')
        error *= Validator.check(this.user.height.value, ['required'], 'Height')
        error *= Validator.check(this.user.weight.value, ['required'], 'Weight')
        error *= Validator.check(this.user.eyes.value, ['required'], 'Eyes Color')
        error *= Validator.check(this.user.hair_color.value, ['required'], 'Hair Color')
        error *= Validator.check(this.user.hair_length.value, ['required'], 'Hair Length')
        error *= Validator.check(this.user.ethnicity.value, ['required'], 'Ethnicity')
        error *= Validator.check(this.user.marital.value, ['required'], 'Marital')
        error *= Validator.check(this.user.children.value, ['required'], 'Children')
        error *= Validator.check(this.user.message.value, ['required'], 'Message')
        error *= Validator.check(this.props.user.data.interests, ['reqiredArray'], 'Interests')

        if (this.props.user.data.role === 'client') {
            error *= Validator.check(this.props.user.data.female_ethnicity, ['reqiredArray'], 'Ethnicity Match')
        } else {
            error *= Validator.check(this.user.want_children.value, ['required'], 'Want Children')
            error *= Validator.check(this.user.religion.value, ['required'], 'Religions')
            error *= Validator.check(this.user.education.value, ['required'], 'Education')
            error *= Validator.check(this.user.profession.value, ['required'], 'Profession')
            error *= Validator.check(this.user.occupation.value, ['required'], 'Occupation')
            error *= Validator.check(this.user.smoke.value, ['required'], 'Smoking')
            error *= Validator.check(this.user.primaryLanguage.value, ['required'], 'Primary Language')
            error *= Validator.check(this.user.englishLanguage.value, ['required'], 'English Language')
            error *= Validator.check(this.user.russianLanguage.value, ['required'], 'Russian Language')
            error *= Validator.check(this.user.drink.value, ['required'], 'Drink')
            error *= Validator.check(this.user.mobile.value, ['required', 'integer'], 'Phone')
        }

        if (error) {
            const data = {
                first_name: this.user.first_name.value,
                last_name: this.user.last_name.value,
                birth: {
                    month: this.user.birth.month.value,
                    day: this.user.birth.day.value,
                    year: this.user.birth.year.value
                },
                country: this.user.country.value,
                city: this.user.city.value,
                email: this.user.email.value,
                height_id: this.user.height.value,
                weight_id: this.user.weight.value,
                eyes_id: this.user.eyes.value,
                hair_color_id: this.user.hair_color.value,
                hair_length_id: this.user.hair_length.value,
                ethnicity_id: this.user.ethnicity.value,
                match: {
                    from: this.user.match.from.value,
                    to: this.user.match.to.value
                },
                interest_id: this.props.user.data.interests
            }

            if (this.props.user.data.role == 'client') {
                data.female_ethnicity = this.props.user.data.female_ethnicity
            } else {
                data.want_children_id = this.user.want_children ? this.user.want_children.value : ''
                data.education_id = this.user.education.value
                data.smoke_id = this.user.smoke.value
                data.drink_id = this.user.drink.value
                data.profession = this.user.profession.value
                data.occupation = this.user.occupation.value
                data.primary_language_id = this.user.primaryLanguage.value
                data.english_language_id = this.user.englishLanguage.value
                data.russian_language_id = this.user.russianLanguage.value
            }

            store.dispatch(updateUserProfile(data, this.props.user.token))
        }
  	}

    printEthnicity = (ethnicity, i) => {
        return (<Col sm={2} xs={6} className="text-center ethniticy-block" key={i}><BlockSmall text={ethnicity.value} id={ethnicity.id} data="user" type="female_ethnicity"  /></Col>)
    }

    printInterest = (interest, i) => {
        return (<Col sm={2} xs={6} className="text-center ethniticy-block" key={i}><BlockSmall text={interest.value} id={interest.id} data="user" type="interests" /></Col>)
    }

  	getCountryArray = (type) => {
	    let temp = [{ 'value': '', 'name': 'Choose Country' }]
	    for (var k in this.props.signup[type]) {
	        temp.push({
	            'value': this.props.signup[type][k].countryCode,
	            'name': this.props.signup[type][k].countryName
	        })
	    }
	    return temp
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

    heightsArray = () => {
        let temp = [{ 'value': '', 'name': 'Height' }]
        for (var k in this.props.signup.height) {
            temp.push({ 
                'value': this.props.signup.height[k].id,
                'name': this.props.signup.height[k].cm + ' cm / (' + this.props.signup.height[k].inch + ')' })
        }
        return temp
    }

    weightsArray = () => {
        let temp = [{ 'value': '', 'name': 'Weight' }]
        for (var k in this.props.signup.weight) {
            temp.push({
                'value': this.props.signup.weight[k].id,
                'name': this.props.signup.weight[k].kg + ' kg / ' + this.props.signup.weight[k].lbs + ' lbs'
            })
        }
        return temp
    }

    getNumArray = (type, from, to) => {
        let temp = []
        if (type === 'from') {
            for (from; from <= to; from++) {
                temp.push({ 'value': from, 'name': from })
            }
            temp.unshift({ 'value': '', 'name': type })
        } else {
            for (from; from >= to; from--) {
                temp.push({ 'value': from, 'name': from })
            }
            temp.unshift({ 'value': '', 'name': type })
        }
        return temp;
    }

    getArray = (type) => {
        let name = ''
        switch(type) {
            case 'ethnicities': name = 'Your Ethnicities'; break;
            case 'hair_lengths': name = 'Hair Length'; break;
            case 'hair_colors': name = 'Hair Color'; break;
            case 'eyes': name = 'Eyes Color'; break;
            case 'marital_statuses': name = 'Marital Status'; break;
            case 'religions': name = 'Religions'; break;
            case 'want_children': name = 'Do You Want Children?'; break;
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
        const { data } = this.props.user
  		const { ethnicities, interests } = this.props.signup
        let classRole = data.role == 'client' ? 'client' : 'girl'
		return (
            <div className={style.wrapper + ' ' + classRole}>
    			<Row>
    				<Col sm={12}>
                        <FormGroup>
                            <SmallDivider
                                text="Main Information"
                            />
                        </FormGroup>
                        <div className={style.blockWrapper}>
                            <Row>
                                <Col sm={6}>
                					<FormGroup>
                		                <TextField
                		                    type="text"
                		                    placeholder="First Name"
                		                    inputRef={ref => { this.user.first_name = ref }}
                		                    value={data.first_name}
                		                    name="First Name"
                		                    key="first_name"
                                            label={true}
                		                />
                		            </FormGroup>
                		            <FormGroup>
                		                <TextField
                		                    type="text"
                		                    placeholder="Last Name"
                		                    inputRef={ref => { this.user.last_name = ref }}
                		                    name="Last Name"
                		                    value={data.last_name}
                		                    key="last_name"
                                            label={true}
                		                />
                		            </FormGroup>
                		            <FormGroup>
                		                <TextField
                		                    type="email"
                		                    placeholder="Enter email"
                		                    inputRef={ref => { this.user.email = ref }}
                		                    value={data.email}
                                            label={true}
                		                />
                		            </FormGroup>
                                    {
                                        data.role === 'girl'
                                        ? <FormGroup>
                                            <TextField
                                                type="text"
                                                placeholder="Phone"
                                                inputRef={ref => { this.user.mobile = ref }}
                                                value={data.mobile}
                                                label={true}
                                            />
                                        </FormGroup>
                                        : ''
                                    }
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Row>
                                            <Col sm={4}>
                                                <SelectField
                                                    componentClass="select"
                                                    inputRef={ref => { this.user.birth.month = ref }}
                                                    options={this.monthArray()}
                                                    value={data.birthday.month}
                                                    label={true}
                                                    placeholder="Birthday"
                                                />
                                            </Col>
                                            <Col sm={4}>
                                                <SelectField
                                                    componentClass="select"
                                                    inputRef={ref => { this.user.birth.day = ref }}
                                                    options={this.dayArray()}
                                                    value={data.birthday.day}
                                                    label={true}
                                                    placeholder={<span>&nbsp;</span>}
                                                />
                                            </Col>
                                            <Col sm={4}>
                                                <SelectField
                                                    componentClass="select"
                                                    inputRef={ref => { this.user.birth.year = ref }}
                                                    options={this.yearArray()}
                                                    value={data.birthday.year}
                                                    label={true}
                                                    placeholder={<span>&nbsp;</span>}
                                                />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.country = ref }}
                                            options={this.getCountryArray('countries')}
                                            value={data.country}
                                            name="country"
                                            label={true}
                                            placeholder="Country"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Autocomplete 
                                            inputRef={ref => { this.user.city = ref }}
                                            placeholder="City"
                                            value={data.city}
                                            label={true}
                                            placeholder="City"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
    	            </Col>
    	            <Col sm={12}>
                        <FormGroup>
                            <SmallDivider
                                text="About Me"
                            />
                        </FormGroup>
                        <div className={style.blockWrapper}>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.height = ref }}
                                            options={this.heightsArray()}
                                            value={data.height.id}
                                            label={true}
                                            placeholder="Height"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.weight = ref }}
                                            options={this.weightsArray()}
                                            value={data.weight.id}
                                            label={true}
                                            placeholder="Weight"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.eyes = ref }}
                                            options={this.getArray('eyes')}
                                            value={data.eyes.id}
                                            label={true}
                                            placeholder="Eyes Color"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.hair_color = ref }}
                                            options={this.getArray('hair_colors')}
                                            value={data.hair_color.id}
                                            label={true}
                                            placeholder="Hair Color"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.hair_length = ref }}
                                            options={this.getArray('hair_lengths')}
                                            value={data.hair_length.id}
                                            label={true}
                                            placeholder="Hair Length"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.ethnicity = ref }}
                                            options={this.getArray('ethnicities')}
                                            value={data.ethnicity.id}
                                            label={true}
                                            placeholder="Ethnicity"
                                        />
                                    </FormGroup>
                                    {
                                        <FormGroup>
                                            <SelectField
                                                componentClass="select"
                                                inputRef={ref => { this.user.religion = ref }}
                                                options={this.getArray('religions')}
                                                value={data.religion.id}
                                                label={true}
                                                placeholder="Religion"
                                            />
                                        </FormGroup>
                                    }
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.marital = ref }}
                                            options={this.getArray('marital_statuses')}
                                            value={data.marital_status.id}
                                            label={true}
                                            placeholder="Marital Status"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.children = ref }}
                                            options={[{ 'value': '', 'name': 'Children' }, { 'value': '1', 'name': 'Yes' }, { 'value': '0', 'name': 'No' }]}
                                            value={data.children.id}
                                            label={true}
                                            placeholder="Do you have children?"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
    	            </Col>
                    <Col sm={12}>
                        <FormGroup>
                            <SmallDivider
                                text="I am looking for a woman"
                            />
                        </FormGroup>
                        <div className={style.blockWrapper}>
                            <FormGroup>
                                <Row>
                                    <Col sm={2}>
                                        <span className="text-uppercase font-bebas">Ideal match</span>
                                    </Col>
                                    <Col sm={5}>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.match.from = ref }}
                                            options={this.getNumArray('from', 18, 99)}
                                            value={data.match.from}
                                            label={true}
                                        />
                                    </Col>
                                    <Col sm={5}>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.match.to = ref }}
                                            options={this.getNumArray('to', 99, 18)}
                                            value={data.match.to}
                                            label={true}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                {
                                    data.role === 'client'
                                    ? <Row><Col sm={12}>{ethnicities.map((ethnicity, i) => this.printEthnicity(ethnicity, i))}</Col></Row>
                                    : <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.want_children = ref }}
                                            options={this.getArray('want_children')}
                                            value={data.want_children.id}
                                            label={true}
                                            placeholder="Do you want children?"
                                        />
                                }
                            </FormGroup>
                        </div>
                    </Col>
                    <Col sm={12}>
                        <FormGroup>
                            <SmallDivider
                                text="Other Information"
                            />
                        </FormGroup>
                        <div className={style.blockWrapper}>
                            <FormGroup>
                                <Textarea
                                    inputRef={ref => { this.user.message = ref }}
                                    value={data.message}
                                    placeholder="Message"
                                    label={true}
                                    placeholder="Message"
                                />
                            </FormGroup>
                            <FormGroup>
                                <span className="font-bebas">Interests</span>
                                <Row><Col sm={12}>{interests.map((interest, i) => this.printInterest(interest, i))}</Col></Row>
                            </FormGroup>
                            { 
                                data.role === 'girl'
                                ? (<Row>
                                        <Col sm={6}>
                                            <FormGroup>
                                                <SelectField
                                                    componentClass="select"
                                                    inputRef={ref => { this.user.education = ref }}
                                                    options={this.getArray('education')}
                                                    value={data.education.id}
                                                    label={true}
                                                    placeholder="Education"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <TextField
                                                    type="text"
                                                    placeholder="Profession"
                                                    inputRef={ref => { this.user.profession = ref }}
                                                    value={data.profession}
                                                    name="First Name"
                                                    label={true}
                                                    placeholder="Profession"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <TextField
                                                    type="text"
                                                    placeholder="Occupation"
                                                    inputRef={ref => { this.user.occupation = ref }}
                                                    value={data.occupation}
                                                    name="First Name"
                                                    label={true}
                                                    placeholder="Occupation"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <SelectField
                                                    componentClass="select"
                                                    inputRef={ref => { this.user.smoke = ref }}
                                                    options={this.getArray('smoke')}
                                                    value={data.smoke.id}
                                                    label={true}
                                                    placeholder="Smoke"

                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm={6}>
                                            <FormGroup>
                                                <SelectField
                                                    componentClass="select"
                                                    inputRef={ref => { this.user.primaryLanguage = ref }}
                                                    options={this.getArray('primary_language')}
                                                    value={data.primary_language.id}
                                                    label={true}
                                                    placeholder="Primary Language"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <SelectField
                                                    componentClass="select"
                                                    inputRef={ref => { this.user.englishLanguage = ref }}
                                                    options={this.getArray('english_language')}
                                                    value={data.english_language.id}
                                                    label={true}
                                                    placeholder="English Language"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <SelectField
                                                    componentClass="select"
                                                    inputRef={ref => { this.user.russianLanguage = ref }}
                                                    options={this.getArray('russian_language')}
                                                    value={data.russian_language.id}
                                                    label={true}
                                                    placeholder="Russian Language"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <SelectField
                                                    componentClass="select"
                                                    inputRef={ref => { this.user.drink = ref }}
                                                    options={this.getArray('drink')}
                                                    value={data.drink.id}
                                                    label={true}
                                                    placeholder="Drink"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>)
                                : ''
                            }
                        </div>
                        <FormGroup>
                            <BtnMain
                                type="button"
                                bsStyle="success"
                                text="Save"
                                onClick = {this.save}
                            />
                        </FormGroup>
                    </Col>
    			</Row>
            </div>
		);
  	}
}

const mapStateToProps = (state) => {
	return state
}

export default connect(
	mapStateToProps
)(EditProfile);