import * as types from './types.js'
import api from '../api'
import Cookies from 'js-cookie'

export function login(data) {
    return dispatch => {
        return api.login(data)
        .then(json => {
            dispatch(setToken(json.data))
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function setToken(value) {
    Cookies.set('token', value)
    return {
        type: types.SET_TOKEN,
        value
    }
}

export function logout() {
    Cookies.remove('token')
    return {
        type: types.LOGOUT,
        value: false
    }
}