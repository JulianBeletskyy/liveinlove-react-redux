import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { history } from 'store'
import { getMail, sendMessage, saveDraft, toggleLightBox, showAttach } from 'actions'
import Textarea from 'components/form/inputs/textarea.js'
import BtnMain from 'components/form/buttons/main_button.js'
import LinkButton from 'components/list/link_button.js'
import Validator from 'validate'
import style from './style.css'
import Lightbox from 'react-images'

class FullMail extends Component {
    state = {
        new: false
    }

    constructor(props) {
        super(props)
        this.message = ''
        this.attachment = ''
        if (props.match.params.id === 'new' && ! props.location.state) {
            history.push('/mail/main')
        } else if (props.match.params.id !== 'new') {
            store.dispatch(getMail('message/' + props.match.params.id, 'message', props.user.token))
        }
    }

    showAttach = () => {
        const dialog_id = history.location.pathname.split('/').pop() * 1
        store.dispatch(showAttach(this.props.messages.message.id, this.props.user.token, dialog_id))
    }

    closeLightbox = () => {
        store.dispatch(toggleLightBox(''))
    }

    showPhoto = (e) => {
        e.stopPropagation()
        if (this.props.messages.message.attach_confirm === '1' || this.props.user.data.role === 'girl') {
            this.attachment = this.props.messages.message.attachment
            store.dispatch(toggleLightBox('message', 0))
        }
    } 

    componentWillMount() {
        if (this.props.match.params.id === 'new' && this.props.location.state) {
            this.setState({new: true})
        }  
    }
    

    send = () => {
        let error = 1
        error *= Validator.check(this.message.value, ['required'], 'Message')
        if (error) {
            const data = {
                original: this.message.value,
                receiver_id: this.props.messages.message.receiver_id,
                attachment: this.props.messages.attach_message.src || this.props.messages.attach_message
            }
            store.dispatch(sendMessage(data, this.props.user.token))
            this.message.value = ''
        }
    }

    saveDraft = () => {
        let error = 1
        error *= Validator.check(this.message.value, ['required'], 'Message')
        if (error) {
            
            const data = {
                original: this.message.value,
                receiver_id: this.state.new ? this.props.location.state.id : this.props.messages.message.receiver_id,
                attachment: this.props.messages.attach_message.src || this.props.messages.attach_message
            }
            store.dispatch(saveDraft(data, this.props.user.token))
            this.message.value = ''
        }
    }

    render() {
        const avatar = this.state.new ? this.props.location.state.avatar : this.props.messages.message.receiver_avatar
        const { message } = this.props.messages

        let text = message.original
        if (this.props.messages.message.original) {
           if (this.props.messages.message.original.indexOf('[$link]') + 1) {
                const name = this.props.user.data.role === 'client' ? this.props.user.data.first_name : message.receiver_first_name
                text = text.replace('[$link]', '<a href="/member/'+message.receiver_id+'">'+name+'</a>')
            }
            text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
        }

        let translate = ''
        if (this.props.messages.message.translation) {
            translate = this.props.messages.message.translation.replace(/(?:\r\n|\r|\n)/g, '<br />')
        }
        
        return (
            <div className="pt-15">
                <div className="font-bebas pointer form-group" onClick={() => history.goBack()}>
                    <i className="fas fa-chevron-left"></i> Back to mail
                </div>
                <div className="row form-group">
                    <div className="col-sm-2">
                        <img src={avatar} alt="" className="img-responsive" />
                    </div>
                    {
                        ! this.state.new
                        ?   <div className="col-sm-10">
                                <div className="row form-group">
                                    <div className="col-sm-2">
                                        <strong>Name:</strong>
                                    </div>
                                    <div className="col-sm-10">
                                        {this.props.messages.message.receiver_first_name}
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-sm-2">
                                        <strong>Date:</strong>
                                    </div>
                                    <div className="col-sm-10">
                                        {this.props.messages.message.date}
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-sm-2">
                                        <strong>Message:</strong>
                                    </div>
                                    <div className="col-sm-10">
                                        <pre dangerouslySetInnerHTML={{__html: text}} />
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-sm-2">
                                        <strong>Translate:</strong>
                                    </div>
                                    <div className="col-sm-10">
                                        <span dangerouslySetInnerHTML={{__html: translate}} />
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-sm-2">
                                        <strong>Attachment:</strong>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className={style.attachmentWrap}>
                                            {
                                                message.attach_confirm !== '1' && message.attachment && ! message.my && this.props.user.data.role === 'client'
                                                ?   <span className={style.attachBtnWrap}>
                                                        <BtnMain
                                                            type="button"
                                                            bsStyle="success"
                                                            text="View"
                                                            onClick = {this.showAttach} />
                                                    </span>
                                                : ''
                                            }
                                            <img onClick={this.showPhoto} className="img-responsive" src={message.attachment} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        :   <div className="col-sm-10">
                                <strong>To: </strong> {this.props.location.state.first_name}
                            </div>
                    }
                </div>
                <div>
                    <div className="form-group">
                        <Textarea
                            inputRef={ref => { this.message = ref }}
                            value={''}
                            placeholder="Message" />
                    </div>
                    <div className="form-group">
                        <BtnMain
                            type="button"
                            bsStyle="success"
                            text={this.props.messages.message.my || this.state.new ? 'Send' : 'Reply'}
                            onClick = {this.send} />
                        &nbsp;
                        <BtnMain
                            type="button"
                            bsStyle="success"
                            text="Save to drats"
                            onClick = {this.saveDraft} />
                        <LinkButton  />
                    </div>
                </div>
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
            message: state.messages.message,
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
)(FullMail)