import { setAlert } from 'actions'
import store from 'store'

export default class Validator {
    static check(value, rules = [], name) {
        let error = 1;
        for (var k in rules) {
            if (error) {
                error *= this[rules[k]](value, name)
            }
        }
        return error
    }

    static showAlert(text, level) {
        store.dispatch(setAlert(text, level))
    }

    static required(value, name) {
        if (value === undefined
            || value === null
            || value === ''
            || typeof value === 'undefined') {
                this.showAlert(name + ' is required', 'error')
                return 0
            }
        return 1
    }

    static email(value, name) {
        if (/\S+@\S+\.\S+/.test(value)) {
            return 1
        }
        this.showAlert(name + ' is incorrect', 'error')
        return 0
    }

    static string(value, name) {
        if (typeof value === 'string') {
            return 1
        }
        this.showAlert(name + ' must be string', 'error')
        return 0;
    }

    static alphabet(value, name) {
        let letters = /^[A-Za-z]+$/
        if (value.match(letters)) {
            return 1
        }
        this.showAlert(name + ' must be alphabet characters only', 'error')
        return 0
    }

    static reqiredArray(value, name) {
        if (! value.length) {
            this.showAlert(name + ' is required', 'error')
            return 0
        }
        return 1
    }

    static checked(value, name) {
        if (!value) {
            this.showAlert('You must agree ' + name, 'error')
            return 0
        }
        return 1
    }

    static integer(value, name) {
        if (!Number.isInteger(Number(value))) {
            this.showAlert(name + ' is incorrect', 'error')
            return 0
        }
        return 1
    }

    static plus(value, name) {
        if (value < 0) {
            this.showAlert(name + ' is incorrect', 'error')
            return 0
        }
        return 1
    }

    static isEmptyObject(object) {
        return !object || Object.keys(object).length === 0;
    }

    static isNoneEmptyObject(object) {
        return !this.isEmptyObject(object);
    }

    static isValidString(value, min = 0, max = 255) {
        return this.isString(value) && value.length >= min && value.length <= max;
    }
    
    static isNumeric(value) {
        return !Number.isNaN(Number(value));
    }
}