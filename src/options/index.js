import store from 'store'
import { getOptions } from 'actions'

export default class Options {
	static getFunc = {
        height: () => {store.dispatch(getOptions('height'))},
        weight: () => {store.dispatch(getOptions('weight'))},
        eyes: () => {store.dispatch(getOptions('eyes'))},
        hair_colors: () => {store.dispatch(getOptions('hair_colors'))},
        hair_lengths: () => {store.dispatch(getOptions('hair_lengths'))},
        ethnicities: () => {store.dispatch(getOptions('ethnicities'))},
        marital_statuses: () => {store.dispatch(getOptions('marital_statuses'))},
        countries: () => {store.dispatch(getOptions('countries'))},
        interests: () => {store.dispatch(getOptions('interests'))},
        religions: () => {store.dispatch(getOptions('religions'))},
        education: () => {store.dispatch(getOptions('education'))},
        smoke: () => {store.dispatch(getOptions('smoke'))},
        primary_language: () => {store.dispatch(getOptions('primary_language'))},
        language_level: () => {store.dispatch(getOptions('language_level'))},
        drink: () => {store.dispatch(getOptions('drink'))}
    }

	static getAll() {
		for (let k in this.getFunc) {
            this.getFunc[k]()
        }
	}

	static get(func) {
		if (this.getFunc[func]) {
			this.getFunc[func]()
		}
	}
}