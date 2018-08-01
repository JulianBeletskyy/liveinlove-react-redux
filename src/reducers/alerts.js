import * as types from '../actions/types.js'

const initialState = {
    messages: []
}

export default function alerts(alerts = initialState, action = {}) {
    switch (action.type) {
        case types.SHOW_ALERT:
            let tempMessages = Object.assign([], alerts.messages)
            tempMessages.push({ 'text': action.text, 'level': action.level, 'timeout': action.timeout })
            return Object.assign({}, alerts, {
                messages: tempMessages
            });
        case types.REMOVE_ALERT:
            return Object.assign({}, alerts, {
                messages: []
            });
        default:
            return alerts;
    }
}