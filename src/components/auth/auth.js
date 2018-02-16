import React, { Component } from 'react'
import store from 'store/'
import { FormGroup, ControlLabel, FormControl, Button, Panel} from 'react-bootstrap'
import { login } from 'actions'
import { Link } from 'react-router-dom';
import Validator from 'validate'
import style from './style.css';
import TextField from 'components/form/inputs/text_field.js';
import Btn from 'components/form/buttons/button.js';
import CheckboxField from 'components/form/inputs/checkbox_field.js'
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

    render() {
        return (
            <Panel className={style.loginPanel}>
                <Panel.Heading className={style.loginHeader + ' title text-center'}>Please Log In</Panel.Heading>
                <Panel.Body>
                    <form onSubmit={this.handleSubmit} noValidate={true}>
                        <FormGroup>
                            <TextField 
                                type="email"
                                placeholder="Enter email"
                                inputRef={ref => { this.auth.email = ref }}
                            />
                        </FormGroup>

                        <FormGroup>
                            <TextField 
                                type="password" 
                                placeholder="Enter password"
                                inputRef={ref => { this.auth.password = ref }}
                             />
                        </FormGroup>

                        <FormGroup className={style.inline + ' title'} >
                            <CheckboxField 
                                text='Remember me'
                            />

                            <Link className="pull-right" to="/pass-recovery">Forgot password?</Link>
                        </FormGroup>

                        <FormGroup className="text-center">
                            <Btn type="submit" bsStyle="success" text="Log In"/>
                        </FormGroup>

                        <FormGroup className="text-center title">
                            Dont have an account? <Link to="/registration">Sign up</Link>
                        </FormGroup>
                    </form>
                </Panel.Body>
            </Panel> 
        );
    }
}

export default Auth;