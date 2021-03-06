import { SET_DIALOGS_LIST, SET_MESSAGES, SET_RECEIVER, SET_CONTACTS, SET_ATTACH_MESSAGE, SET_ATTACH, SET_MAIL, CLEAR_ATTACH, SET_SENDING_MESSAGE } from 'actions/types.js'

const initialState = {
	list: [],
    dialog: {
        id: 0,
        list: []
    },
    receiver: 0,
    receiver_avatar: '',
    contacts: [],
    attach_message: [],
    inbox: [],
    sent: [],
    drafts: [],
    deleted: [],
    message: {},
    draft: {},
    sendingMessage: {}

}

export default function messages(messages = initialState, action = {}) {
    switch (action.type) {
    	case SET_DIALOGS_LIST:
            return Object.assign({}, messages, {
                list: action.value
            });
        case SET_RECEIVER:
            return Object.assign({}, messages, {
                receiver: action.id,
                receiver_avatar: action.avatar
            });
        case SET_CONTACTS:
            return Object.assign({}, messages, {
                contacts: action.value,
            });
        case SET_ATTACH_MESSAGE:
            return Object.assign({}, messages, {
                attach_message: [...messages.attach_message, ...action.value],
            });
        case CLEAR_ATTACH:
            let temp_draft = messages.draft
            if (temp_draft.attachment.length) {
                temp_draft.attachment = temp_draft.attachment.filter((item, i) => i !== action.index)
            }

            return Object.assign({}, messages, {
                attach_message: messages.attach_message.filter((item, i) => i !== action.index),
                draft: temp_draft
            });
        case SET_ATTACH:
            let temp_message = Object.assign({}, messages.message);
            temp_message.attachment = action.src
            temp_message.attach_confirm = '1'
            
            return Object.assign({}, messages, {
                message: temp_message
            });
        case SET_MESSAGES:
            let temp =  Object.assign({}, messages.dialog);
            temp.list = action.value
            temp.id = action.id
            return Object.assign({}, messages, {
                dialog: temp
            });
        case SET_MAIL:
            let attach_message = []
            if (action.key == 'draft' && action.data.attachment) {
                attach_message = action.data.attachment
            }
            return Object.assign({}, messages, {
                [action.key]: action.data,
                attach_message: attach_message

            });
        case SET_SENDING_MESSAGE:
            return Object.assign({}, messages, {
                    sendingMessage: action.data
                });
        default:
            return messages;
    }
}