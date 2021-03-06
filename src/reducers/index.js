import { combineReducers } from 'redux'
import user from './user.js'
import alerts from './alerts.js'
import signup from './signup.js'
import textField from './text_input.js'
import modals from './modals.js'
import textarea from './textarea.js'
import memberships from './memberships.js'
import segments from './segments.js'
import options from './options.js'
import members from './members.js'
import services from './services.js'
import messages from './messages.js'
import shop from './shop.js'
import { routerReducer } from 'react-router-redux'

const reducer = combineReducers({
    routing: routerReducer,
    user,
    alerts,
    signup,
    textField,
    modals,
    textarea,
    memberships,
    segments,
    options,
    members,
    services,
    messages,
    shop
})

export default reducer