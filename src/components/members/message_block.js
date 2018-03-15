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
            store.dispatch(sendMessage(this.props.memberId, this.message.value, this.props.user.token))
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
        }
    }
}

export default connect(
    mapStateToProps
)(MessageBlock)