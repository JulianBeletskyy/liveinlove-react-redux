import React, { Component } from 'react'
import store, { history } from 'store'
import { connect } from 'react-redux'
import { FormGroup } from 'react-bootstrap'
import { sendMessage, getMessages } from 'actions'
import style from './style.css'
import { Textarea } from 'components/form/inputs'
import BtnMain from 'components/form/buttons/main_button.js'
import MessageItem from './message_item.js'
import Validator from 'validate'
import { Loader } from 'containers'

class Dialog extends Component {
    constructor(props) {
        super(props)
        this.message = {}
        
        if (props.match.params.id) {
            store.dispatch(getMessages(props.match.params.id, props.user.token))
        }
    }

    printMessages = (message, i) => {
        return (<MessageItem key={i} message={message} user={this.props.user} />)
    }

    send = () => {
        let error = 1
        error *= Validator.check(this.message.value, ['required'], 'Message')
        if (error) {
            store.dispatch(sendMessage(this.props.match.params.id, this.message.value, this.props.user.token))
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
            this.el.scrollTop = this.el.scrollHeight
        }
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
                            </FormGroup>
                        </div>
                    :   <Loader />
                }
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
            id: state.messages.dialog.id
        }
    }
}

export default connect(
    mapStateToProps
)(Dialog)