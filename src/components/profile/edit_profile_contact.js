import React, { Component } from 'react'
import store from 'store'
import { connect } from 'react-redux'
import { Row, Col, FormGroup } from 'react-bootstrap'
import { TextField }  from 'components/form/inputs'
import { updateUserProfile } from 'actions'
import style from './edit_profile.css'
import BtnMain from 'components/form/buttons/main_button.js'
import Validator from 'validate'

class EditProfileContact extends Component {
	constructor(props) {
		super(props)
		this.user = {}
	}

	save = () => {
		let error = 1
        error *= Validator.check(this.user.email.value, ['required', 'email'], 'Email')

        if (this.props.user.data.role === 'girl') {
            error *= Validator.check(this.user.mobile.value, ['required'], 'Phone')
        }
		
		if (error) {
			let data = {
				email: this.user.email.value,
				mobile: this.user.mobile.value
			}

            if (this.props.user.data.role === 'girl') {
                data.facebook = this.user.facebook.value
                data.vk = this.user.vk.value
                data.other_social = this.user.other_social.value
            }
			store.dispatch(updateUserProfile(data, this.props.user.token))
		}
	}

	render() {
		const { data } = this.props.user
		return (
		  	<div className={style.wrapper + ' client'}>
    			<Row>
    				<Col sm={6}>
    					<FormGroup>
    		                <TextField
    		                    type="email"
    		                    placeholder="Enter email"
    		                    inputRef={ref => { this.user.email = ref }}
    		                    value={data.email}
                                label={true} />
    		            </FormGroup>
    		            <FormGroup>
    		                <TextField
    		                    type="text"
    		                    placeholder="Phone"
    		                    inputRef={ref => { this.user.mobile = ref }}
    		                    value={data.mobile}
                                label={true} />
    		            </FormGroup>
                        {
                            data.role === 'girl'
                            ?   <div>
                                    <FormGroup>
                                        <TextField
                                            type="text"
                                            placeholder="Facebook"
                                            inputRef={ref => { this.user.facebook = ref }}
                                            value={data.facebook}
                                            label={true} />
                                    </FormGroup>
                                    <FormGroup>
                                        <TextField
                                            type="text"
                                            placeholder="VK"
                                            inputRef={ref => { this.user.vk = ref }}
                                            value={data.vk}
                                            label={true} />
                                    </FormGroup>
                                    <FormGroup>
                                        <TextField
                                            type="text"
                                            placeholder="Other Social Media"
                                            inputRef={ref => { this.user.other_social = ref }}
                                            value={data.other_social}
                                            label={true} />
                                    </FormGroup>
                                </div>
                            :   ''
                        }
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
)(EditProfileContact);