import * as types from '../actions/types.js'

const initialState = {
    changed: false
}

export default function custom_select(custom_select = initialState, action = {}) {
    switch (action.type) {
        case types.MOVE_SELECT_PLACEHOLDER:
            return Object.assign({}, custom_select, {
                changed: action.value
            });
        default:
            return custom_select;
    }
}