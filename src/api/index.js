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

        if (response.message && ! response.validate) {
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
        .catch(error => console.log(error))
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
        .catch(error => console.log(error))
    },

    signUpOne(data) {
        return fetch(config.API_URL + 'signup/client/step/one', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(responseHandler)
        .catch(error => console.log(error))
    },

    getHeights() {
        return fetch(config.API_URL + 'height', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
        .catch(error => console.log(error))
    },

    getWeights() {
        return fetch(config.API_URL + 'weight', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
        .catch(error => console.log(error))
    },

    getEyesColor() {
        return fetch(config.API_URL + 'eyes', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
        .catch(error => console.log(error))
    },

    getHairColor() {
        return fetch(config.API_URL + 'hair_colors', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
        .catch(error => console.log(error))
    },

    getHairLength() {
        return fetch(config.API_URL + 'hair_lengths', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
        .catch(error => console.log(error))
    },

    getEthnicities() {
        return fetch(config.API_URL + 'ethnicities', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
        .catch(error => console.log(error))
    },

    getMaritalStatus() {
        return fetch(config.API_URL + 'marital_statuses', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(responseHandler)
        .catch(error => console.log(error))
    }
}