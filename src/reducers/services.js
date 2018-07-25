import { FILTER_BLOGS, SET_ACTIVE_TAB, TOGGLE_LIGHT_BOX, SET_UPLOAD, NEXT_IMG, PREV_IMG, SET_ACTIVE_SECTION, SET_BLOG_PAGE, SET_COMMENT, SET_STORIES, SET_STORY, SET_BLOGS, SET_BLOG, SET_POPULAR_BLOGS } from 'actions/types.js'

const initialState = {
	tabs: {
		member_profile: 'info',
		main: 'all',
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
                        text: "Hello! I went to Ukraine to meet my lady in the springtime and it was great. I landed and my translator Marina met me at the airport, and helped me with everything the entire trip. She was great. I got to meet my lady and spend time with her. We seen the city and other cities all over Ukraine. We got to eat at many places trying many new foods all are delicious. All the people are helpful and very friendly. To anyone thinking of going I highly recommend it. It was an experience I will never forget. Duncan from Canada.",
                        name: "Duncan",
                        img: "assets/img/testimonials/Duncan.jpg",
                        text_img: "assets/img/testimonials/Duncan2.jpg",
                    }, {
                        text: "On a recent tour to Kharkov, I had the good fortune to have Karina as Lifeinlove recommended to me by a friend who lives in Kharkov. She assured me that I could trust Karina to look out for my best interests and to be professional in all matters. Karina not only met her recommendation, but exceeded it. I could not have been happier or better served with my introductions, interpreting and all of the myriad details that arise when you’re in a foreign city and looking to make that perfect impression on the lady you’re hoping will be the one. George from USA.",
                        name: "George",
                        img: "assets/img/testimonials/George.jpg",
                        text_img: "assets/img/testimonials/George2.jpg",
                    }, {
                        text: "My trip to Kharkov was very pleasant. The translator was wonderful. She was very helpful and knowledgeable to places of interest and excellent place to eat. She was very amazing in making everyone feel easy. The time I spent with my lady was fun and amazing. The services of the people were excellent and I highly recommend coming and enjoying a wonderful city and wonderful people. John",
                        name: "John",
                        img: "assets/img/testimonials/John.jpg",
                        text_img: "assets/img/testimonials/John2.jpg",
                    }, {
                        text: "What to pay attention to during your meeting with your Ukrainian Woman.During the first meeting of course, you want to impress your lady and learn more about her to develop an in-person relationship.  You will be very excited and your feelings will be high, but remember to just be yourself. Now that you have met her, what should you look for in her during your meeting? First, I think it is very important to be yourself.  You should show your lady attention, respect, kindness, and speak about family.  She should in turn show you theses same qualities.  There are a few little things that I noticed during my meeting and will most likely be the same for you.  First, during pictures she will lean in closer to you.  A Ukrainian woman may take longer to tell you her feelings, but her actions will show you.  Also, pay attention after your first couple of dates to see if she also will hold your hand.  If she reaches for your hand and holds it tight, chances are she really likes you.  She will start to show little signs of affection. Does she make time to meet you during your visit from work? It is important to understand if she misses work to be with you, she is going out of her way to see you.  She will not be paid by her work and money is tight.  This is another good sign too look for.  Also, after your first couple of dates she will want your private details to contact you.  Don’t push her, let her decide if she wants to do exchange details.  I can assure you if she wants too, then there is interest.   If your lady refers to you as my “your name“, then she has decided that she is with you. Another important aspect of her life is her friends and family, once you learn more about her, you will see if she is family oriented, not just in words.   Most Ukrainian women are very family oriented and have close friends.  This reflects who they are every day.    If she wants you to meet her friends or family, she is interested in you for a long-term relationship.  Even though there may be language difficulties, don’t let that bother you.  Remember, just be yourself and respectful always.  The most important thing I can tell you is not to look for too much at first.   Just enjoy each others company and see if the bond you have started gets stronger during your dates. The women of Ukraine are strong and beautiful and each one is different. Good Luck and Enjoy! John D. from USA.",
                        name: "John",
                        img: "assets/img/testimonials/John-2.jpg",
                        text_img: "assets/img/testimonials/John-22.jpg",
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
            console.log(tabs);
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