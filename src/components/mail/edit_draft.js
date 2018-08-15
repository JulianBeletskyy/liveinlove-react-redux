import React, { Component } from 'react'
import store, { history } from 'store'
import { connect } from 'react-redux'
import { getMail, removeDraft, saveDraft, sendMessage, toggleLightBox, buyMessage, setActiveTab, toggleModal } from 'actions'
import { Textarea }  from 'components/form/inputs'
import { Loader } from 'containers'
import BtnMain from 'components/form/buttons/main_button.js'
import LinkButton from 'components/list/link_button.js'
import Validator from 'validate'
import style from './style.css'
import Lightbox from 'react-images'
import { confirmAlert } from 'react-confirm-alert'

class EditDraft extends Component {
	constructor(props) {
		super(props)
		this.message = ''
        this.attachment = ''
		store.dispatch(getMail('draft/' + props.match.params.id, 'draft', props.user.token))
	}

    resolveMessage = (data, letterPrice) => {
        if (this.props.user.data.credits >= letterPrice) {
            store.dispatch(buyMessage(data, this.props.user.token))
            .then(res => {
                if (res) {
                    this.message.value = ''
                    store.dispatch(setActiveTab('sent', 'mail'))
                    history.push('/mail/main')
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
                receiver_id: this.props.messages.draft.receiver_id,
                attachment: this.props.messages.attach_message.map(item => {
                    return item.img ? item.img : item
                }),
                draft_id: this.props.match.params.id
            }
            store.dispatch(sendMessage(data, this.props.user.token))
            .then(res => {
                if (res === true) {
                    this.message.value = ''
                    store.dispatch(setActiveTab('sent', 'mail'))
                    history.push('/mail/main')
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

	save = () => {
		let error = 1
        error *= Validator.check(this.message.value, ['required'], 'Message')
        if (error) {
            const data = {
                original: this.message.value,
                receiver_id: this.props.messages.draft.receiver_id,
                attachment:  this.props.messages.attach_message.map(item => {
                    return item.img ? item.img : item
                })
            }

            store.dispatch(saveDraft(data, this.props.user.token, this.props.messages.draft.id))
            store.dispatch(getMail('draft/' + this.props.match.params.id, 'draft', this.props.user.token))
        }
	}

	removeDraft = () => {
		store.dispatch(removeDraft(this.props.messages.draft.id, this.props.user.token))
		history.push('/mail/main')
	}

    showPhoto = (item, i) => e => {
        e.stopPropagation()
        const temp = this.props.messages.draft.attachment.find((item, index) => index === i)
        if (temp) {
            this.attachment = temp.img
            store.dispatch(toggleLightBox('message', 0))
        }
    }

    closeLightbox = () => {
        store.dispatch(toggleLightBox(''))
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
                            <div className="row">
                                {
                                    draft.attachment && draft.attachment.length
                                    ?   draft.attachment.map((item, key) => {
                                            return  <div className="col-xs-6">
                                                        <div className={style.attachmentWrap}>
                                                            <img onClick={this.showPhoto(item, key)} className="img-responsive" src={item.img} alt="" />
                                                        </div>
                                                    </div>
                                        })
                                    :   null
                                }
                               
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
	            <Lightbox
                    images={[{src: this.attachment}]}
                    isOpen={this.props.services.gallery.show_light_box === 'message'}
                    backdropClosesModal={true}
                    showImageCount={false}
                    onClose={this.closeLightbox} />    
            </div>
        )
	}
}

const mapStateToProps = (state) => {
    return {
        user: {
            token: state.user.token,
            data: state.user.data
        },
        messages: {
            draft: state.messages.draft,
            attach_message: state.messages.attach_message
        },
        services: {
            gallery: {
                show_light_box: state.services.gallery.show_light_box
            }
        }
    }
}

export default connect(
    mapStateToProps
)(EditDraft)