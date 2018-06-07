import * as types from '../actions/types.js'

const initialState = {
    step: 0,
    showRegistration: false,
    empty_data: {},
    data: { 
        first_name: '',
        last_name: '',
        role: 'client',
        country: '',
        city: '',
        email: '',
        password: '',
        terms: true,
        birth: {},
        match: {},
        child: {},
        height_id: '',
        weight_id: '',
        eyes_id: '',
        hair_color_id: '',
        hair_length_id: '',
        ethnicity_id: '',
        marital_status_id: '',
        children: '',
        find_ethnicity: [],
        interest: [],
        religion_id: '',
        want_children_id: '',
        education_id: '',
        smoke_id: '',
        drink_id: '',
        profession: '',
        occupation: '',
        primary_language_id: '',
        english_language_id: '',
        russian_language_id: '',
        about_children: '',
        mobile: '',
        facebook: '',
        vk: '',
        other_social: '',
        languages: []
    },
    send_email: '',
    remember_token: '',
    avatar: '',
    file: new FormData(),
    country: ''
}

export default function signup(signup = initialState, action = {}) {
    let temp = Object.assign([], signup.data)
    switch (action.type) {
        case types.SET_SIGN_UP_DATA:
            for (let k in temp) {
                if (action.data[k]) {
                    temp[k] = action.data[k]
                }
            }
            return Object.assign({}, signup, {
                data: temp
            });
        case types.SET_EMPTY_DATA:
            return Object.assign({}, signup, {
                empty_data: temp
            });
        case types.SET_SEND_EMAIL:
            return Object.assign({}, signup, {
                send_email: action.value
            });
        case types.SET_EMPTY_SIGNUP_DATA:
            console.log(signup.empty_data)
            return Object.assign({}, signup, {
                data: Object.assign({}, signup.empty_data, {})
            });
        case types.SAVE_FILE:
            return Object.assign({}, signup, {
                file: action.value
            });
        case types.TOGGLE_REGISTRATION:
            return Object.assign({}, signup, {
                showRegistration: action.value
            });
        case types.CHANGE_STEP:
            return Object.assign({}, signup, {
                step: action.value
            });
        case types.SET_COUNTRY:
            return Object.assign({}, signup, {
                country: action.value
            });
        case types.SET_TEMP_TOKEN:
            return Object.assign({}, signup, {
                remember_token: action.value
            });
        case types.SET_ACTIVE_BLOCK_SIGNUP:
            temp[action.key].push(action.id)
            return Object.assign({}, signup, {
                data: temp
            });
        case types.REMOVE_ACTIVE_BLOCK_SIGNUP:
            for (var k in temp[action.key]) {
                if (temp[action.key][k] === action.id) {
                    temp[action.key].splice(k, 1)
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