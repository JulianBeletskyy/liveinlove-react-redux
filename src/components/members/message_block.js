import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import store from 'store'
import { sendMessage } from 'actions'
import { connect } from 'react-redux'
import Textarea from 'components/form/inputs/textarea.js'
import BtnMain from 'components/form/buttons/main_button.js'
import Validator from 'validate'
import LinkButton from 'components/list/link_button.js'

class MessageBlock extends Component {
    constructor(props) {
        super(props)
        this.message = ''
    }

    send = () => {
        let error = 1
        error *= Validator.check(this.message.value, ['required'], 'Message')
        if (error) {
            const data = {
                original: this.message.value,
                receiver_id: this.props.memberId,
                attachment: this.props.messages.attach_message.src || this.props.messages.attach_message
            }
            store.dispatch(sendMessage(data, this.props.user.token))
            this.message.value = ''
        }
    }

    render() {
        return (
        	<div>
                <FormGroup className="member">
    	           <Textarea
                        inputRef={ref => { this.message = ref }}
                        value={''}
                        placeholder="Message" />
                </FormGroup>
                <FormGroup>
                    <BtnMain
                        type="button"
                        bsStyle="success"
                        text="Send"
                        onClick = {this.send} />
                    <LinkButton  />
                </FormGroup>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: {
            token: state.user.token
        },
        messages: {
            attach_message: state.messages.attach_message
        }
    }
}

export default connect(
    mapStateToProps
)(MessageBlock)