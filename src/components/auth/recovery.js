import React, { Component } from 'react'
import store from 'store/'
import { connect } from 'react-redux'
import { FormGroup } from 'react-bootstrap'
import { sendRecovery } from 'actions'
import Validator from 'validate'
import TextField from 'components/form/inputs/text_field.js'
import BtnMain from 'components/form/buttons/main_button.js'

class Recovery extends Component {
    constructor(props) {
        super(props)
        this.email = ''
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let error = 1;
        error *= Validator.check(this.email.value, ['required', 'email'], 'Email')
        if (error) {
            const data = {
                email: this.email.value,
                url: window.location.href + 'recovery/{hash}'
               
            }
            store.dispatch(sendRecovery(data))
        }
    }

    render() {
        const { recovery_hash } = this.props.user
        return (
            <form onSubmit={this.handleSubmit} noValidate={true}>
                {recovery_hash === '' ?
                    (
                        <FormGroup>
                            <TextField 
                                type="email"
                                placeholder="Enter email"
                                inputRef={ref => { this.email = ref }}
                            />
                        </FormGroup>
                    ) 
                    :
                    (
                        <div>
                            <FormGroup>
                                <TextField 
                                    type="password"
                                    placeholder="New password"
                                    inputRef={ref => { this.new_password = ref }}
                                />
                            </FormGroup>

                            <FormGroup>
                                <TextField 
                                    type="password"
                                    placeholder="Confirm password"
                                    inputRef={ref => { this.confirm_password = ref }}
                                />
                            </FormGroup>
                        </div>
                    ) 
                }
                <FormGroup className="text-center">
                    <BtnMain
                        type="submit"
                        bsStyle="success"
                        text="Recovery"/>
                </FormGroup>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(Recovery);