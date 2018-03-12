import { SET_OPTIONS_DATA } from 'actions/types.js'

const initialState = {
    height: [],
    weight: [],
    eyes: [],
    hair_colors: [],
    hair_lengths: [],
    ethnicities: [],
    marital_statuses: [],
    interests: [],
    religions: [],
    //want_children: [],
    education: [],
    drink: [],
    smoke: [],
    primary_language: [],
    language_level: [],
    countries: []
}

export default function options(options = initialState, action = {}) {
    switch (action.type) {
        case SET_OPTIONS_DATA:
            return Object.assign({}, options, {
                [action.option]: action.value
            });
        default:
            return options;
    }
}