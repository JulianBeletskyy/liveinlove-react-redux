import React, { Component } from 'react'
import store from 'store/'
import { FormGroup, Panel} from 'react-bootstrap'
import { login } from 'actions'
import { Link } from 'react-router-dom';
import Validator from 'validate'
import TextField from 'components/form/inputs/text_field.js';
import BtnMain from 'components/form/buttons/main_button.js';
import Checkbox from 'components/form/inputs/checkbox_field.js';

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
            <Panel>
                <Panel.Heading className="title text-center">Log In</Panel.Heading>
                <Panel.Body className="title">
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

                        <FormGroup>
                            <label>
                                <Checkbox></Checkbox> Remember me 
                            </label>

                            <Link className="pull-right" to="/pass-recovery">Forgot password?</Link>
                        </FormGroup>

                        <FormGroup className="text-center">
                            <BtnMain
                                type="submit"
                                bsStyle="success"
                                text="Log In"/>
                        </FormGroup>

                        <FormGroup className="text-center">
                            Dont have an account? <Link to="/registration">Sign up</Link>
                        </FormGroup>
                    </form>
                </Panel.Body>
            </Panel> 
        );
    }
}

export default Auth;