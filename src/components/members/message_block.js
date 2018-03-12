import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import Textarea from 'components/form/inputs/textarea.js'
import BtnMain from 'components/form/buttons/main_button.js'
import Validator from 'validate'

class MessageBlock extends Component {
    constructor(props) {
        super(props)
        this.message = ''
    }

    send = () => {
        let error = 1
        error *= Validator.check(this.message.value, ['required'], 'Message')
        if (error) {
            this.message.value = ''
        }
    }

    render() {
        return (
        	<div>
                <FormGroup>
    	           <Textarea
                        inputRef={ref => { this.message = ref }}
                        value={''}
                        placeholder="Message"
                    />
                </FormGroup>
                <FormGroup>
                    <BtnMain
                        type="button"
                        bsStyle="success"
                        text="Send"
                        onClick = {this.send}
                    />
                </FormGroup>
            </div>
        );
    }
}

export default MessageBlock