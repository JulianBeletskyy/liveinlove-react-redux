import * as types from '../actions/types.js'
import Cookies from 'js-cookie'

const initialState = {
    token: Cookies.get('token'),
    recovery_hash: '',
    data: {
        role: 'client',
        profile_id: '',
        zodiac: '',
        weight: {},
        want_children: '',
        smoke: '',
        russian_language: '',
        religion: '',
        profession: '',
        primary_language: '',
        occupation: '',
        mobile: '',
        message: '',
        marital_status: {},
        last_name: '',
        first_name: '',
        interests: [],
        interests_value: [],
        id: '',
        height: {},
        hair_length: {},
        hair_color: {},
        female_ethnicity: [],
        female_ethnicity_value: [],
        eyes: {},
        ethnicity: {},
        english_language: '',
        email: '',
        education: '',
        drink: '',
        country: '',
        city: '',
        children: {},
        age: '',
        birthday: {},
        about_children: '',
        match: {},
        avatar: {},
        education_id: '',
        profession: '',
        occupation: '',
        smoke_id: '',
        primary_language_id: '',
        english_language_id: '',
        russian_language_id: '',
        drink_id: '',
        want_children: '',
        credits: 0,
        view_profile: 0,
        membership: {
            id: 'basic',
            name: 'Basic'
        }
    },
    countries: []
}

export default function user(user = initialState, action = {}) {
    let temp = Object.assign([], user.data)
    switch (action.type) {
        case types.SET_TOKEN:
            return Object.assign({}, user, {
                token: action.value
            });
        case types.LOGOUT:
            return Object.assign({}, user, {
                token: action.value
            });
        case types.ADD_CREDITS:
            temp.credits += action.value * 1
            return Object.assign({}, user, {
                data: temp
            });
        case types.SET_RECOVERY_HASH:
            return Object.assign({}, user, {
                recovery_hash: action.hash
            });
        case types.SET_CLIENT_DATA:
            for (let k in temp) {
                if (action.data[k]) {
                    temp[k] = action.data[k]
                }
            }
            return Object.assign({}, user, {
                data: temp
            });
        case types.SET_ACTIVE_BLOCK_USER:
            temp[action.key].push(action.id)
            return Object.assign({}, user, {
                data: temp
            });
        case types.REMOVE_ACTIVE_BLOCK_USER:
            for (var k in temp[action.key]) {
                if (temp[action.key][k] === action.id) {
                    temp[action.key].splice(k, 1)
                }
            }
            return Object.assign({}, user, {
                data: temp
            });
        default:
            return user;
    }
}