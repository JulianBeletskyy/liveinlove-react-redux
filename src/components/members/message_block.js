import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import store, { history } from 'store'
import { sendMessage, saveDraft, buyMessage, getMail, setActiveTab, toggleModal } from 'actions'
import { connect } from 'react-redux'
import Textarea from 'components/form/inputs/textarea.js'
import BtnMain from 'components/form/buttons/main_button.js'
import Validator from 'validate'
import LinkButton from 'components/list/link_button.js'
import { confirmAlert } from 'react-confirm-alert'

class MessageBlock extends Component {
    constructor(props) {
        super(props)
        this.message = ''
    }

    resolveMessage = (data, letterPrice) => {
        if (this.props.user.data.credits >= letterPrice) {
            store.dispatch(buyMessage(data, this.props.user.token))
            .then(res => {
                if (res) {
                    this.message.value = ''
                    store.dispatch(setActiveTab('sent', 'mail'))
                    history.push('/mail/main', {active: 'sent'})
                }
            })
        } else {
            store.dispatch(toggleModal(true, 'credits'))
        }
    }

    send = () => {
        let error = 1
        error *= Validator.check(this.message.value, ['required'], 'Message')
        if (error) {
            const data = {
                original: this.message.value,
                receiver_id: this.props.memberId,
                attachment: this.props.messages.attach_message.map(item => {
                    return item.src ? item.src : item
                })
            }
            store.dispatch(sendMessage(data, this.props.user.token))
            .then(res => {
                if (res === true) {
                    this.message.value = ''
                    store.dispatch(setActiveTab('sent', 'mail'))
                    history.push('/mail/main', {active: 'sent'})
                } else {
                    if (res.message.indexOf('free letter') + 1) {
                        let letterPrice = 6 + (this.props.messages.attach_message.length * 3);
                        confirmAlert({
                            title: '',
                            message: 'You can\'t send message',
                            buttons: [
                                {
                                    label: 'Cancel'
                                }, {
                                    label: this.props.user.data.credits >= letterPrice ? 'Use Dibs' : 'Buy Dibs',
                                    onClick: () => {
                                        this.resolveMessage(data, letterPrice)
                                        
                                    }
                                }
                            ]
                        })
                    }
                }
            })
        }
    }

    saveDraft = () => {
        let error = 1
        error *= Validator.check(this.message.value, ['required'], 'Message')
        if (error) {
            
            const data = {
                original: this.message.value,
                receiver_id: this.props.memberId,
                attachment: this.props.messages.attach_message.src || this.props.messages.attach_message
            }
            store.dispatch(saveDraft(data, this.props.user.token))
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
                        bsStyle="success "
                        text="Save to drats"
                        onClick = {this.saveDraft} />
                    &nbsp;
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
            token: state.user.token,
            data: {
                credits: state.user.data.credits
            }
        },
        messages: {
            attach_message: state.messages.attach_message
        }
    }
}

export default connect(
    mapStateToProps
)(MessageBlock)