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
        drink: () => {store.dispatch(getOptions('drink'))},
        body_style: () => {store.dispatch(getOptions('body_style'))},
        children: () => {store.dispatch(getOptions('children'))},
        smoke: () => {store.dispatch(getOptions('smoke'))},
        want_children: () => {store.dispatch(getOptions('want_children'))},
        eye_wear: () => {store.dispatch(getOptions('eye_wear'))},
        living_situation: () => {store.dispatch(getOptions('living_situation'))},
        field_of_work: () => {store.dispatch(getOptions('field_of_work'))},
        employment_status: () => {store.dispatch(getOptions('employment_status'))},
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