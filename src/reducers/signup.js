import * as types from '../actions/types.js'

const initialState = {
    showModal: false,
    step: 0,
    data: {},
    remember_token: '',
    heights: [],
    weights: [],
    eyesColor: [],
    hairColor: [],
    hairLength: [],
    ethnicities: [],
    maritalStatus: []
}

export default function signup(signup = initialState, action = {}) {
    switch (action.type) {
        case types.TOGGLE_MODAL:
            return Object.assign({}, signup, {
                showModal: action.value
            });
        case types.CHANGE_STEP:
            return Object.assign({}, signup, {
                step: action.value
            });
        case types.SET_TEMP_TOKEN:
            return Object.assign({}, signup, {
                remember_token: action.value
            });
        case types.SET_HEIGHTS:
            return Object.assign({}, signup, {
                heights: action.value
            });
        case types.SET_WEIGHTS:
            return Object.assign({}, signup, {
                weights: action.value
            });
        case types.SET_EYES_COLOR:
            return Object.assign({}, signup, {
                eyesColor: action.value
            });
        case types.SET_HAIR_COLOR:
            return Object.assign({}, signup, {
                hairColor: action.value
            });
        case types.SET_HAIR_LENGTH:
            return Object.assign({}, signup, {
                hairLength: action.value
            });
        case types.SET_ETHNICITIES:
            return Object.assign({}, signup, {
                ethnicities: action.value
            });
        case types.SET_MARITAL_STATUS:
            return Object.assign({}, signup, {
                maritalStatus: action.value
            });
        default:
            return signup;
    }
}