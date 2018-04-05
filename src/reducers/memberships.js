import * as types from '../actions/types.js'

const initialState = {
    plans: [],
    active_btn: 0,
    packages: [],
    active_package: {}
}

export default function memberships(memberships = initialState, action = {}) {
    switch (action.type) {
        case types.SET_MEMBERSHIPS_DATA:
            return Object.assign({}, memberships, {
                [action.key]: action.value
            });
        default:
            return memberships;
    }
}