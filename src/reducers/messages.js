import { SET_DIALOGS_LIST } from 'actions/types.js'

const initialState = {
	list: [],
    dialog: []
}

export default function messages(messages = initialState, action = {}) {
    switch (action.type) {
    	case SET_DIALOGS_LIST:
            return Object.assign({}, messages, {
                list: action.value
            });
        
        default:
            return messages;
    }
}