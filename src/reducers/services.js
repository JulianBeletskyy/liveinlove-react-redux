import { SET_ACTIVE_TAB } from 'actions/types.js'

const initialState = {
    active_tab: ''
}

export default function services(services = initialState, action = {}) {
    switch (action.type) {
        case SET_ACTIVE_TAB:
            return Object.assign({}, services, {
                active_tab: action.value
            });
        default:
            return services;
    }
}