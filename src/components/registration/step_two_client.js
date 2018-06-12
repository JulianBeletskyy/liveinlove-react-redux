import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'
import { changeStep, sendSignUpOne, sendSignUpTwo } from 'actions'
import { SelectField } from 'components/form/inputs'
import Btn from 'components/form/buttons/button.js'
import BlockSmall from 'components/blocks/block_small.js'
import Validator from 'validate'

class SignUpTwoClient extends Component {
    constructor(props) {
        super(props)
        this.signup = {}
        this.state = {
            languages: [],
            current_lang: '',
            current_level: ''
        }
    }

    getSignUpTwo = (event) => {
        event.preventDefault()
        let error = 1
        
        if (error) {
            const data = {
                education_id: this.signup.education.value,
                living_situation: this.signup.living_situation.value,
                field_of_work: this.signup.field_of_work.value,
                employment_status: this.signup.employment_status.value,
                languages: this.state.languages,
                custom_remember_token: this.props.signup.custom_remember_token
            }
            const step = this.props.signup.data.role === 'client' ? 2 : 5

            store.dispatch(sendSignUpTwo(data, this.props.signup.data.role, step))
        }
    }

    prevStep = () => {
        store.dispatch(changeStep(1))
    }

    skip = () => {
        const step = this.props.signup.data.role === 'client' ? 2 : 5
        store.dispatch(changeStep(step))
    }

    getArray = (type) => {
        let name = ''
        switch(type) {
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
        return temp
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


    render() {
        const { data } = this.props.signup
        return (
            <form onSubmit={this.getSignUpTwo} noValidate={true}>
                <Row>
                    <Col xs={12} className="text-center">
                        <h3 className="title">Work and background</h3>
                    </Col>
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
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.field_of_work = ref }}
                                options={this.getArray('field_of_work')}
                                value={data.field_of_work}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.employment_status = ref }}
                                options={this.getArray('employment_status')}
                                value={data.employment_status}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.living_situation = ref }}
                                options={this.getArray('living_situation')}
                                value={data.living_situation}
                            />
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
                                                options={this.getArray('primary_language')}
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
                            <a href="javascript:;" className="skip-link" onClick={this.skip}>Skip</a>
                        </div>
                    </Col>
                </Row>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        signup: state.signup,
        options: state.options
    }
}

export default connect(
    mapStateToProps
)(SignUpTwoClient);