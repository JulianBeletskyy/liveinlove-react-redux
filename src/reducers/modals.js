import * as types from '../actions/types.js'
import Cookies from 'js-cookie'

const initialState = {
    registration: false
}

export default function modals(modals = initialState, action = {}) {
    switch (action.type) {
        case types.TOGGLE_REGISTRATION:
            return Object.assign({}, modals, {
                registration: action.value
            });
        
        default:
            return modals;
    }
}