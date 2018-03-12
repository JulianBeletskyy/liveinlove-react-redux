const initialState = {
	list: ['1', '2'],
    dialog: ['1', '2']
}

export default function messages(messages = initialState, action = {}) {
    switch (action.type) {
        
        default:
            return messages;
    }
}