import * as types from '../actions/types.js'

const initialState = {
    showModal: false,
    step: 0,
    data: { 
        first_name: '',
        last_name: '',
        role: 'client',
        country: '',
        city: '',
        email: '',
        password: '',
        terms: false,
        birth: {},
        match: {},
        height_id: '',
        weight_id: '',
        eyes_id: '',
        hair_color_id: '',
        hair_length_id: '',
        ethnicity_id: '',
        marital_status_id: '',
        children: '',
        female_ethnicity: [],
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
        mobile: ''
    },
    remember_token: '',
    height: [],
    weight: [],
    eyes: [],
    hair_colors: [],
    hair_lengths: [],
    ethnicities: [],
    marital_statuses: [],
    interests: [],
    religions: [],
    want_children: [],
    education: [],
    drink: [],
    smoke: [],
    primary_language: [],
    language_level: [],
    avatar: '',
    file: new FormData()
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
        case types.SET_OPTIONS_SIGN_UP:
            return Object.assign({}, signup, {
                [action.option]: action.value
            });
        case types.SAVE_FILE:
            return Object.assign({}, signup, {
                file: action.value
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
        case types.SET_INTERESTS:
            return Object.assign({}, signup, {
                interests: action.value
            });
        case types.SET_RELIGIONS:
            return Object.assign({}, signup, {
                religions: action.value
            });
        case types.SET_WANT_CHILDREN:
            return Object.assign({}, signup, {
                want_children: action.value
            });
        case types.SET_ACTIVE_BLOCK:
            temp[action.key].push(action.id)
            return Object.assign({}, signup, {
                data: temp
            });
        case types.REMOVE_ACTIVE_BLOCK:
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