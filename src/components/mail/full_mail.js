import React, { Component } from 'react'
import { connect } from 'react-redux'
import store, { history } from 'store'
import { getMail, sendMessage, saveDraft, toggleLightBox, showAttach, buyMessage, setActiveTab, toggleModal, setSendingMessage, buyAttach, setBuyingAttach } from 'actions'
import Textarea from 'components/form/inputs/textarea.js'
import BtnMain from 'components/form/buttons/main_button.js'
import LinkButton from 'components/list/link_button.js'
import Validator from 'validate'
import style from './style.css'
import Lightbox from 'react-images'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'

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

    resolveAttach = (data) => {
        if (this.props.user.data.credits >= 3) {
            store.dispatch(buyAttach(data, this.props.user.token))
        } else {
            store.dispatch(toggleModal(true, 'credits'))
            store.dispatch(setBuyingAttach(data))
        }
        
    }

    showAttach = attach_id => e => {
        const data = {
            message_id: this.props.messages.message.id,
            attachment_id: attach_id
        }
        store.dispatch(showAttach(data, this.props.user.token))
        .then(res => {
            if (res !== true) {
                confirmAlert({
                    title: '',
                    message: 'You can\'t see this attachment.',
                    buttons: [
                        {
                            label: 'Cancel',
                            onClick: () => {
                                return
                            }
                        }, {
                            label: this.props.user.data.credits >= 3 ? 'Use Dibs' : 'Buy Dibs',
                            onClick: () => {
                                this.resolveAttach(data)
                            }
                        }
                    ]
                })
            }
        })
    }

    closeLightbox = () => {
        store.dispatch(toggleLightBox(''))
    }

    showPhoto = (item, i) => e => {
        e.stopPropagation()
        if (item.confirm === '1' || this.props.user.data.role === 'girl' || this.props.messages.message.my) {
            const temp = this.props.messages.message.attachment.find((item, index) => index === i)
            if (temp) {
                this.attachment = temp.img
                store.dispatch(toggleLightBox('message', 0))
            }
        }
    } 

    componentWillMount() {
        if (this.props.match.params.id === 'new' && this.props.location.state) {
            this.setState({new: true})
        }  
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
            store.dispatch(setSendingMessage({...data, letterPrice}))
        }
    }

    send = (receiver_id) => (e) => {
        let error = 1
        error *= Validator.check(this.message.value, ['required'], 'Message')
        if (error) {
            const data = {
                original: this.message.value,
                receiver_id: receiver_id,
                attachment: this.props.messages.attach_message.map(item => {
                    return item.src ? item.src : item
                })
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
                            message: 'You do not have enough dibs to send message. Click Buy Dibs to chose the package.',
                            buttons: [
                                {
                                    label: 'Cancel',
                                    onClick: () => {
                                        store.dispatch(setSendingMessage({}))
                                    }
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

    saveDraft = (receiver_id) => e => {
        let error = 1
        error *= Validator.check(this.message.value, ['required'], 'Message')
        if (error) {
            
            const data = {
                original: this.message.value,
                receiver_id: this.state.new ? this.props.location.state.id : receiver_id,
                attachment: this.props.messages.attach_message.map(item => {
                    return item.src ? item.src : item
                })
            }
            store.dispatch(saveDraft(data, this.props.user.token))
            .then(res => {
                if (res) {
                    store.dispatch(setActiveTab('drafts', 'mail'))
                    history.push('/mail/main')
                }
            })
            this.message.value = ''
        }
    }

    goToMember = (member_id) => (e) => {
        history.push(`/member/${member_id}`)
    }

    isMy = () => {
        return this.props.messages.message.sender_id == this.props.user.data.id
    }

    render() {
        const { message } = this.props.messages
        let data = {}

        /*let text = message.original
        if (this.props.messages.message.original) {
            text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
        }*/

        switch(this.props.match.params.type) {
            case 'sent':
                data = {
                    fromTo: 'To',
                    avatar: this.state.new ? this.props.location.state.avatar : message.receiver_avatar,
                    oponent: this.state.new ? this.props.location.state.first_name : message.receiver_first_name,
                    member_id: this.state.new ? this.props.location.state.id : message.receiver_id,
                    text: this.state.new ? '' : message.original
                }
                break
            case 'drafts':
                data = {
                    fromTo: 'To',
                    avatar: message.receiver_first_avatar,
                    oponent: message.receiver_first_name,
                    member_id: message.receiver_id,
                    text: message.original
                }
                break
            case 'deleted':
                data = {
                    fromTo: this.isMy() ? 'To' : 'From',
                    avatar: this.isMy() ? message.receiver_avatar : message.sender_avatar,
                    oponent: this.isMy() ? message.receiver_first_name : message.sender_first_name,
                    member_id: this.isMy() ? message.receiver_id : message.sender_id,
                    text: this.isMy() ? message.original : (this.props.user.data.role === 'client' ? message.translation : message.original)
                }
                break
            default: 
                data = {
                    fromTo: 'From',
                    avatar: message.sender_avatar,
                    oponent: message.sender_first_name,
                    member_id: message.sender_id,
                    text: this.props.user.data.role === 'client' ? message.translation : message.original
                }
                break
        }
        
        return (
            <div className="pt-15">
                <div className="font-bebas pointer form-group" onClick={() => history.goBack()}>
                    <i className="fas fa-chevron-left"></i> Back to mail
                </div>
                <div className="row form-group">
                    <div className="col-sm-2">
                        <img src={data.avatar} alt="" className="img-responsive pointer" onClick={this.goToMember(data.member_id)} />
                    </div>
                    {
                        ! this.state.new
                        ?   <div className="col-sm-10">
                                <div className="row form-group">
                                    <div className="col-sm-2">
                                        <strong>Name:</strong>
                                    </div>
                                    <div className="col-sm-10">
                                        <Link to={`/member/${data.member_id}`}  style={{textDecoration: 'unset'}}>
                                            <strong className={this.props.user.data.role === 'client' ? 'color-girl' : 'color-client'}>{data.oponent}</strong>
                                        </Link>
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
                                        <pre dangerouslySetInnerHTML={{__html: data.text}} />
                                    </div>
                                </div>
                                {
                                    this.props.user.data.role === 'client'
                                    ?   null
                                    :   <div className="row form-group">
                                            <div className="col-sm-2">
                                                <strong>Translate:</strong>
                                            </div>
                                            <div className="col-sm-10">
                                                <span dangerouslySetInnerHTML={{__html: message.translation}} />
                                            </div>
                                        </div>
                                }
                                <div className="row form-group">
                                    <div className="col-sm-2">
                                        <strong>Attachment:</strong>
                                    </div>
                                    <div className="col-sm-10">
                                        <div className="row">
                                            {
                                                message.attachment && message.attachment.length
                                                ?   message.attachment.map((item, key) => {
                                                        return  <div className="col-xs-6"><div className={style.attachmentWrap}>
                                                                    <img onClick={this.showPhoto(item, key)} className="img-responsive" src={item.img} alt="" />
                                                                    {
                                                                        item.confirm !== '1' && ! message.my && this.props.user.data.role === 'client'
                                                                        ?   <span className={style.attachBtnWrap}>
                                                                                <BtnMain
                                                                                    type="button"
                                                                                    bsStyle="success"
                                                                                    text="View"
                                                                                    onClick = {this.showAttach(item.id)} />
                                                                            </span>
                                                                        : null
                                                                    }
                                                                </div></div>
                                                    })
                                                :   null
                                            }
                                           
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
                            text="Save to drats"
                            onClick={this.saveDraft(data.member_id)} />
                        &nbsp;
                        <BtnMain
                            type="button"
                            bsStyle="success"
                            text={this.props.messages.message.my || this.state.new ? 'Send' : 'Reply'}
                            onClick = {this.send(data.member_id)} />
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

const mapStateToProps = state => {
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