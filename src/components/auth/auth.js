import React, { Component } from 'react'
import store from 'store/'
import { FormGroup } from 'react-bootstrap'
import { login, toggleModal } from 'actions'
import Validator from 'validate'
import { TextField, CheckboxField } from 'components/form/inputs'
import BtnMain from 'components/form/buttons/main_button.js'
import style from './style.css'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.auth = {}
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let error = 1;
        error *= Validator.check(this.auth.email.value, ['required', 'email'], 'Email')
        error *= Validator.check(this.auth.password.value, ['required'], 'Password')
        if (error) {
            const data = {
                email: this.auth.email.value,
                password: this.auth.password.value
            }
            store.dispatch(login(data))
        }
    }

    showRecovery = () => {
        store.dispatch(toggleModal(true, 'recovery'))
        store.dispatch(toggleModal(false, 'login'))
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} noValidate={true}>
                <FormGroup>
                    <TextField 
                        type="email"
                        placeholder="Enter email"
                        inputRef={ref => { this.auth.email = ref }} />
                </FormGroup>
                <FormGroup>
                    <TextField 
                        type="password" 
                        placeholder="Enter password"
                        inputRef={ref => { this.auth.password = ref }} />
                </FormGroup>
                <FormGroup className="text-center">
                    <BtnMain
                        type="submit"
                        bsStyle="success"
                        text="Log In"/>
                </FormGroup>
            </form>
        );
    }
}

export default Auth;