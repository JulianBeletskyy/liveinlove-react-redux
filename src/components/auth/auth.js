import React, { Component } from 'react'
import store from 'store/'
import { FormGroup } from 'react-bootstrap'
import { login, toggleModal } from 'actions'
import Validator from 'validate'
import { TextField } from 'components/form/inputs'
import BtnMain from 'components/form/buttons/main_button.js'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.auth = {}
        this.state = {
            email: true,
            password: true,
            message: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({email: true, password: true, message: ''})
        let error = 1;

        if (!Validator.check(this.auth.email.value, ['required', 'email'], 'Email')) {
            this.setState({valid: false, email: 'Email is incorrect'})
            error = 0
        }

        if (!Validator.check(this.auth.password.value, ['required'], 'Password')) {
            this.setState({password: 'Password is required'})
            error = 0
        }

        if (error) {
            const data = {
                email: this.auth.email.value,
                password: this.auth.password.value
            }
            store.dispatch(login(data))
            .then(res => {
                if (res !== true) {
                    this.setState({message: res, email: false, password: false})
                }
            })
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
                        className={this.state.email !== true ? 'border-bottom-danger' : ''}
                        description={<span className="text-danger">{this.state.email}</span>}
                        placeholder="Enter email"
                        inputRef={ref => { this.auth.email = ref }} />
                </FormGroup>
                <div>
                    &nbsp;
                </div>
                <FormGroup>
                    <TextField 
                        type="password"
                        className={this.state.password !== true ? 'border-bottom-danger' : ''}
                        description={<span className="text-danger">{this.state.password}</span>}
                        placeholder="Enter password"
                        inputRef={ref => { this.auth.password = ref }} />
                </FormGroup>
                <FormGroup className="text-right">
                    <span className="pull-left text-danger">{this.state.message}</span>
                    <a href="javascript:;" onClick={this.showRecovery}>Forgot password?</a>
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