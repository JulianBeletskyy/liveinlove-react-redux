import * as types from '../actions/types.js'

const initialState = {
	registration: false,
    login: false,
    recovery: false,
    avatar: false,
    photo_preview: false,
    plans: false,
    credits: false,
    video: false,
    gallery: false,
    support: false,
    testimonials: false,
    message: false,
}

export default function modals(modals = initialState, action = {}) {
    switch (action.type) {
        case types.TOGGLE_MODAL:
            return Object.assign({}, modals, {
                [action.key]: action.value
            });
        default:
            return modals;
    }
}