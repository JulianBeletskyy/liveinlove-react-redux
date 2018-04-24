import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, FormGroup } from 'react-bootstrap'
import store from 'store/'
import { updateUserProfile } from 'actions'
import { SelectField, TextField, Textarea, Autocomplete }  from 'components/form/inputs'
import BtnMain from 'components/form/buttons/main_button.js'
import BlockSmall from 'components/blocks/block_small.js'
import SmallDivider from 'components/divider/small_divider.js'
import Validator from 'validate'
import style from './edit_profile.css'

class EditProfile extends Component {
   	constructor(props) {
		super(props)
		this.user = {
			birth: {},
            match: {}
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
        //error *= Validator.check(this.user.ethnicity.value, ['required'], 'Ethnicity')
        error *= Validator.check(this.user.marital.value, ['required'], 'Marital')
        error *= Validator.check(this.user.children.value, ['required'], 'Children')
        error *= Validator.check(this.user.message.value, ['required'], 'Message')
        error *= Validator.check(this.props.user.data.interests, ['reqiredArray'], 'Interests')
        error *= Validator.check(this.props.user.data.find_ethnicity, ['reqiredArray'], 'Ethnicity Match')

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
                interest_id: this.props.user.data.interests,
                find_ethnicity: this.props.user.data.find_ethnicity
            }

            store.dispatch(updateUserProfile(data, this.props.user.token))
        }
  	}

    printEthnicity = (ethnicity, i) => {
        return (<Col sm={2} xs={6} className="text-center ethniticy-block" key={i}><BlockSmall text={ethnicity.value} id={ethnicity.id} data="user" type="find_ethnicity"  /></Col>)
    }

    printInterest = (interest, i) => {
        return (<Col sm={2} xs={6} className="text-center ethniticy-block" key={i}><BlockSmall text={interest.value} id={interest.id} data="user" type="interests" /></Col>)
    }

  	getCountryArray = (type) => {
	    let temp = [{ 'value': '', 'name': 'Choose Country' }]
	    for (var k in this.props.options[type]) {
	        temp.push({
	            'value': this.props.options[type][k].country_code,
	            'name': this.props.options[type][k].country_name
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
        for (var k in this.props.options.height) {
            temp.push({ 
                'value': this.props.options.height[k].id,
                'name': this.props.options.height[k].cm + ' cm / (' + this.props.options.height[k].inch + ')' })
        }
        return temp
    }

    weightsArray = () => {
        let temp = [{ 'value': '', 'name': 'Weight' }]
        for (var k in this.props.options.weight) {
            temp.push({
                'value': this.props.options.weight[k].id,
                'name': this.props.options.weight[k].kg + ' kg / ' + this.props.options.weight[k].lbs + ' lbs'
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
            default: name = ''; break;
        }
        let temp = [{ 'value': '', 'name': name }]
        
        for (var k in this.props.options[type]) {
            temp.push({
                'value': this.props.options[type][k].id,
                'name': this.props.options[type][k].value
            })
        }
        return temp
    }
  
	render() {
        const { data } = this.props.user
  		const { ethnicities, interests } = this.props.options
		return (
            <div className={style.wrapper + ' client'}>
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
                                            label={true} />
                		            </FormGroup>
                		            <FormGroup>
                		                <TextField
                		                    type="text"
                		                    placeholder="Last Name"
                		                    inputRef={ref => { this.user.last_name = ref }}
                		                    name="Last Name"
                		                    value={data.last_name}
                		                    key="last_name"
                                            lastname={true}
                                            label={true} />
                		            </FormGroup>
                		            <FormGroup>
                		                <TextField
                		                    type="email"
                		                    placeholder="Enter email"
                		                    inputRef={ref => { this.user.email = ref }}
                		                    value={data.email}
                                            label={true} />
                		            </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <Row>
                                            <Col sm={4}>
                                                <SelectField
                                                    componentClass="select"
                                                    inputRef={ref => { this.user.birth.month = ref }}
                                                    options={this.monthArray()}
                                                    value={data.birth.month}
                                                    label={true}
                                                    placeholder="Birthday"
                                                />
                                            </Col>
                                            <Col sm={4}>
                                                <SelectField
                                                    componentClass="select"
                                                    inputRef={ref => { this.user.birth.day = ref }}
                                                    options={this.dayArray()}
                                                    value={data.birth.day}
                                                    label={true}
                                                    placeholder={<span>&nbsp;</span>}
                                                />
                                            </Col>
                                            <Col sm={4}>
                                                <SelectField
                                                    componentClass="select"
                                                    inputRef={ref => { this.user.birth.year = ref }}
                                                    options={this.yearArray()}
                                                    value={data.birth.year}
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
                                            value={data.country.country_code}
                                            name="country"
                                            label={true}
                                            placeholder="Country"
                                            city={this.user.city}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Autocomplete 
                                            inputRef={ref => { this.user.city = ref }}
                                            placeholder="City"
                                            value={data.city}
                                            label={true}
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
                                <Row><Col sm={12}>{ethnicities.map((ethnicity, i) => this.printEthnicity(ethnicity, i))}</Col></Row>
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
                                />
                            </FormGroup>
                            <FormGroup>
                                <span className="font-bebas">Interests</span>
                                <Row><Col sm={12}>{interests.map((interest, i) => this.printInterest(interest, i))}</Col></Row>
                            </FormGroup>
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
	return {
        user: {
            data: state.user.data,
            token: state.user.token
        },
        options: state.options
    }
}

export default connect(
	mapStateToProps
)(EditProfile);