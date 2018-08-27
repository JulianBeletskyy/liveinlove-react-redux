import store from 'store'
import { logout } from 'actions'
import Cookies from 'js-cookie'
import * as config from '../config'

export default class Services {

	static responseHandler(response) {
	    return response
	}

	static checkAuth() {
		setTimeout(() => {
			let check = this.goAuth(Cookies.get('token'))
			check.then((res) => {
				if (res) {
					if (! res.redirected) {
						setTimeout(() => {
							this.checkAuth()
							return
						}, 5000)
					} else {
						store.dispatch(logout())
					}
				}
			}).catch((error) => {
				store.dispatch(logout())
			})
        }, 0)
	}

	static goAuth(token) {
        return fetch(config.API_URL + 'login/check', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(this.responseHandler)
    }
}