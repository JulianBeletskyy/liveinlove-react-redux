import * as config from '../config'
import { setAlert } from 'actions'
import store from 'store'
import 'whatwg-fetch'

const responseHandler = (response) => {
    let promise = response.json()
    let ok = response.ok
    
    promise.then(response => {
        if (response.validate) {
            for (let k in response.validate) {
                for (let j in response.validate[k]) {
                    store.dispatch(setAlert(response.validate[k][j], 'error'))
                }
            }
        }

        if (response.message && (! response.validate || response.validate == null)) {
            store.dispatch(setAlert(response.message, ok ? 'success' : 'error'))
        }

        if (response.errors) {
            for (let k in response.errors) {
                for (let j in response.errors[k]) {
                    store.dispatch(setAlert(response.errors[k][j], 'error'))
                }
            }
        }
    })
    return promise;
}

export default {
    login(data) {
        return fetch(config.API_URL + 'login', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },

    getFullInfo(token) {
        return fetch(config.API_URL + 'user/profile', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(responseHandler)
    },

    getUserInfo(token) {
        return fetch(config.API_URL + 'user', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(responseHandler)
    },

    getMembers(token) {
        return fetch(config.API_URL + 'user/members', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    getMemberInfo(token, id) {
        return fetch(config.API_URL + 'user/member/' + id, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    getNewMembers(token) {
        return fetch(config.API_URL + 'user/members/new', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    getMoreMembers(link, token) {
        console.log(link)
        return fetch(link, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    getPopularMembers(token) {
        return fetch(config.API_URL + 'user/members/popular', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    getFavoriteMembers(token) {
        return fetch(config.API_URL + 'user/members/favorite', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    addToFavorite(id, token) {
        return fetch(config.API_URL + 'user/members/favorite/' + id + '/add', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(responseHandler)
    },

    removeFromFavorite(id, token) {
        return fetch(config.API_URL + 'user/members/favorite/' + id + '/remove', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(responseHandler)
    },

    addViewed(id, token) {
        return fetch(config.API_URL + 'user/view/' + id, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(responseHandler)
    },

    setPlan(plan_id, value_id, token) {
        const data = {
            membership_id: plan_id,
            value_id: value_id
        }
        return fetch(config.API_URL + 'client/membership/update', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },

    getGallery(token) {
        return fetch(config.API_URL + 'gallery', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token
                //'Accept': 'application/json',
                //'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    getVideo(token) {
        return fetch(config.API_URL + 'girl/video', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token
                //'Accept': 'application/json',
                //'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    getMemberships() {
        return fetch(config.API_URL + 'memberships/active', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    getPackages() {
        return fetch(config.API_URL + 'credits/active', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    updateUserProfile(data, token) {
        return fetch(config.API_URL + 'user/profile', {
            method: 'put',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },

    activateUser(hash) {
        return fetch(config.API_URL + 'activate/' + hash, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    sendRecovery(data) {
        return fetch(config.API_URL + 'recovery', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },

    updatePassword(data, hash) {
        return fetch(config.API_URL + 'password/' + hash, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },

    changePassword(data, token) {
        return fetch(config.API_URL + 'password/update', {
            method: 'put',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },

    signUpStart(data) {
        return fetch(config.API_URL + 'signup/start', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },

    signUpOne(data) {
        return fetch(config.API_URL + 'signup/' + data.route + '/step/one', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },

    signUpTwo(data) {
        let formData = new FormData()
        formData.append('avatar', data.avatar)
        formData.append('height', data.height)
        formData.append('width', data.width)
        formData.append('x', data.x)
        formData.append('y', data.y)
        formData.append('remember_token', data.remember_token)

        return fetch(config.API_URL + 'signup/client/step/two', {
            method: 'post',
            /*headers: {
                //'Content-Type': 'multipart/form-data'
            },*/
            body: formData
        })
        .then(responseHandler)
    },

    addToGallery(data, token) {
        let formData = new FormData()
        formData.append('image', data)

        return fetch(config.API_URL + 'gallery/add', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            body: formData
        })
        .then(responseHandler)
    },

    updateAvatar(data, token) {
        return fetch(config.API_URL + 'gallery/avatar', {
            method: 'put',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },

    removePhotos(data, token) {
        return fetch(config.API_URL + 'gallery/remove', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },

    toggleActive(data, url, token) {
        return fetch(config.API_URL + 'gallery/' + url, {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },

    togglePrivate(data, url, token) {
        return fetch(config.API_URL + 'gallery/' + url, {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },

    signUpTwoGirl(data) {
        return fetch(config.API_URL + 'signup/girl/step/two', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },

    signUpThree(data) {
        return fetch(config.API_URL + 'signup/last', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },

    signUpThreeGirl(data) {
        return fetch(config.API_URL + 'signup/girl/step/four', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },

    signUpFinish(data) {
        return fetch(config.API_URL + 'signup/finish', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },

    getOptions(type) {
        return fetch(config.API_URL + type, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    getSearchProfileId(profile_id, token) {
        return fetch(config.API_URL + 'user/search/' + profile_id, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    getSearch(data, token) {
        return fetch(config.API_URL + 'user/search', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },

    sendMessage(data, token) {
        let formData = new FormData()
        formData.append('attachment', data.attachment)
        formData.append('original', data.original)
        formData.append('receiver_id', data.receiver_id)
        return fetch(config.API_URL + 'user/message/send', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
                //'Accept': 'application/json',
                //'Content-Type': 'application/json'
            },
            body: formData
        })
        .then(responseHandler)
    },

    sendMessageByDialog(data, token) {
        let formData = new FormData()
        formData.append('attachment', data.attachment)
        formData.append('original', data.original)
        formData.append('dialog_id', data.dialog_id)
        return fetch(config.API_URL + 'user/message/dialog/send', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
                //'Accept': 'application/json',
                //'Content-Type': 'application/json'
            },
            body: formData
        })
        .then(responseHandler)
    },

    getDialogs(token) {
        return fetch(config.API_URL + 'user/message/dialogs', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    getMessages(id, token) {
        return fetch(config.API_URL + 'user/message/messages/' + id, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    showAttach(id, token) {
        return fetch(config.API_URL + 'user/message/attachment/see', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message_id: id})
        })
        .then(responseHandler)
    },


    getContacts(token) {
        return fetch(config.API_URL + 'user/message/contacts', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    }
}