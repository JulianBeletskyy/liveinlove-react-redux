import * as types from '../actions/types.js'

const initialState = {
    plans: [],
    active_btn: 0
}

export default function memberships(memberships = initialState, action = {}) {
    switch (action.type) {
        case types.SET_MEMBERSHIPS:
            return Object.assign({}, memberships, {
                plans: action.value
            });
        case types.OPEN_PRICE_BUTTON:
        	return Object.assign({}, memberships, {
                active_btn: action.value
            });
        default:
            return memberships;
    }
}