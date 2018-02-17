import * as types from '../actions/types.js'

const initialState = {
    showModal: false,
    step: 2,
    data: { 
        birth: {},
        match: {},
        female_ethnicity: []
    },
    remember_token: '',
    heights: [],
    weights: [],
    eyesColor: [],
    hairColor: [],
    hairLength: [],
    ethnicities: [],
    maritalStatus: [],
    avatar: ''
}

export default function signup(signup = initialState, action = {}) {
    let temp = Object.assign([], signup.data)
    switch (action.type) {
        case types.TOGGLE_MODAL:
            return Object.assign({}, signup, {
                showModal: action.value
            });
        case types.SET_SIGN_UP_DATA:
            return Object.assign({}, signup, {
                data: action.data
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
        case types.SET_ACTIVE_ATHNICITY:
            temp.female_ethnicity.push(action.id)
            return Object.assign({}, signup, {
                data: temp
            });
        case types.REMOVE_ACTIVE_ATHNICITY:
            for (var k in temp.female_ethnicity) {
                if (temp.female_ethnicity[k] === action.id) {
                    temp.female_ethnicity.splice(k, 1)
                }
            }
            return Object.assign({}, signup, {
                data: temp
            });
        case types.SAVE_IMAGE:
            return Object.assign({}, signup, {
                avatar: action.data
            });
        default:
            return signup;
    }
}