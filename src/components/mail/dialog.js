import React, { Component } from 'react'
import store, { history } from 'store'
import { connect } from 'react-redux'
import { FormGroup } from 'react-bootstrap'
import { sendMessageByDialog, getMessages, toggleLightBox } from 'actions'
import style from './style.css'
import { Textarea } from 'components/form/inputs'
import BtnMain from 'components/form/buttons/main_button.js'
import MessageItem from './message_item.js'
import Validator from 'validate'
import { Loader } from 'containers'
import LinkButton from 'components/list/link_button.js'
import Lightbox from 'react-images'

class Dialog extends Component {
    constructor(props) {
        super(props)
        this.message = {}
        this.el = false
        this.attachment = ''
        if (props.match.params.id) {
            store.dispatch(getMessages(props.match.params.id, props.user.token))
        }
    }

    printMessages = (message, i) => {
        return (<MessageItem key={i} showPhoto={() => this.showPhoto(message)} message={message} user={this.props.user} />)
    }

    send = () => {
        let error = 1
        error *= Validator.check(this.message.value, ['required'], 'Message')
        if (error) {
            const data = {
                original: this.message.value,
                attachment: this.props.messages.attach_message.src || this.props.messages.attach_message,
                dialog_id: this.props.match.params.id
            }
            store.dispatch(sendMessageByDialog(data, this.props.user.token))
            this.message.value = ''
        }
    }
    
    componentDidMount() {
        if (this.el) {
            this.el.scrollTop = this.el.scrollHeight
        }
    }

    componentDidUpdate() {
        if (this.el) {
            this.el.scrollTop = this.el.scrollHeight * 2
        }
    }

    showPhoto = (message) => {
        this.attachment = message.attachment
        store.dispatch(toggleLightBox('message', 0))
    }

    closeLightbox = () => {
        store.dispatch(toggleLightBox(''))
    }

    render() {
        return (
            <div className="pt-15">
                <FormGroup>
                    <div className={style.back + " font-bebas"} onClick={() => history.goBack()}><i className="fas fa-chevron-left"></i> Back to dialogs</div>
                </FormGroup>
                {   this.props.match.params.id === this.props.messages.id
                    ?   <div>
                            <FormGroup>
                                <div className={style.chatBody} ref={el => { this.el = el }}>
                                    { this.props.messages.dialog.map((message, i) => this.printMessages(message, i)) }
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Textarea 
                                    inputRef={ref => { this.message = ref }}
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
                    :   <Loader />
                }
                <Lightbox
                    images={[{src: this.attachment}]}
                    isOpen={this.props.services.gallery.show_light_box === 'message'}
                    backdropClosesModal={true}
                    showImageCount={false}
                    onClose={this.closeLightbox} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: {
            token: state.user.token,
            data: {
                avatar: {
                   croped: state.user.data.avatar.croped
                }
            }
        },
        messages: {
            dialog: state.messages.dialog.list,
            id: state.messages.dialog.id,
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
)(Dialog)