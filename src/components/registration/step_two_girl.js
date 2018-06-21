import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'
import { changeStep, sendSignUpTwoGirl, sendSignUpTwo, setAlert } from 'actions'
import SelectField from 'components/form/inputs/select_field.js'
import TextField from 'components/form/inputs/text_field.js'
import Btn from 'components/form/buttons/button.js'
import Validator from 'validate'
import Textarea from 'components/form/inputs/textarea.js'
import Options from 'options'
import InputMask from 'react-input-mask'

class SignUpTwoGirl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            languages: [],
            childrens: [],
            current_lang: '',
            current_level: '',
            children: '',
            current_childSex: '',
            current_childBirth: ''
        }

        this.signup = {
            child: {}
        }
    }

    getSignUpThree = (event) => {
        event.preventDefault()
        let error = 1
        if (this.state.children === 1) {
            error *= Validator.check(this.signup.children.value, ['required'], 'About Children')
            if (this.state.childrens.length < 1 && error) {
                store.dispatch(setAlert('About Children is requared', 'error'))
                error = 0
            }
        } else if (this.state.children !== 2) {
            store.dispatch(setAlert('About Children is requared', 'error'))
            error = 0
        }

        error *= Validator.check(this.signup.marital.value, ['required'], 'Marital status')
        error *= Validator.check(this.signup.smoke.value, ['required'], 'Smoking')
        error *= Validator.check(this.signup.drink.value, ['required'], 'Drink')
        error *= Validator.check(this.signup.want_children.value, ['required'], 'Want children')
        error *= Validator.check(this.signup.about_family.value, ['required'], 'About family')
        error *= Validator.check(this.signup.education.value, ['required'], 'Education')
        error *= Validator.check(this.signup.religions.value, ['required'], 'Religions')
        error *= Validator.check(this.signup.field_of_work.value, ['required'], 'Field of work')
        error *= Validator.check(this.signup.employment_status.value, ['required'], 'Employment status')
        error *= Validator.check(this.signup.living_situation.value, ['required'], 'Living Situation')
        error *= Validator.check(this.signup.future_goals.value, ['required'], 'Future goals')
        
        if (! this.state.languages.find(item => item.lang == 1)) {
            store.dispatch(setAlert('English language is requared', 'error'))
            error = 0
        }
        if (! this.state.languages.find(item => item.lang == 2)) {
            store.dispatch(setAlert('Russian language is requared', 'error'))
            error = 0
        }

        if (error) {
            let data = {
                marital_status_id: this.signup.marital.value,
                children: this.state.children === 2 ? this.state.children : this.signup.children.value,
                about_children: this.state.childrens,
                want_children_id: this.signup.want_children.value,
                smoke_id: this.signup.smoke.value,
                drink_id: this.signup.drink.value,
                religion_id: this.signup.religions.value,
                education_id: this.signup.education.value,
                employment_status: this.signup.employment_status.value,
                living_situation: this.signup.living_situation.value,
                about_family: this.signup.about_family.value,
                field_of_work: this.signup.field_of_work.value,
                languages: this.state.languages,
                future_goals: this.signup.future_goals.value,
                custom_remember_token: this.props.signup.custom_remember_token
            }
            store.dispatch(sendSignUpTwo(data, this.props.signup.data.role, 2))
        }
    }

    prevStep = () => {
        store.dispatch(changeStep(1))
    }

    skip = () => {
        store.dispatch(changeStep(2))
    }

    getArray = (type) => {
        let name = ''
        switch(type) {
            case 'marital_statuses': name = 'Marital Status'; break;
            case 'children': name = 'About Children'; break;
            case 'want_children': name = 'Want Children'; break;
            case 'drink': name = 'Do You Drink?'; break;
            case 'smoke': name = 'Do You Smoking?'; break;
            case 'religions': name = 'Religions'; break;
            case 'education': name = 'Education'; break;
            case 'living_situation': name = 'Living Situation'; break;
            case 'employment_status': name = 'Employment Status'; break;
            case 'field_of_work': name = 'Field of work'; break;
            case 'primary_language': name = 'Language'; break;
            case 'language_level': name = 'Level'; break;
            
            default: name = ''; break;
        }
        let temp = [{ 'value': '', 'name': name }]
        
        for (var k in this.props.options[type]) {
            temp.push({
                'value': this.props.options[type][k].id,
                'name': this.props.options[type][k].value
            })
        }

        if (type === 'primary_language') {
            temp = temp.filter(item => [15, 16, 29].indexOf(item.value) === -1)
        }

        if (type === 'religions') {
            temp = temp.filter(item => [1, 2, 8, 10, 11, 16, 17, 19, 20].indexOf(item.value) === -1)
        }

        if (type === 'field_of_work') {
            temp = temp.filter(item => [5, 35, 36].indexOf(item.value) === -1)
        }

        if (type === 'children') {
            temp = temp.filter(item => item.value !== 2)
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

    getLanguageArray = () => {
        let array = this.getArray('primary_language')
        array = array.filter(item => ! this.state.languages.find(row => row.lang == item.value))
        if (this.state.languages.length < 2) {
            array = array.filter(item => item.value == 1 || item.value == 2 || ! item.value)
        }

        return array
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

    addLanguage = val => {
        this.setState({
            languages: [...this.state.languages, val],
            current_lang: '',
            current_level: ''
        })

        this.signup.languages.value = ''
        this.signup.languages_level.value = ''
    }

    removeLanguages = index => e => {
        const languages = this.state.languages.filter((item, i) => i !== index)
        this.setState({languages})
    }

    setChildren = val => {
        this.setState({children: val * 1})
    }

    changeChildSex = val => {
        this.setState({current_childSex: val})
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

            this.signup.childSex.value = ''
        }
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
    

    render() {
    	const { data } = this.props.signup
    	return (
            <form onSubmit={this.getSignUpThree} noValidate={true}>
                <Row>
                    <Col xs={12} className="text-center">
                        <h3 className="title">Lifestyle, education and work</h3>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.marital = ref }}
                                options={this.getArray('marital_statuses')}
                                value={data.marital_status_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.children_yes_no = ref }}
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
                                            inputRef={ref => { this.signup.children = ref }}
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
                                                                inputRef={ref => { this.signup.childSex = ref }}
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
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.want_children = ref }}
                                options={this.getArray('want_children')}
                                value={data.want_children} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.smoke = ref }}
                                options={this.getArray('smoke')}
                                value={data.smoke_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.drink = ref }}
                                options={this.getArray('drink')}
                                value={data.drink_id} />
                        </FormGroup>
                        
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.signup.about_family = ref }}
                                value={data.about_family}
                                placeholder="More about my family" />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.religions = ref }}
                                options={this.getArray('religions')}
                                value={data.religions} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.education = ref }}
                                options={this.getArray('education')}
                                value={data.education_id} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.field_of_work = ref }}
                                options={this.getArray('field_of_work')}
                                value={data.field_of_work} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.employment_status = ref }}
                                options={this.getArray('employment_status')}
                                value={data.employment_status} />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.living_situation = ref }}
                                options={this.getArray('living_situation')}
                                value={data.living_situation} />
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
                                                inputRef={ref => { this.signup.languages = ref }}
                                                options={this.getLanguageArray()}
                                                name="language"
                                                onChange={this.setLanguage}
                                                value={this.state.current_lang} />
                                        </Col>
                                        <Col xs={6}>
                                            <SelectField
                                                componentClass="select"
                                                inputRef={ref => { this.signup.languages_level = ref }}
                                                options={this.getArray('language_level')}
                                                onChange={this.setLanguageLevel}
                                                name="language_level"
                                                value={this.state.current_level} />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            :   ''
                        }
                            
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.signup.future_goals = ref }}
                                value={data.future_goals}
                                placeholder="My future goals" />
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="text-center">
                        <div className="position-relative">
                            <Btn
                                type="button"
                                text="Prev"
                                orientation="left"
                                onClick={this.prevStep} />
                            <Btn
                                type="submit"
                                text="Next"
                                orientation="right" />
                        </div>
                    </Col>
                </Row>
            </form>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        signup: {
            data: state.signup.data,
            custom_remember_token: state.signup.custom_remember_token
        },
        options: state.options
    }
}

export default connect(
    mapStateToProps
)(SignUpTwoGirl);