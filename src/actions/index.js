import * as types from './types.js'
import api from '../api'
import Cookies from 'js-cookie'

export function login(data) {
    return dispatch => {
        return api.login(data)
        .then(json => {
            if (json.data) {
                dispatch(setToken(json.data))
            }
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

export function setTempToken(value) {
    return {
        type: types.SET_TEMP_TOKEN,
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

export function setAlert(text, level) {
    return {
        type: types.SHOW_ALERT,
        text,
        level
    }
}

export function removeAlert() {
    return {
        type: types.REMOVE_ALERT
    }
}

export function sendSignUpStart(data) {
    return dispatch => {
        return api.signUpStart(data)
        .then(json => {
            if (json.data) {
                dispatch(setTempToken(json.data))
                dispatch(changeStep(1))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function getHeight() {
    return dispatch => {
        return api.getHeight()
            .then(json => {
                if (json.data) {
                    return {
                        type: types.SET_HEIGTHS,
                        
                    }
                    console.log(json.data)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function changeStep(value) {
    return {
        type: types.CHANGE_STEP,
        value
    }
}

export function setPlaceholder(id) {
    return {
        type: types.SET_ID_TEXTFIELD,
        id
    }
}

export function removePlaceholder(id) {
    return {
        type: types.REMOVE_ID_TEXTFIELD,
        id
    }
}