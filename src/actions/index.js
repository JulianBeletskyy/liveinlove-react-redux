import * as types from './types.js'
import api from '../api'
import Cookies from 'js-cookie'
import { history } from 'store'

// AUTH

export function login(data) {
    return dispatch => {
        return api.login(data)
        .then(json => {
            if (json.data) {
                dispatch(toggleModal(false, 'login'))
                dispatch(getUserInfo(json.data))
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

export function logout() {
    Cookies.remove('token')
    history.push('/')
    return {
        type: types.LOGOUT,
        value: false
    }
}

export function activateUser(hash) {
    return dispatch => {
        return api.activateUser(hash)
        .then(json => {
            if (json.data) {
                dispatch(setToken(json.data))
                dispatch(getFullInfo(json.data))
                history.push('/')
            }
            
        })
        .catch(error => {
            console.log(error)
        })
    }
}

//PASSWORD

export function changePassword(data, token) {
    return dispatch => {
        return api.changePassword(data, token)
        .then(json => {
            if (json.data) {
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

export function setRecoveryHash(hash) {
    return {
        type: types.SET_RECOVERY_HASH,
        hash
    }
}

//REGISTRATION

export function setTempToken(value) {
    return {
        type: types.SET_TEMP_TOKEN,
        value
    }
}

export function toggleRegistration(value) {
    return {
        type: types.TOGGLE_REGISTRATION,
        value
    }
}

export function setSegment(first, second, third) {
    return {
        type: types.SET_SEGMENT,
        first,
        second,
        third
    }
}

export function setEmptyData() {
    return {
        type: types.SET_EMPTY_DATA
    }
}

export function setEmptySignUpData() {
    return {
        type: types.SET_EMPTY_SIGNUP_DATA
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

export function setSignUpData(data) {
    return {
        type: types.SET_SIGN_UP_DATA,
        data
    }
}

export function changeStep(value) {
    return {
        type: types.CHANGE_STEP,
        value
    }
}

export function saveImage(data) {
    return {
        type: types.SAVE_IMAGE,
        data
    }
}

export function saveFile(value) {
    return {
        type: types.SAVE_FILE,
        value
    }
}

//USER INFO

export function getFullInfo(token) {
    return dispatch => {
        return api.getFullInfo(token)
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

export function getUserInfo(token) {
    return dispatch => {
        return api.getUserInfo(token)
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

export function updateUserProfile(data, token) {
    return dispatch => {
        return api.updateUserProfile(data, token)
        .then(json => {
            if (json.data) {
                console.log(json.data)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function setClientInfo(data) {
    return {
        type: types.SET_CLIENT_DATA,
        data
    }
}

export function updateAvatar(data, token) {
    return dispatch => {
        return api.updateAvatar(data, token)
        .then(json => {
            if (json.data) {
                dispatch(getUserInfo(token))
                dispatch(toggleModal(false, 'avatar'))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

// MEMBERS

export function getMembers(token) {
    return dispatch => {
        return api.getMembers(token)
        .then(json => {
            if (json.data) {
                dispatch(setMembers(json.data, 'list'))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function getNewMembers(token) {
    return dispatch => {
        return api.getNewMembers(token)
        .then(json => {
            if (json.data) {
                dispatch(setMembers(json.data, 'new_list'))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function getPopularMembers(token) {
    return dispatch => {
        return api.getPopularMembers(token)
        .then(json => {
            if (json.data) {
                dispatch(setMembers(json.data, 'popular_list'))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function getFavoriteMembers(token) {
    return dispatch => {
        return api.getFavoriteMembers(token)
        .then(json => {
            if (json.data) {
                dispatch(setMembers(json.data, 'favorite_list'))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function getMemberInfo(token, id) {
    return dispatch => {
        return api.getMemberInfo(token, id)
        .then(json => {
            if (json.data) {
                dispatch(setMemberInfo(json.data))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function toggleLightBox(value) {
    return {
        type: types.TOGGLE_LIGHT_BOX,
        value
    }
}

export function setMemberInfo(data) {
    return {
        type: types.SET_MEMBER_INFO,
        data
    }
}

export function setMembers(data, key) {
    return {
        type: types.SET_MEMBERS,
        data,
        key
    }
}

export function addToFavorite(id, token) {
    return dispatch => {
        return api.addToFavorite(id, token)
        .then(json => {
            if (json.data) {
                dispatch(setFavorite(id, true))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function removeFromFavorite(id, token) {
    return dispatch => {
        return api.removeFromFavorite(id, token)
        .then(json => {
            if (json.data) {
                dispatch(setFavorite(id, false))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function addViewed(id, token) {
    return dispatch => {
        return api.addViewed(id, token)
        .then(json => {
            if (json.data) {
                //dispatch(setMemberInfo(json.data))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function setFavorite(id, value) {    
    return {
        type: types.SET_FAVORITE,
        id,
        value
    }
}

//GALLERY

export function getGallery(token) {
    return dispatch => {
        return api.getGallery(token)
        .then(json => {
            if (json.data) {
                dispatch(setImages(json.data))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function addToGallery(value, token) {
    return dispatch => {
        return api.addToGallery(value, token)
        .then(json => {
            if (json.data) {
                dispatch(getGallery(token))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function removePhotos(value, token) {
    return dispatch => {
        return api.removePhotos(value, token)
        .then(json => {
            if (json.data) {
                dispatch(getGallery(token))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function setGallery(value) {
    return {
        type: types.SET_GALLERY,
        value
    }
}

export function setImages(value) {
    return {
        type: types.SET_IMAGES,
        value
    }
}

export function setSelected(value) {    
    return {
        type: types.SET_SELECTED,
        value
    }
}

//MEMBERSHIP

export function getMemberships() {
    return dispatch => {
        return api.getMemberships()
        .then(json => {
            if (json.data) {
                dispatch(setMemberships(json.data))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function setPlan(plan_id, month_id, token) {
    return dispatch => {
        return api.setPlan(plan_id, month_id, token)
        .then(json => {
            if (json.data) {
                dispatch(getUserInfo(token))
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export function setMemberships(value) {
    return {
        type: types.SET_MEMBERSHIPS,
        value
    }
}

export function openPriceBtn(value) {
    return {
        type: types.OPEN_PRICE_BUTTON,
        value
    }
}

//ALERT

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

//OPTIONS

export function getOptions(type) {
    return dispatch => {
        return api.getOptions(type)
            .then(json => {
                if (json.data) {
                    dispatch(setOptions(json.data, type))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function setOptions(value, option) {
    return {
        type: types.SET_OPTIONS_DATA,
        value,
        option
    }
}

//OTHER

export function addCredits(value) {
    return {
        type: types.ADD_CREDITS,
        value
    }
}

export function toggleTab(value) {
    return {
        type: types.TOGGLE_TAB,
        value
    }
}

export function setCountry(value) {
    return {
        type: types.SET_COUNTRY,
        value
    }
}

export function setActiveTab(value, key) {
    return {
        type: types.SET_ACTIVE_TAB,
        value,
        key
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

export function setActiveBlock(id, key, data) {
    return {
        type: types['SET_ACTIVE_BLOCK_' + data.toUpperCase()],
        id,
        key
    }
}

export function removeActiveBlock(id, key, data) {
    return {
        type: types['REMOVE_ACTIVE_BLOCK_' + data.toUpperCase()],
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