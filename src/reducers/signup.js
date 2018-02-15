import * as types from '../actions/types.js'

const initialState = {
    step: 1,
    data: {},
    remember_token: ''
}

export default function signup(signup = initialState, action = {}) {
    switch (action.type) {
        case types.CHANGE_STEP:
            return Object.assign({}, signup, {
                step: action.value
            });
        case types.SET_TEMP_TOKEN:
            return Object.assign({}, signup, {
                remember_token: action.value
            });
        default:
            return signup;
    }
}