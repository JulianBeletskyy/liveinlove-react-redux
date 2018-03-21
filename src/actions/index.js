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
    }
}

// MEMBERS

export function getMembers(token) {
    return dispatch => {
        return api.getMembers(token)
        .then(json => {
            if (json.data) {
                dispatch(setMembers(json.data, 'list'))
                dispatch(setMembers(json.data, 'search_list'))
                dispatch(setPages(json))
            }
        })
    }
}

export function getMoreMembers(link, token) {
    return dispatch => {
        return api.getMoreMembers(link, token)
        .then(json => {
            if (json.data) {
                dispatch(setPages(json))
                dispatch(addMembers(json.data))
            }
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
    }
}

export function setPages(value) {
    return {
        type: types.SET_PAGES,
        value
    }
}

export function addMembers(value) {
    return {
        type: types.ADD_MEMBERS,
        value
    }
}

export function toggleLightBox(value, key) {
    return {
        type: types.TOGGLE_LIGHT_BOX,
        value,
        key
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
    }
}

export function removeFromFavorite(id, token) {
    return dispatch => {
        return api.removeFromFavorite(id, token)
        .then(json => {
            if (json.data) {
                dispatch(setFavorite(id, false))
                dispatch(getFavoriteMembers(token))
            }
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
    }
}

export function getVideo(token) {
    return dispatch => {
        return api.getVideo(token)
        .then(json => {
            if (json.data) {
                dispatch(setVideo(json.data))
            }
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
    }
}

export function toggleActive(data, url, token) {
    return dispatch => {
        return api.toggleActive(data, url, token)
        .then(json => {
            if (json.data) {
                dispatch(getGallery(token))
            }
        })
    }
}

export function togglePrivate(data, url, token) {
    return dispatch => {
        return api.togglePrivate(data, url, token)
        .then(json => {
            if (json.data) {
                dispatch(getGallery(token))
            }
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

export function setVideo(value) {
    return {
        type: types.SET_VIDEO,
        value
    }
}

export function setSelected(value) {    
    return {
        type: types.SET_SELECTED,
        value
    }
}

export function gotoPrevImg() {    
    return {
        type: types.PREV_IMG
    }
}

export function gotoNextImg() {    
    return {
        type: types.NEXT_IMG
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
    }
}

export function getPackages(token) {
    return dispatch => {
        return api.getPackages(token)
        .then(json => {
            if (json.data) {
                dispatch(setPackages(json.data))
            }
        })
    }
}

export function setMemberships(value) {
    return {
        type: types.SET_MEMBERSHIPS,
        value
    }
}

export function setActivePackage(value) {
    return {
        type: types.SET_ACTIVE_PACKAGE,
        value
    }
}

export function setPackages(value) {
    return {
        type: types.SET_PACKAGES,
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

//SEARCH

export function getSearchProfileId(profile_id, token) {
    return dispatch => {
        return api.getSearchProfileId(profile_id, token)
            .then(json => {
                if (json.data) {
                    dispatch(setMembers([json.data], 'search_list'))
                }
            })
    }
}

export function getSearch(data, token) {
    return dispatch => {
        return api.getSearch(data, token)
            .then(json => {
                if (json.data) {
                    dispatch(setMembers(json.data, 'search_list'))
                }
            })
    }
}

//MESSAGE

export function getDialogs(token) {
    return dispatch => {
        return api.getDialogs(token)
            .then(json => {
                if (json.data) {
                    dispatch(setDialogsList(json.data))
                }
            })
    }
}

export function getMessages(id, token) {
    return dispatch => {
        return api.getMessages(id, token)
            .then(json => {
                if (json.data) {
                    dispatch(setMessages(json.data, id))
                }
            })
    }
}

export function getContacts(token) {
    return dispatch => {
        return api.getContacts(token)
            .then(json => {
                if (json.data) {
                    console.log(json.data)
                    //dispatch(setContacts(json.data))
                }
            })
    }
}

export function setMessages(value, id) {
    return {
        type: types.SET_MESSAGES,
        value,
        id
    }
}

export function setContacts(value) {
    return {
        type: types.SET_CONTACTS,
        value
    }
}

export function setReceiver(id, avatar) {
    return {
        type: types.SET_RECEIVER,
        id,
        avatar
    }
}

export function setDialogsList(value) {
    return {
        type: types.SET_DIALOGS_LIST,
        value,
    }
}

export function sendMessage(id, message, token) {
    return dispatch => {
        return api.sendMessage(id, message, token)
            .then(json => {
                if (json.data) {
                    
                }
            })
    }
}

export function sendMessageByDialog(id, message, token) {
    return dispatch => {
        return api.sendMessageByDialog(id, message, token)
            .then(json => {
                if (json.data) {
                    dispatch(getMessages(id, token))
                }
            })
    }
}

//SHOP

export function getCtegories() {
    return dispatch => {
        return api.getCtegories()
            .then(json => {
                if (json.data) {
                    dispatch(setCategories(json.data))
                    dispatch(setActiveCategory(json.data[0].id))
                    dispatch(getProducts(json.data[0].id))
                }
            })
    }
}

export function getProducts(id) {
    return dispatch => {
        return api.getProducts(id)
            .then(json => {
                if (json.data) {
                    dispatch(setProducts(json.data))
                }
            })
    }
}

export function setCategories(value) {
    return {
        type: types.SET_CATEGORIES,
        value
    }
}

export function setProducts(value) {
    return {
        type: types.SET_PRODUCTS,
        value
    }
}

export function setActiveCategory(value) {
    return {
        type: types.SET_ACTIVE_CATEGORY,
        value
    }
}

export function setCart(value) {
    return {
        type: types.SET_CART,
        value
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

export function setUpload() {
    return {
        type: types.SET_UPLOAD
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