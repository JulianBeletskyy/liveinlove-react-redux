import { SET_DIALOGS_LIST, SET_MESSAGES, SET_RECEIVER } from 'actions/types.js'

const initialState = {
	list: [],
    dialog: {
        id: 0,
        list: []
    },
    receiver: 0,
    receiver_avatar: ''
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