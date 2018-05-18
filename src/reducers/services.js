import { FILTER_BLOGS, SET_ACTIVE_TAB, TOGGLE_LIGHT_BOX, SET_UPLOAD, NEXT_IMG, PREV_IMG, SET_ACTIVE_SECTION, SET_BLOG_PAGE, SET_COMMENT, SET_STORIES, SET_STORY, SET_BLOGS, SET_BLOG, SET_POPULAR_BLOGS } from 'actions/types.js'

const initialState = {
	tabs: {
		member_profile: 'info',
		main: 'popular',
        mail: 'inbox'
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
        list: [],
        filter_list: [],
        popular: [],
        active: {
            comments: []
        },
        pages: {
            last_page: 1,
            current_page: 1
        }
    },
    stories: {
        list: [],
        story: {}
    },
    testimonials: {
        list: [
            {
                page: 1,
                list: [
                    {
                        text: "His work has been featured in magazines including .Net Magazine, Communication Arts, Web Designer Mag, WebDesign Index and prestigious design sites like FastCoDesign.",
                        rating: 4,
                        name: "Lisa Monroe 2",
                        city: "New York, United States",
                        img: "assets/img/testimonials-small.jpg"
                    }, {
                        text: "His work has been featured in magazines including .Net Magazine, Communication Arts, Web Designer Mag, WebDesign Index and prestigious design sites like FastCoDesign.",
                        rating: 5,
                        name: "Lisa Monroe",
                        city: "New York, United States",
                        img: "http://mint.themes.tvda.pw/wp-content/uploads/2016/11/profile04-110x110.jpg"
                    }, {
                        text: "His work has been featured in magazines including .Net Magazine, Communication Arts, Web Designer Mag, WebDesign Index and prestigious design sites like FastCoDesign.",
                        rating: 5,
                        name: "Lisa Monroe",
                        city: "New York, United States",
                        img: "http://mint.themes.tvda.pw/wp-content/uploads/2016/11/profile04-110x110.jpg"
                    }, {
                        text: "His work has been featured in magazines including .Net Magazine, Communication Arts, Web Designer Mag, WebDesign Index and prestigious design sites like FastCoDesign.",
                        rating: 2,
                        name: "Lisa Monroe",
                        city: "New York, United States",
                        img: "http://mint.themes.tvda.pw/wp-content/uploads/2016/11/profile04-110x110.jpg"
                    }, {
                        text: "His work has been featured in magazines including .Net Magazine, Communication Arts, Web Designer Mag, WebDesign Index and prestigious design sites like FastCoDesign.",
                        rating: 5,
                        name: "Lisa Monroe",
                        city: "New York, United States",
                        img: "http://mint.themes.tvda.pw/wp-content/uploads/2016/11/profile04-110x110.jpg"
                    }, {
                        text: "His work has been featured in magazines including .Net Magazine, Communication Arts, Web Designer Mag, WebDesign Index and prestigious design sites like FastCoDesign.",
                        rating: 3,
                        name: "Lisa Monroe",
                        city: "New York, United States",
                        img: "http://mint.themes.tvda.pw/wp-content/uploads/2016/11/profile04-110x110.jpg"
                    }, {
                        text: "His work has been featured in magazines including .Net Magazine, Communication Arts, Web Designer Mag, WebDesign Index and prestigious design sites like FastCoDesign.",
                        rating: 4,
                        name: "Lisa Monroe",
                        city: "New York, United States",
                        img: "http://mint.themes.tvda.pw/wp-content/uploads/2016/11/profile04-110x110.jpg"
                    }
                ]
            }, {
                page: 2,
                list: [
                    {
                        text: "His work has been featured in magazines including .Net Magazine, Communication Arts, Web Designer Mag, WebDesign Index and prestigious design sites like FastCoDesign.",
                        rating: 5,
                        name: "Lisa Monroe",
                        city: "New York, United States",
                        img: "http://mint.themes.tvda.pw/wp-content/uploads/2016/11/profile04-110x110.jpg"
                    }, {
                        text: "His work has been featured in magazines including .Net Magazine, Communication Arts, Web Designer Mag, WebDesign Index and prestigious design sites like FastCoDesign.",
                        rating: 4,
                        name: "Lisa Monroe",
                        city: "New York, United States",
                        img: "http://mint.themes.tvda.pw/wp-content/uploads/2016/11/profile04-110x110.jpg"
                    }, {
                        text: "His work has been featured in magazines including .Net Magazine, Communication Arts, Web Designer Mag, WebDesign Index and prestigious design sites like FastCoDesign.",
                        rating: 5,
                        name: "Lisa Monroe",
                        city: "New York, United States",
                        img: "http://mint.themes.tvda.pw/wp-content/uploads/2016/11/profile04-110x110.jpg"
                    }
                ]
            }
        ]    
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
        case SET_BLOGS:
            blogs.list = action.data.data
            blogs.filter_list = action.data.data
            blogs.pages.current_page = action.data.current_page
            blogs.pages.last_page = action.data.last_page
            return Object.assign({}, services, {
                blogs
            });
        case FILTER_BLOGS:
            blogs.filter_list = blogs.list
            if (action.search) {
                blogs.filter_list = blogs.list.filter((item) => {
                    return item.title.toLowerCase().indexOf(action.search.toLowerCase()) + 1
                })
            }
            return Object.assign({}, services, {
                blogs
            });
        case SET_POPULAR_BLOGS:
            blogs.popular = action.data
            return Object.assign({}, services, {
                blogs
            });
        case SET_BLOG:
            blogs.active = action.data
            return Object.assign({}, services, {
                blogs
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