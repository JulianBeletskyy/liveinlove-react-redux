import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { changePassword } from 'actions'
import style from './change_password.css'
import { FormGroup } from 'react-bootstrap'
import TextField from 'components/form/inputs/text_field.js'
import Validator from 'validate'
import BtnMain from 'components/form/buttons/main_button.js'

class PasswordProfile extends Component {

    save = ()  => {
        let error = 1;
        error *= Validator.check(this.old_password.value, ['required'], 'Old Password')
        error *= Validator.check(this.password.value, ['required'], 'New Password')
        error *= Validator.check(this.password_confirmation.value, ['required'], 'Password Confirmation')
        if (error) {
            const data = {
                old_password: this.old_password.value,
                password: this.password.value,
                password_confirmation: this.password_confirmation.value
            }
            store.dispatch(changePassword(data, this.props.user.token))
        }
    }

	render() {
        const { data } = this.props.user
		return (
			<div className={style.wrap}>
				<FormGroup>
                   <TextField
                        type="password"
                        placeholder="Old Password"
                        inputRef={ref => { this.old_password = ref }}
                        name="First Name"
                        key="old_password"
                        label={true}
                    />
                </FormGroup>
				<FormGroup>
                    <TextField 
                        type="password"
                        placeholder="New password"
                        inputRef={ref => { this.password = ref }}
                        key="password"
                        label={true}
                    />
                </FormGroup>
                <FormGroup>
                    <TextField 
                        type="password"
                        placeholder="Confirm password"
                        inputRef={ref => { this.password_confirmation = ref }}
                        key="password_confirmation"
                        label={true}
                    />
                </FormGroup>
                <FormGroup>
                    <BtnMain
                            type="button"
                            bsStyle="success"
                            text="Update"
                            onClick = {this.save}
                        />
                </FormGroup>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state
}

export default connect(
	mapStateToProps
)(PasswordProfile);