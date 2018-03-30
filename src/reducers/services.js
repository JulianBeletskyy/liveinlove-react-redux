import { SET_ACTIVE_TAB, TOGGLE_LIGHT_BOX, SET_UPLOAD, NEXT_IMG, PREV_IMG, SET_ACTIVE_SECTION, SET_BLOG_PAGE, SET_COMMENT, SET_STORIES, SET_STORY } from 'actions/types.js'

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
    upload: false,
    sections: {
        advantages: false
    },
    blogs: {
        list: [
            {id: 1, text: 'How young Russian families live'}, 
            {id: 2, text: 'How much cash is there in Ukraine?'}, 
            {id: 3, text: 'Success breeds success'}
        ],
        active: {
            id: 1,
            comments: [
                {
                    text: 'His work has been featured in magazines including .Net Magazine, Communication Arts, Web Designer Mag, WebDesign Index and prestigious design sites like FastCoDesign, CreativeBloq, Computer Arts, TheFwa and Awwwards.',
                    date: 'March 21, 2018 23:45',
                    name: 'JULIA FERDINAND'
                }, {
                    text: 'His work has been featured in magazines including .Net Magazine, Communication Arts, Web Designer Mag, WebDesign Index and prestigious design sites like FastCoDesign, CreativeBloq, Computer Arts, TheFwa and Awwwards.',
                    date: 'March 21, 2018 23:45',
                    name: 'JULIA FERDINAND'
                }
            ]
        },
        pages: {
            last_page: 3,
            current_page: 2
        }
    },
    stories: {
        list: [],
        story: {}
    }
}

export default function services(services = initialState, action = {}) {
    let gallery = Object.assign([], services.gallery)
    const blogs = Object.assign({}, services.blogs)
    const stories = Object.assign({}, services.stories)
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
        case SET_BLOG_PAGE:
            blogs.pages.current_page = action.value
            return Object.assign({}, services, {
                blogs: blogs
            });
        case SET_COMMENT:
            blogs.active.comments = [...blogs.active.comments, action.value]
            return Object.assign({}, services, {
                blogs: blogs
            });
        case SET_STORIES:
            stories.list = action.value
            return Object.assign({}, services, {
                stories
            });
        case SET_STORY:
            stories.story = action.value
            return Object.assign({}, services, {
                stories
            });
        case SET_ACTIVE_SECTION:
            return Object.assign({}, services, {
                sections: {
                    [action.key]: action.value
                }
            });
        default:
            return services;
    }
}