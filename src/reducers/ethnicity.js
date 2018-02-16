import * as types from '../actions/types.js'

const initialState = {
    active: []
}

export default function ethnicity(ethnicity = initialState, action = {}) {
    let temp = Object.assign([], ethnicity.active)
    switch (action.type) {
        case types.SET_ACTIVE_ATHNICITY:
            temp.push(action.id)
            return Object.assign({}, ethnicity, {
                active: temp
            });
        case types.REMOVE_ACTIVE_ATHNICITY:
            for (var k in temp) {
                if (temp[k] == action.id) {
                    temp.splice(k, 1)
                }
            }
            return Object.assign({}, ethnicity, {
                active: temp
            });
        default:
            return ethnicity;
    }
}