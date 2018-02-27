import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './change_password.css'

class ChangePassword extends Component {

	render() {
		return (
			<div>
				<FormGroup>
                    <TextField 
                        type="password"
                        placeholder="OLd password"
                        inputRef={ref => { this.old_password = ref }}
                    />
                </FormGroup>
				<FormGroup>
                    <TextField 
                        type="password"
                        placeholder="New password"
                        inputRef={ref => { this.password = ref }}
                    />
                </FormGroup>
                <FormGroup>
                    <TextField 
                        type="password"
                        placeholder="Confirm password"
                        inputRef={ref => { this.password_confirmation = ref }}
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
)(ChangePassword);