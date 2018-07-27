import React, { Component } from 'react'
import store, { history } from 'store'
import { connect } from 'react-redux'
import { getMail, removeDraft, saveDraft, sendMessage } from 'actions'
import { Textarea }  from 'components/form/inputs'
import { Loader } from 'containers'
import BtnMain from 'components/form/buttons/main_button.js'
import LinkButton from 'components/list/link_button.js'
import Validator from 'validate'

class EditDraft extends Component {
	constructor(props) {
		super(props)
		this.message = ''
		store.dispatch(getMail('draft/' + props.match.params.id, 'draft', props.user.token))
	}

	send = () => {
		let error = 1
        error *= Validator.check(this.message.value, ['required'], 'Message')
        if (error) {
            const data = {
                original: this.message.value,
                receiver_id: this.props.messages.draft.receiver_id,
                attachment: this.props.messages.attach_message.src || this.props.messages.draft.attachment,
                draft_id: this.props.match.params.id
            }
            store.dispatch(sendMessage(data, this.props.user.token))
            .then(res => {
                if (res) {
                    this.message.value = ''
                    history.push('/mail/main', {active: 'sent'})
                }
            })
        }
	}

	save = () => {
		let error = 1
        error *= Validator.check(this.message.value, ['required'], 'Message')
        if (error) {
            const data = {
                original: this.message.value,
                receiver_id: this.props.messages.draft.receiver_id,
                attachment: this.props.messages.attach_message.src || this.props.messages.draft.attachment
            }
            store.dispatch(saveDraft(data, this.props.user.token, this.props.messages.draft.id))
            store.dispatch(getMail('draft/' + this.props.match.params.id, 'draft', this.props.user.token))
        }
	}

	removeDraft = () => {
		store.dispatch(removeDraft(this.props.messages.draft.id, this.props.user.token))
		history.push('/mail/main')
	}

	render() {
		const { draft } = this.props.messages
		return (
            <div className="pt-15">
            	{
            		draft.id == this.props.match.params.id
            		? 	<div>
            				<div className="font-bebas pointer form-group" onClick={() => history.goBack()}>
			                    <i className="fas fa-chevron-left"></i> Back to mail
			                </div>
			                <div className="form-group">
			                	<Textarea
			                        inputRef={ref => { this.message = ref }}
			                        value={draft.original}
			                        placeholder="Message"
			                        label={true} />
			                </div>
			                <div className="form-group">
			                	<BtnMain
		                            type="button"
		                            bsStyle="success"
		                            text="Send"
		                            onClick={this.send} />
                                &nbsp;
	                            <BtnMain
                                    type="submit"
                                    bsStyle="success"
                                    onClick={this.save}
                                    text="Save message" />
                                &nbsp;
	                            <BtnMain
                                    type="submit"
                                    bsStyle="success"
                                    onClick={this.removeDraft}
                                    text="Remove message" />
                                <LinkButton  />
			                </div>
            			</div>
            		:  	<Loader />
            	}
	                
            </div>
        )
	}
}

const mapStateToProps = (state) => {
    return {
        user: {
            token: state.user.token
        },
        messages: {
            draft: state.messages.draft,
            attach_message: state.messages.attach_message
        }
    }
}

export default connect(
    mapStateToProps
)(EditDraft)