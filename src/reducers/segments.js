import * as types from '../actions/types.js'

const initialState = {
	first: '',
    second: '',
    third: ''
}

export default function segments(segments = initialState, action = {}) {
    switch (action.type) {
        case types.SET_SEGMENT:
            return Object.assign({}, segments, {
                first: action.first,
                second: action.second,
                third: action.third
            });
        default:
            return segments;
    }
}