import { SET_ACTIVE_TAB, TOGGLE_LIGHT_BOX, SET_UPLOAD } from 'actions/types.js'

const initialState = {
	tabs: {
		member_profile: 'info',
		main: 'popular',
        mail: 'messages'
	},
    gallery: {
        avatar: false
    },
    upload: false
}

export default function services(services = initialState, action = {}) {
    switch (action.type) {
        case SET_ACTIVE_TAB:
            let tabs = Object.assign([], services.tabs)
            tabs[action.key] = action.value
            return Object.assign({}, services, {
                tabs: tabs
            });
        case TOGGLE_LIGHT_BOX:
            let gallery = Object.assign([], services.gallery)
            gallery.avatar = action.value
            return Object.assign({}, services, {
                gallery: gallery
            });
        case SET_UPLOAD:
            return Object.assign({}, services, {
                upload: true
            });
        default:
            return services;
    }
}