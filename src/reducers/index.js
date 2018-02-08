import { combineReducers } from 'redux'
import user from './user.js'
import { routerReducer } from 'react-router-redux'

const reducer = combineReducers({
    routing: routerReducer,
    user
})

export default reducer