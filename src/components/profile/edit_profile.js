import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, FormGroup } from 'react-bootstrap'
import store from 'store/'
import { updateUserProfile, setAlert } from 'actions'
import { SelectField, TextField, Autocomplete }  from 'components/form/inputs'
import BtnMain from 'components/form/buttons/main_button.js'
import BlockSmall from 'components/blocks/block_small.js'
import SmallDivider from 'components/divider/small_divider.js'
import Validator from 'validate'
import style from './edit_profile.css'
import InputMask from 'react-input-mask'


class EditProfile extends Component {
   	constructor(props) {
		super(props)
		this.user = {
			birth: {},
            match: {}
		}
        //console.log(props.user.data.languages)
        console.log(props.user.data.children)
        console.log(props.user.data.about_children)
        this.state = {
            languages: props.user.data.languages,
            current_lang: '',
            current_level: '',
            childrens: props.user.data.about_children,
            children: props.user.data.children,
            current_childSex: '',
            current_childBirth: '',
        }
        this.member = {
            child: {}
          
        }
  	}
     
  	save = () => {
        let error = 1
        
        if (this.state.children === 1) {
            error *= Validator.check(this.member.children.value, ['required'], 'Children')
            if (this.state.childrens.length < 1 && error) {
                store.dispatch(setAlert('About Children is requared', 'error'))
                error = 0
            }
        } else if (this.state.children !== 2) {
            store.dispatch(setAlert('About Children is requared', 'error'))
            error = 0
        }

        for (var k in this.user.birth) {
            if (error) {
                error *= Validator.check(this.user.birth[k].value, ['required'], 'Birthday')
            }
        }

        error *= Validator.check(this.user.first_name.value, ['required', 'string', 'alphabet'], 'First Name')
        error *= Validator.check(this.user.last_name.value, ['required', 'string', 'alphabet'], 'Last Name')
        error *= Validator.check(this.user.country.value, ['required'], 'Country')
        error *= Validator.check(this.user.city.value, ['required'], 'City')

        if (this.props.user.data.role === 'girl') {
            for (var k in this.user.match) {
                if (error) {
                    error *= Validator.check(this.user.match[k].value, ['required'], 'Future Partner')
                }
            }
            error *= Validator.check(this.user.first_name.value, ['required', 'string', 'alphabet'], 'First Name')
            error *= Validator.check(this.user.height.value, ['required'], 'Height')
            error *= Validator.check(this.user.weight.value, ['required'], 'Weight')
            error *= Validator.check(this.user.body_style.value, ['required'], 'Body Style')
            error *= Validator.check(this.user.ethnicity.value, ['required'], 'Ethnicity')
            error *= Validator.check(this.user.hair_color.value, ['required'], 'Hair Color')
            error *= Validator.check(this.user.hair_length.value, ['required'], 'Hair Length')
            error *= Validator.check(this.user.eye_wear.value, ['required'], 'Eye Wear')
            error *= Validator.check(this.user.marital.value, ['required'], 'Marital Status')
            error *= Validator.check(this.user.religion.value, ['required'], 'Religion')
            error *= Validator.check(this.user.smoke.value, ['required'], 'Smoke')
            error *= Validator.check(this.user.drink.value, ['required'], 'Drink')
            //error *= Validator.check(this.user.children.value, ['required'], 'Children')
            error *= Validator.check(this.user.want_children.value, ['required'], 'Want Children')
            error *= Validator.check(this.user.education.value, ['required'], 'Education')
            error *= Validator.check(this.user.living_situation.value, ['required'], 'Living Situation')
            error *= Validator.check(this.user.field_of_work.value, ['required'], 'Field Of Work')
            error *= Validator.check(this.user.employment_status.value, ['required'], 'Employment Status')
            error *= Validator.check(this.props.user.data.interests, ['required'], 'Interests')
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
                height_id: this.user.height.value,
                weight_id: this.user.weight.value,
                body_style: this.user.body_style.value,
                ethnicity_id: this.user.ethnicity.value,
                hair_color_id: this.user.hair_color.value,
                hair_length_id: this.user.hair_length.value,
                eyes_id: this.user.eyes.value,
                eye_wear: this.user.eye_wear.value,
                marital_status_id: this.user.marital.value,
                religion_id: this.user.religion.value,
                smoke_id: this.user.smoke.value,
                drink_id: this.user.drink.value,
                children: this.state.children === 2 ? this.state.children : this.member.children.value,
                about_children: this.state.childrens,
                want_children_id: this.user.want_children.value,
                languages: this.state.languages,
                match: {
                    from: this.user.match.from.value,
                    to: this.user.match.to.value
                },
                education_id: this.user.education.value,
                living_situation: this.user.living_situation.value,
                field_of_work: this.user.field_of_work.value,
                employment_status: this.user.employment_status.value,
                interest_id: this.props.user.data.interests,
            }
            store.dispatch(updateUserProfile(data, this.props.user.token))
        }
  	}

    printInterest = (interest, i) => {
        return (<Col md={4} sm={6} xs={12} className="text-center ethniticy-block" key={i}><BlockSmall text={interest.value} id={interest.id} data="user" type="interests" /></Col>)
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
            case 'body_style': name = 'Body Style'; break;
            case 'smoke': name = 'Smoke'; break;
            case 'drink': name = 'Drink'; break;
            case 'children': name = 'Children'; break;
            case 'eye_wear': name = 'Eye wear'; break;
            case 'religions': name = 'Religions'; break;
            case 'hair_lengths': name = 'Hair Length'; break;
            case 'hair_colors': name = 'Hair Color'; break;
            case 'eyes': name = 'Eyes Color'; break;
            case 'marital_statuses': name = 'Marital Status'; break;
            case 'want_children': name = 'Want Children'; break;
            case 'education': name = 'Education'; break;
            case 'living_situation': name = 'Living Situation'; break;
            case 'field_of_work': name = 'Field of work'; break;
            case 'primary_language': name = 'Language'; break;
            case 'language_level': name = 'Level'; break;
            case 'employment_status': name = 'Employment Status'; break;
            default: name = ''; break;
        }
        let temp = [{ 'value': '', 'name': name }]
        
        for (var k in this.props.options[type]) {
            temp.push({
                'value': this.props.options[type][k].id,
                'name': this.props.options[type][k].value
            })
        }

        if (type === 'children') {
            temp = temp.filter(item => item.value !== 2)
        }

        return temp
    }

    printLanguages = (item, i) => {
        const lang = this.props.options.primary_language.find(row => row.id === item.lang * 1).value
        const level = this.props.options.language_level.find(row => row.id === item.level * 1).value
        return <div key={i} className="position-relative">
                    <div className="row">
                        <div className="col-xs-6">
                            <span className="font-bebas">{lang}</span>
                        </div>
                        <div className="col-xs-6">
                            <span className="font-bebas">{level}</span>
                        </div>
                    </div>
                    <i className="fas fa-times pull-right remove-languages" onClick={this.removeLanguages(i)}></i>
                    <hr style={{marginTop: 5}} />
                </div>
    }

    addLanguage = val => {
        this.setState({
            languages: [...this.state.languages, val],
            current_lang: '',
            current_level: ''
        })

        this.user.languages.value = ''
        this.user.languages_level.value = ''
    }

    removeLanguages = index => e => {
        const languages = this.state.languages.filter((item, i) => i !== index)
        this.setState({languages})
    }

    setLanguage = val => {
        this.setState({current_lang: val})
        if (this.state.current_level) {
            this.addLanguage({lang: val, level: this.state.current_level})
        }
    }

    setLanguageLevel = val => {
        this.setState({current_level: val})
        if (this.state.current_lang) {
            this.addLanguage({lang: this.state.current_lang, level: val})
        }
    }

    setChildren = val => {
        this.setState({children: val * 1})
        console.log(this.state.children)
    }

    changeChildSex = val => {
        this.setState({current_childSex: val})
    }

    removeChildrens = index => e => {
        const childrens = this.state.childrens.filter((item, i) => i !== index)
        this.setState({childrens})
    }

    printChildrens = (item, i) => {
        return  <div key={i} className="position-relative font-bebas">
                    <div className="row">
                        <div className="col-xs-6">
                            <span className="text-capitalize">{item.sex}</span>
                        </div>
                        <div className="col-xs-6">
                            <span>{item.birth}</span>
                        </div>
                    </div>
                    <i className="fas fa-times pull-right remove-languages" onClick={this.removeChildrens(i)}></i>
                    <hr style={{marginTop: 5}} />
                </div>
    }

    changeChildBirth = e => {
        this.setState({current_childBirth: e.target.value})
        const digits = e.target.value.match(/\d/g)
        if (digits && digits.length > 7) {
            this.setState({
                childrens: [...this.state.childrens, {sex: this.state.current_childSex, birth: e.target.value}],
                current_childSex: '',
                current_childBirth: ''
            })

            this.member.childSex.value = ''
        }
    }
    
	render() {
        const { data } = this.props.user
  		const { interests } = this.props.options
        const maxMatch = data.role === 'girl' ? 70 : 55
		return (
            <div className={style.wrapper + ' ' + data.role}>
    			<Row>
    				<Col sm={12}>
                        <FormGroup>
                            <SmallDivider text="Main Information" />
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
                                text="Appearance" />
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
                                            placeholder="Height" />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.weight = ref }}
                                            options={this.weightsArray()}
                                            value={data.weight.id}
                                            label={true}
                                            placeholder="Weight" />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.body_style = ref }}
                                            options={this.getArray('body_style')}
                                            value={data.body_style.id}
                                            label={true}
                                            placeholder="Body style" />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.ethnicity = ref }}
                                            options={this.getArray('ethnicities')}
                                            value={data.ethnicity.id}
                                            label={true}
                                            placeholder="Ethnicity" />
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.hair_color = ref }}
                                            options={this.getArray('hair_colors')}
                                            value={data.hair_color.id}
                                            label={true}
                                            placeholder="Hair Color" />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.hair_length = ref }}
                                            options={this.getArray('hair_lengths')}
                                            value={data.hair_length.id}
                                            label={true}
                                            placeholder="Hair Length" />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.eyes = ref }}
                                            options={this.getArray('eyes')}
                                            value={data.eyes.id}
                                            label={true}
                                            placeholder="Eyes Color" />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.eye_wear = ref }}
                                            options={this.getArray('eye_wear')}
                                            value={data.eye_wear.id}
                                            label={true}
                                            placeholder="Eye Wear" />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
    	            </Col>
                    <Col sm={12}>
                        <FormGroup>
                            <SmallDivider text="Lifestyle" />
                        </FormGroup>
                        <div className={style.blockWrapper}>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.marital = ref }}
                                            options={this.getArray('marital_statuses')}
                                            value={data.marital_status.id}
                                            label={true}
                                            placeholder="Marital Status" />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.religion = ref }}
                                            options={this.getArray('religions')}
                                            value={data.religion.id}
                                            label={true}
                                            placeholder="Religion" />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.smoke = ref }}
                                            options={this.getArray('smoke')}
                                            value={data.smoke.id}
                                            label={true}
                                            placeholder="Smoke" />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.drink = ref }}
                                            options={this.getArray('drink')}
                                            value={data.drink.id}
                                            label={true}
                                            placeholder="Drink" />
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                <FormGroup>
                                <SelectField
                                    label={true}
                                    placeholder="Children" 
                                    componentClass="select"
                                    inputRef={ref => { this.member.children_yes_no = ref }}
                                    options={[{value: '', name: 'Do you have children?'}, {value: 1, name: 'Yes'}, {value: 2, name: 'No'}]}
                                    name="children"
                                    onChange={this.setChildren}
                                    value={this.state.children} />
                                    </FormGroup>
                                    {
                                        this.state.children === 1
                                        ?   <div>
                                                <FormGroup>
                                                    <SelectField  
                                                        componentClass="select"
                                                        inputRef={ref => { this.member.children = ref }}
                                                        options={this.getArray('children')}
                                                        value={data.children} />
                                                </FormGroup>
                                                <FormGroup>
                                                    {this.state.childrens.map((item, i) => this.printChildrens(item, i))}
                                                </FormGroup>
                                                    {
                                                        this.state.childrens.length < 3
                                                        ?   <FormGroup>
                                                                <Row style={{marginBottom: -8}}>
                                                                    <Col sm={6}>
                                                                        <SelectField
                                                                            componentClass="select"
                                                                            inputRef={ref => { this.member.childSex = ref }}
                                                                            onChange={this.changeChildSex}
                                                                            name="children"
                                                                            options={[{value: '', name: 'Sex'}, {value: 'male', name: 'Male'}, {value: 'female', name: 'Female'}]}
                                                                            value={this.state.current_childSex} />
                                                                    </Col>
                                                                    <Col sm={6}>
                                                                        <InputMask 
                                                                            mask="99/99/9999" 
                                                                            disabled={this.state.current_childSex === ''}
                                                                            placeholder="DD/MM/YYYY" 
                                                                            onChange={this.changeChildBirth}
                                                                            value={this.state.current_childBirth}
                                                                            className="form-control masked-input" />
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                        :   ''
                                                    }
                                            </div>
                                        :   ''
                                    }
                                    <FormGroup>
                                        <Row>
                                            <Col sm={6}>
                                                <SelectField
                                                    componentClass="select"
                                                    inputRef={ref => { this.user.match.from = ref }}
                                                    options={this.getNumArray('from', 18, maxMatch)}
                                                    value={data.match.from}
                                                    placeholder="Ideal Match"
                                                    label={true} />
                                            </Col>
                                            <Col sm={6}>
                                                <SelectField
                                                    componentClass="select"
                                                    inputRef={ref => { this.user.match.to = ref }}
                                                    options={this.getNumArray('to', maxMatch, 18)}
                                                    value={data.match.to}
                                                    placeholder={<span>&nbsp;</span>}
                                                    label={true} />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.want_children = ref }}
                                            options={this.getArray('want_children')}
                                            value={data.want_children.id}
                                            placeholder="Want Children"
                                            label={true} />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col sm={12}>
                        <FormGroup>
                            <SmallDivider text="Work and background" />
                        </FormGroup>
                        <div className={style.blockWrapper}>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.living_situation = ref }}
                                            options={this.getArray('living_situation')}
                                            value={data.living_situation.id}
                                            placeholder="Living Situation"
                                            label={true} />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.education = ref }}
                                            options={this.getArray('education')}
                                            value={data.education.id}
                                            placeholder="Education"
                                            label={true} />
                                    </FormGroup>
                                    <FormGroup>
                                        {this.state.languages.map((item, i) => this.printLanguages(item, i))}
                                    </FormGroup>
                                    {
                                        this.state.languages.length < 5
                                        ?   <FormGroup>
                                                <Row>
                                                    <Col xs={6}>
                                                        <SelectField
                                                            componentClass="select"
                                                            inputRef={ref => { this.user.languages = ref }}
                                                            options={this.getArray('primary_language')}
                                                            onChange={this.setLanguage}
                                                            name="language" />
                                                    </Col>
                                                    <Col xs={6}>
                                                        <SelectField
                                                            componentClass="select"
                                                            inputRef={ref => { this.user.languages_level = ref }}
                                                            options={this.getArray('language_level')}
                                                            onChange={this.setLanguageLevel}
                                                            name="language_level" />
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                        :   ''
                                    } 
                                </Col>
                                <Col sm={6}>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.field_of_work = ref }}
                                            options={this.getArray('field_of_work')}
                                            value={data.field_of_work.id}
                                            placeholder="Field of work"
                                            label={true} />
                                    </FormGroup>
                                    <FormGroup>
                                        <SelectField
                                            componentClass="select"
                                            inputRef={ref => { this.user.employment_status = ref }}
                                            options={this.getArray('employment_status')}
                                            value={data.employment_status.id}
                                            placeholder="Employment Status"
                                            label={true} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <SmallDivider text="interests" />
                            </FormGroup>
                            <FormGroup>
                                <Row><Col sm={12}>{interests.map((interest, i) => this.printInterest(interest, i))}</Col></Row>
                            </FormGroup>
                        </div>
                        <FormGroup className="text-right">
                            <BtnMain
                                type="button"
                                bsStyle="success"
                                text="Save"
                                onClick = {this.save} />
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