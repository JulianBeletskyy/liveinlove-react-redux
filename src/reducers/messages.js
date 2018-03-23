import { SET_DIALOGS_LIST, SET_MESSAGES, SET_RECEIVER, SET_CONTACTS, SET_ATTACH_MESSAGE, SET_ATTACH } from 'actions/types.js'

const initialState = {
	list: [],
    dialog: {
        id: 0,
        list: []
    },
    receiver: 0,
    receiver_avatar: '',
    contacts: [],
    attach_message: false

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
                attach_message: action.value,
            });
        case SET_ATTACH:
            let temp_dialog = Object.assign({}, messages.dialog);
            temp_dialog.list.map((item) => {
                if (item.id === action.id) {
                    item.attachment = action.src
                    item.attach_confirm = '1'
                }
            })
            return Object.assign({}, messages, {
                dialog: temp_dialog
            });
        case SET_MESSAGES:
            let temp =  Object.assign({}, messages.dialog);
            temp.list = action.value
            temp.id = action.id
            return Object.assign({}, messages, {
                dialog: temp
            });
        
        default:
            return messages;
    }
}