import * as types from './types.js'
import api from '../api'
import Cookies from 'js-cookie'
import { history } from 'store'

export function login(data) {
    return dispatch => {
        return api.login(data)
        .then(json => {
            if (json.data) {
                dispatch(toggleModal(false, 'login'))
                dispatch(getClientInfo(json.data))
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

export function getClientInfo(token) {
    return dispatch => {
        return api.getClientInfo(token)
        .then(json => {
            if (json.data) {
                dispatch(setClientInfo(json.data))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function getCountries() {
    return dispatch => {
        return api.getCountries()
        .then(json => {
            if (json.data) {
                dispatch(setCountries(json.data.country))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function sendRecovery(data) {
    return dispatch => {
        return api.sendRecovery(data)
        .then(json => {
            if (json.data) {
                dispatch(toggleModal(false, 'recovery'))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function updatePassword(data, hash) {
    return dispatch => {
        return api.updatePassword(data, hash)
        .then(json => {
            if (json.data) {
                dispatch(toggleModal(false, 'recovery'))
                dispatch(setRecoveryHash(''))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function activateUser(hash) {
    return dispatch => {
        return api.activateUser(hash)
        .then(json => {
            if (json.data) {
                dispatch(setToken(json.data))
                dispatch(getClientInfo(json.data))
                history.push('/')
            }
            
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function sendSignUpStart(data) {
    return dispatch => {
        return api.signUpStart(data)
        .then(json => {
            if (json.data) {
                dispatch(setTempToken(json.data))
                dispatch(setSignUpData(data))
                dispatch(setSendEmail(data.email))
                dispatch(changeStep(1))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function sendSignUpOne(data) {
    return dispatch => {
        return api.signUpOne(data)
            .then(json => {
                if (json.data) {
                    dispatch(setSignUpData(data))
                    const step = data.route === 'client' ? 2 : 5
                    dispatch(changeStep(step))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function sendSignUpTwo(data, step) {
    return dispatch => {
        return api.signUpTwo(data)
            .then(json => {
                if (json.data) {
                    dispatch(changeStep(step))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function sendSignUpTwoGirl(data) {
    return dispatch => {
        return api.signUpTwoGirl(data)
            .then(json => {
                if (json.data) {
                    dispatch(setSignUpData(data))
                    dispatch(changeStep(2))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function sendSignUpThree(data) {
    return dispatch => {
        return api.signUpThree(data)
            .then(json => {
                if (json.data) {
                    dispatch(sendSignUpFinish({
                        'remember_token': json.data,
                        'url': window.location.href + 'activate/{hash}'
                    }))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function sendSignUpThreeGirl(data) {
    return dispatch => {
        return api.signUpThreeGirl(data)
            .then(json => {
                if (json.data) {
                    dispatch(setSignUpData(data))
                    dispatch(changeStep(3))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function sendSignUpFinish(data) {
    return dispatch => {
        return api.signUpFinish(data)
            .then(json => {
                if (json.data) {
                    dispatch(setEmptySignUpData())
                    const emptyImage = ''
                    const emptyFile = new FormData()
                    dispatch(saveImage(emptyImage))
                    dispatch(saveFile(emptyFile))
                    dispatch(changeStep(4))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function setSendEmail(value) {
    return {
        type: types.SET_SEND_EMAIL,
        value
    }
}

export function setEmptySignUpData() {
    return {
        type: types.SET_EMPTY_SIGNUP_DATA
    }
}

export function setEmptyData() {
    return {
        type: types.SET_EMPTY_DATA
    }
}

export function setClientInfo(data) {
    return {
        type: types.SET_CLIENT_DATA,
        data
    }
}

export function setRecoveryHash(hash) {
    return {
        type: types.SET_RECOVERY_HASH,
        hash
    }
}

export function setCountries(data) {
    return {
        type: types.SET_COUNTRIES,
        data
    }
}

export function saveImage(data) {
    return {
        type: types.SAVE_IMAGE,
        data
    }
}

export function setSignUpData(data) {
    return {
        type: types.SET_SIGN_UP_DATA,
        data
    }
}

export function getOptionsSignUp(type) {
    return dispatch => {
        return api.getOptionsSignUp(type)
            .then(json => {
                if (json.data) {
                    dispatch(setOptionsSignUp(json.data, type))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function setOptionsSignUp(value, option) {
    return {
        type: types.SET_OPTIONS_SIGN_UP,
        value,
        option
    }
}

export function setCountry(value) {
    return {
        type: types.SET_COUNTRY,
        value
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

export function setActiveBlock(id, key) {
    return {
        type: types.SET_ACTIVE_BLOCK,
        id,
        key
    }
}

export function removeActiveBlock(id, key) {
    return {
        type: types.REMOVE_ACTIVE_BLOCK,
        id,
        key
    }
}

export function toggleModal(value, key) {
    return {
        type: types.TOGGLE_MODAL,
        value,
        key
    }
}

export function toggleTextarea(value) {
    return {
        type: types.TOGGLE_TEXTAREA,
        value
    }
}

export function saveFile(value) {
    return {
        type: types.SAVE_FILE,
        value
    }
}