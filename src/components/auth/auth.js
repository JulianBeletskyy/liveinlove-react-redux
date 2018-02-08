import React, { Component } from 'react'
import store from '../../store/'
import { FormGroup, ControlLabel, FormControl, Button, Panel} from 'react-bootstrap'
import { login } from '../../actions/'
import api from '../../api'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.auth = {}
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const data = {
            email: this.auth.email.value,
            password: this.auth.password.value
        }
        store.dispatch(login(data))
    }

    render() {
        return (
            <Panel>
                <Panel.Heading>Log In</Panel.Heading>
                <Panel.Body>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl 
                                type="email"
                                placeholder="Enter email"
                                inputRef={ref => { this.auth.email = ref }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl 
                                type="password" 
                                placeholder="Enter password"
                                inputRef={ref => { this.auth.password = ref }}
                             />
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" bsStyle="success">Log In</Button>
                        </FormGroup>
                    </form>
                </Panel.Body>
            </Panel>
        );
    }
}

export default Auth;