import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormGroup, Row, Col } from 'react-bootstrap'
import { changeStep, sendSignUpOne } from 'actions'
import { SelectField } from 'components/form/inputs'
import Btn from 'components/form/buttons/button.js'
import BlockSmall from 'components/blocks/block_small.js'
import Validator from 'validate'

class SignUpOne extends Component {
    constructor(props) {
        super(props)
        this.signup = {
            match: {}
        }
    }

    getSignUpTwo = (event) => {
        event.preventDefault()
        let error = 1

        if (error) {
            const data = {
                height_id: this.signup.height.value,
                weight_id: this.signup.weight.value,
                body_style: this.signup.body_style.value,
                eyes_id: this.signup.eyes.value,
                eye_wear: this.signup.eye_wear.value,
                hair_color_id: this.signup.hair_color.value,
                hair_length_id: this.signup.hair_length.value,
                ethnicity_id: this.signup.ethnicity.value,
                marital_status_id: this.signup.marital.value,
                children: this.signup.children.value,
                smoke_id: this.signup.smoke.value,
                drink_id: this.signup.drink.value,
                want_children_id: this.signup.want_children.value,
                religion_id: this.signup.religion.value,
                match: {
                    from: this.signup.match.from.value,
                    to: this.signup.match.to.value
                },
                custom_remember_token: this.props.signup.custom_remember_token
            }

            const step = this.props.signup.data.role === 'client' ? 7 : 5
            store.dispatch(sendSignUpOne(data, this.props.signup.data.role, step))
        }
    }

    prevStep = () => {
        store.dispatch(changeStep(0))
    }

    skip = () => {
        const step = this.props.signup.data.role === 'client' ? 7 : 5
        store.dispatch(changeStep(step))
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

    getArray = (type) => {
        let name = ''
        switch(type) {
            case 'ethnicities': name = 'Your Ethnicities'; break;
            case 'hair_lengths': name = 'Hair Length'; break;
            case 'hair_colors': name = 'Hair Color'; break;
            case 'eyes': name = 'Eyes Color'; break;
            case 'marital_statuses': name = 'Marital Status'; break;
            case 'religions': name = 'Religions'; break;
            case 'body_style': name = 'Body Style'; break;
            case 'eye_wear': name = 'Eye wear'; break;
            case 'children': name = 'Children'; break;
            case 'smoke': name = 'Smoke'; break;
            case 'drink': name = 'Drink'; break;
            case 'want_children': name = 'Want Children'; break;
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

    render() {
        const { data } = this.props.signup
        const { ethnicities } = this.props.options
        return (
            <form onSubmit={this.getSignUpTwo} noValidate={true}>
                <Row>
                    <Col xs={12} className="text-center">
                        <h3 className="title">Appearance</h3>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.height = ref }}
                                options={this.heightsArray()}
                                value={data.height_id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.weight = ref }}
                                options={this.weightsArray()}
                                value={data.weight_id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.body_style = ref }}
                                options={this.getArray('body_style')}
                                value={data.body_style}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.eyes = ref }}
                                options={this.getArray('eyes')}
                                value={data.eyes_id}
                            />
                        </FormGroup>
                         <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.eye_wear = ref }}
                                options={this.getArray('eye_wear')}
                                value={data.eye_wear}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.hair_color = ref }}
                                options={this.getArray('hair_colors')}
                                value={data.hair_color_id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.hair_length = ref }}
                                options={this.getArray('hair_lengths')}
                                value={data.hair_length_id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.ethnicity = ref }}
                                options={this.getArray('ethnicities')}
                                value={data.ethnicity_id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.religion = ref }}
                                options={this.getArray('religions')}
                                value={data.religion_id}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="text-center">
                        <h3 className="title">Lifestyle</h3>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.marital = ref }}
                                options={this.getArray('marital_statuses')}
                                value={data.marital_status_id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.children = ref }}
                                options={this.getArray('children')}
                                value={data.children}
                            />
                        </FormGroup>

                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.smoke = ref }}
                                options={this.getArray('smoke')}
                                value={data.smoke_id}
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
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <Row>
                                <Col sm={4}>
                                    <span className="title font-bebas">Future Partner<br /> Preferred age</span>
                                </Col>
                                <Col sm={4}>
                                    <SelectField
                                        componentClass="select"
                                        inputRef={ref => { this.signup.match.from = ref }}
                                        options={this.getNumArray('from', 18, 55)}
                                        value={data.match.from}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <SelectField
                                        componentClass="select"
                                        inputRef={ref => { this.signup.match.to = ref }}
                                        options={this.getNumArray('to', 55, 18)}
                                        value={data.match.to}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <FormGroup>
                            <SelectField
                                componentClass="select"
                                inputRef={ref => { this.signup.want_children = ref }}
                                options={this.getArray('want_children')}
                                value={data.want_children_id}
                            />
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
)(SignUpOne);