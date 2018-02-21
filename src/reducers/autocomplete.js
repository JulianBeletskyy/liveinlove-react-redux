import * as types from '../actions/types.js'

const initialState = {
    options: []
}

export default function autocomplete(autocomplete = initialState, action = {}) {
    switch (action.type) {
        case types.REMOVE_ALERT:
            return Object.assign({}, autocomplete, {
                options: []
            });
        default:
            return autocomplete;
    }
}