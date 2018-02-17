import * as types from '../actions/types.js'

const initialState = {
    changed: false
}

export default function textarea(textarea = initialState, action = {}) {
    switch (action.type) {
        case types.TOGGLE_TEXTAREA:
            return Object.assign({}, textarea, {
                changed: action.value
            });
        default:
            return textarea;
    }
}