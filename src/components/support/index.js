import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import { TextField, Textarea } from 'components/form/inputs'
import { BtnMain } from 'components/form/buttons'
import Validator from 'validate'
import store from 'store'
import { sendRequest } from 'actions'

class Support extends Component {

	send = () => {
		let error = 1
        error *= Validator.check(this.name.value, ['required'], 'Name')
        error *= Validator.check(this.email.value, ['required', 'email'], 'Email')
        error *= Validator.check(this.subject.value, ['required'], 'Subject')
        error *= Validator.check(this.message.value, ['required'], 'Message')
        if (error) {
        	const data = {
        		name: this.name.value,
        		email: this.email.value,
        		subject: this.subject.value,
        		message: this.message.value
        	}

        	store.dispatch(sendRequest(data))
        }
	}

    render() {
        return (
            <div>
	            <FormGroup>
	                <TextField
	                    type="text"
	                    placeholder="Name"
	                    inputRef={ref => { this.name = ref }}
	                    name="Name"
	                    key="name" />
	            </FormGroup>
                <FormGroup>
                    <TextField
                        type="email"
                        placeholder="Enter email"
                        inputRef={ref => { this.email = ref }} />
                </FormGroup>
                <FormGroup>
	                <TextField
	                    type="text"
	                    placeholder="Subject"
	                    inputRef={ref => { this.subject = ref }}
	                    name="Subject"
	                    key="subject" />
	            </FormGroup>
	            <FormGroup>
                    <Textarea
                        inputRef={ref => { this.message = ref }}
                        placeholder="Message" />
                </FormGroup>
                <FormGroup className="text-right">
	                <BtnMain
	                    type="button"
	                    bsStyle="success"
	                    text="Send"
	                    onClick = {this.send} />
                </FormGroup>
            </div>
        );
    }
}

export default Support