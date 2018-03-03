import * as types from '../actions/types.js'

const initialState = {
	active_tab: 'info'
}

export default function profile(profile = initialState, action = {}) {
    switch (action.type) {
        case types.TOGGLE_TAB:
            return Object.assign({}, profile, {
                active_tab: action.value
            });
        
        default:
            return profile;
    }
}