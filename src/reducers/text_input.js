import * as types from '../actions/types.js'

const initialState = {
    changed: []
}

export default function textField(textField = initialState, action = {}) {
    let temp = Object.assign([], textField.changed)
    switch (action.type) {
        case types.SET_ID_TEXTFIELD:
            if (temp.indexOf(action.id) < 0) {
                temp.push(action.id)
            }
            return Object.assign({}, textField, {
                changed: temp
            });
        case types.REMOVE_ID_TEXTFIELD:
            let index = -1;
            for (var k in temp) {
                if (temp[k] === action.id) {
                   index = k
                }
            }
            if (index >= 0) {
                temp.splice(index, 1)
            }
            return Object.assign({}, textField, {
                changed: temp
            });
        default:
            return textField;
    }
}