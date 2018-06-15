import React, { Component } from 'react'
import store from 'store'
import { updateUserProfile } from 'actions'
import { connect } from 'react-redux'
import { Row, Col, FormGroup } from 'react-bootstrap'
import style from './edit_profile.css'
import { Textarea }  from 'components/form/inputs'
import BtnMain from 'components/form/buttons/main_button.js'
import Validator from 'validate'

class EditProfileOther extends Component {
	constructor(props) {
		super(props)
		this.user = {}
	}

	save = () => {
        let error = 1
        if (this.props.user.data.role === 'girl') {
            error *= Validator.check(this.user.about_me.value, ['required'], 'About Me')
            error *= Validator.check(this.user.like_to_meet.value, ['required'], 'The one I would like to meet')
            error *= Validator.check(this.user.about_family.value, ['required'], 'About my family')
            error *= Validator.check(this.user.leisure_time.value, ['required'], 'More about my Leisure time')
            error *= Validator.check(this.user.future_goals.value, ['required'], 'My future goals')
        }

        if (error) {
            let data = {
                like_to_meet: this.user.about_me.value,
                about_me: this.user.like_to_meet.value
            }
            if (this.props.user.data.role === 'girl') {
                data.about_family = this.user.about_family.value
                data.leisure_time = this.user.leisure_time.value
                data.future_goals = this.user.future_goals.value
            }
            store.dispatch(updateUserProfile(data, this.props.user.token))
        }
	}

	render() {
		const { data } = this.props.user
		return (
		  	<div className={style.wrapper + ' ' + data.role}>
    			<Row>
    				<Col sm={12}>
    					<FormGroup>
                            <Textarea
                                inputRef={ref => { this.user.about_me = ref }}
                                value={data.about_me}
                                placeholder="More about me"
                                label={true} />
                        </FormGroup>
                        {
                            data.role === 'girl'
                            ?   <div>
                                    <FormGroup>
                                        <Textarea
                                            inputRef={ref => { this.user.about_family = ref }}
                                            value={data.about_family}
                                            placeholder="About my family"
                                            label={true} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Textarea
                                            inputRef={ref => { this.user.leisure_time = ref }}
                                            value={data.leisure_time}
                                            placeholder="More about my Leisure time"
                                            label={true} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Textarea
                                            inputRef={ref => { this.user.future_goals = ref }}
                                            value={data.future_goals}
                                            placeholder="My future goals"
                                            label={true} />
                                    </FormGroup>
                                </div>
                            :   ''
                        }
                        <FormGroup>
                            <Textarea
                                inputRef={ref => { this.user.like_to_meet = ref }}
                                value={data.like_to_meet}
                                placeholder="The one I would like to meet"
                                label={true} />
                        </FormGroup>
    				</Col>
				</Row>
				<FormGroup className="text-right">
                    <BtnMain
                        type="button"
                        bsStyle="success"
                        text="Save"
                        onClick = {this.save} />
                </FormGroup>
			</div>
		)
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
)(EditProfileOther);