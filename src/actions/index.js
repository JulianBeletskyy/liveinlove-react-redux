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
                dispatch(setSignUpData(data))
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
                    dispatch(changeStep(2))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function sendSignUpTwo(data) {
    return dispatch => {
        return api.signUpTwo(data)
            .then(json => {
                if (json.data) {
                    console.log(json.data)
                    dispatch(changeStep(3))
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
                    dispatch(sendSignUpFinish({'remember_token': json.data}))
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
                    console.log(json.data)
                    dispatch(changeStep(4))
                }
            })
            .catch(error => {
                console.log(error)
            })
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

export function getHeights() {
    return dispatch => {
        return api.getHeights()
            .then(json => {
                if (json.data) {
                    dispatch(setHeights(json.data))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function getWeights() {
    return dispatch => {
        return api.getWeights()
            .then(json => {
                if (json.data) {
                    dispatch(setWeights(json.data))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function getEyesColor() {
    return dispatch => {
        return api.getEyesColor()
            .then(json => {
                if (json.data) {
                    dispatch(setEyesColor(json.data))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function getHairColor() {
    return dispatch => {
        return api.getHairColor()
            .then(json => {
                if (json.data) {
                    dispatch(setHairColor(json.data))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function getHairLength() {
    return dispatch => {
        return api.getHairLength()
            .then(json => {
                if (json.data) {
                    dispatch(setHairLength(json.data))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function getEthnicities() {
    return dispatch => {
        return api.getEthnicities()
            .then(json => {
                if (json.data) {
                    dispatch(setEthnicities(json.data))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function getMaritalStatus() {
    return dispatch => {
        return api.getMaritalStatus()
            .then(json => {
                if (json.data) {
                    dispatch(setMaritalStatus(json.data))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function getInterests() {
    return dispatch => {
        return api.getInterests()
            .then(json => {
                if (json.data) {
                    dispatch(setInterests(json.data))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function setHairColor(value) {
    return {
        type: types.SET_HAIR_COLOR,
        value
    }
}

export function setWeights(value) {
    return {
        type: types.SET_WEIGHTS,
        value
    }
}

export function setEyesColor(value) {
    return {
        type: types.SET_EYES_COLOR,
        value
    }
}

export function setHeights(value) {
    return {
        type: types.SET_HEIGHTS,
        value
    }
}

export function setHairLength(value) {
    return {
        type: types.SET_HAIR_LENGTH,
        value
    }
}

export function setEthnicities(value) {
    return {
        type: types.SET_ETHNICITIES,
        value
    }
}

export function setMaritalStatus(value) {
    return {
        type: types.SET_MARITAL_STATUS,
        value
    }
}

export function setInterests(value) {
    return {
        type: types.SET_INTERESTS,
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

export function moveSelectPlaceholder(id) {
    return {
        type: types.MOVE_SELECT_PLACEHOLDER,
        id
    }
}