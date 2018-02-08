import * as config from '../config'

const errorHandler = (errors) => {
    console.log(errors)
}

export default {
    login(data) {
        return fetch(config.API_URL + 'user/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .catch(errorHandler)
    } 
}