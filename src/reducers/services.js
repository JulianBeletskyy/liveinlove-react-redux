import { SET_ACTIVE_TAB, TOGGLE_LIGHT_BOX, SET_UPLOAD, NEXT_IMG, PREV_IMG } from 'actions/types.js'

const initialState = {
	tabs: {
		member_profile: 'info',
		main: 'popular',
        mail: 'messages'
	},
    gallery: {
        show_light_box: '',
        img_light_box: 0
    },
    upload: false
}

export default function services(services = initialState, action = {}) {
    let gallery = Object.assign([], services.gallery)
    switch (action.type) {
        case SET_ACTIVE_TAB:
            let tabs = Object.assign([], services.tabs)
            tabs[action.key] = action.value
            return Object.assign({}, services, {
                tabs: tabs
            });
        case TOGGLE_LIGHT_BOX:
            gallery.show_light_box = action.value
            gallery.img_light_box = action.key
            return Object.assign({}, services, {
                gallery: gallery
            });
        case NEXT_IMG:
            gallery.img_light_box++
            return Object.assign({}, services, {
                gallery: gallery
            });
        case PREV_IMG:
            gallery.img_light_box--
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