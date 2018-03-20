import * as types from '../actions/types.js'

const initialState = {
    plans: [],
    active_btn: 0,
    packages: [],
    active_package: {}
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
        case types.SET_PACKAGES:
            return Object.assign({}, memberships, {
                packages: action.value
            });
        case types.SET_ACTIVE_PACKAGE:
            return Object.assign({}, memberships, {
                active_package: action.value
            });
        default:
            return memberships;
    }
}