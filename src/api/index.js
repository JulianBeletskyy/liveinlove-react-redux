import * as config from '../config'
import { setAlert, logout } from 'actions'
import store from 'store'
import 'whatwg-fetch'

const responseHandler = (response) => {
    /*if (response.status == 401) {
        store.dispatch(logout())
        return
    }*/
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

    getPublicMembers(type) {
        return fetch(config.API_URL + 'members/' + type, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

     getAllPublicMembers() {
        return fetch(config.API_URL + 'members', {
            method: 'get',
            headers: {
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

    getContactsDetails(token, id) {
        return fetch(config.API_URL + 'client/contacts/' + id, {
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

    getInterestsMembers(token) {
        return fetch(config.API_URL + 'user/members/interest', {
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

    addToInterest(id, token) {
        return fetch(config.API_URL + 'user/members/interest/' + id + '/add', {
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

    removeFromInterest(id, token) {
        return fetch(config.API_URL + 'user/members/interest/' + id + '/remove', {
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
            }
        })
        .then(responseHandler)
    },

    getVideo(token) {
        return fetch(config.API_URL + 'girl/video', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token
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

    buyPackage(data, token) {
        return fetch(config.API_URL + 'client/credits/buy', {
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

    buyProducts(data, token) {
        return fetch(config.API_URL + 'client/shop/buy', {
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

    buyVideo(id, token) {
        return fetch(config.API_URL + 'gallery/video/buy', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({video_id: id})
        })
        .then(responseHandler)
    },

    buyPhoto(id, token) {
        return fetch(config.API_URL + 'gallery/photo/buy', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({photo_id: id})
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

    getMyCountry() {
        return fetch('http://ip-api.com/json', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
            },
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

    signUpOne(data, role) {
        return fetch(config.API_URL + 'signup/' + role + '/step/two', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },

    signUpTwo(data, role) {
        return fetch(config.API_URL + 'signup/' + role + '/step/three', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },


    signUpThree(data, role) {
        let formData = new FormData()
        formData.append('avatar', data.avatar)
        formData.append('height', data.height)
        formData.append('width', data.width)
        formData.append('x', data.x)
        formData.append('y', data.y)
        formData.append('remember_token', data.remember_token)

        return fetch(config.API_URL + 'signup/' + role + '/step/four', {
            method: 'post',
            
            body: formData
        })
        .then(responseHandler)
    },

    signUpFour(data) {
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

    /*signUpTwoGirl(data) {
        return fetch(config.API_URL + 'signup/girl/step/two', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },*/

    /*signUpThree(data) {
        return fetch(config.API_URL + 'signup/last', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    },*/

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

    

    /*signUpTwo(data) {
        let formData = new FormData()
        formData.append('avatar', data.avatar)
        formData.append('height', data.height)
        formData.append('width', data.width)
        formData.append('x', data.x)
        formData.append('y', data.y)
        formData.append('remember_token', data.remember_token)

        return fetch(config.API_URL + 'signup/client/step/two', {
            method: 'post',
            
            body: formData
        })
        .then(responseHandler)
    },*/

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
        const url = token ? 'user/search' : 'search'
        return fetch(config.API_URL + url, {
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
        if (data.attachment) {
            formData.append('attachment', data.attachment)
        }
        formData.append('original', data.original)
        formData.append('receiver_id', data.receiver_id)
        if (data.draft_id) {
            formData.append('draft_id', data.draft_id)
        }
        return fetch(config.API_URL + 'user/message/send', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
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
            },
            body: formData
        })
        .then(responseHandler)
    },

    getMail(url, token) {
        return fetch(config.API_URL + 'user/message/' + url, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
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

    removeDraft(id, token) {
        return fetch(config.API_URL + 'user/message/draft/' + id, {
            method: 'delete',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    saveDraft(data, token, id) {
        let formData = new FormData()
        if (data.attachment) {
            formData.append('attachment', data.attachment)
        }
        formData.append('original', data.original)
        formData.append('receiver_id', data.receiver_id)
        const url = id ? ('user/message/draft/' + id) : 'user/message/draft'

        return fetch(config.API_URL + url, {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            body: formData
        })
        .then(responseHandler)
    },

    getMessages(id, token) {
        let timezone = new Date().getTimezoneOffset()
        timezone = timezone / 60 * -1
        return fetch(config.API_URL + 'user/message/messages/' + id + '?timezone=' + timezone, {
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
    },

    getCategories(token) {
        return fetch(config.API_URL + 'client/shop/category', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    getProducts(id, token) {
        if (id == 0) {
            id = ''
        } else {
            id = '/' + id
        }
        return fetch(config.API_URL + 'client/shop/product/category' + id, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    getProduct(id, token) {
        return fetch(config.API_URL + 'client/shop/product/' + id, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    getBlogs(page) {
        page = page || ''
        return fetch(config.API_URL + 'blog' + page, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    getPopularBlogs() {
        return fetch(config.API_URL + 'blog/popular', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    getBlog(id) {
        let timezone = new Date().getTimezoneOffset()
        timezone = timezone / 60 * -1
        return fetch(config.API_URL + 'blog/' + id + '?timezone=' + timezone, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    addViewBlog(id) {
        return fetch(config.API_URL + 'blog/' + id + '/view', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    getStories() {
        return fetch(config.API_URL + 'stories', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    getStory(id) {
        return fetch(config.API_URL + 'stories/' + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
    },

    sendRequest(data) {
        let formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('subject', data.subject)
        formData.append('message', data.message)
        formData.append('file', data.file)
        
        return fetch(config.API_URL + 'support', {
            method: 'post',
            body: formData
        })
        .then(responseHandler)
    },

    sendComment(data) {
        return fetch(config.API_URL + 'comments/create', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
    }
}