import * as types from '../actions/types.js'
import Cookies from 'js-cookie'

const initialState = {
    token: Cookies.get('token'),
    recovery_hash: '',
    data: {
        role: 'client',
        profile_id: '',
        zodiac: '',
        weight: {},
        want_children: '',
        smoke: '',
        russian_language: '',
        religion: '',
        profession: '',
        primary_language: '',
        occupation: '',
        mobile: '',
        message: '',
        marital_status: {},
        last_name: '',
        first_name: '',
        interests: [],
        interests_value: [],
        id: '',
        height: {},
        hair_length: {},
        hair_color: {},
        female_ethnicity: [],
        female_ethnicity_value: [],
        eyes: {},
        ethnicity: {},
        english_language: '',
        email: '',
        education: '',
        drink: '',
        country: '',
        city: '',
        children: {},
        age: '',
        birthday: {},
        about_children: '',
        match: {},
        avatar: {},
        temp_avatar: '',
        cropped_data: {},
        education_id: '',
        profession: '',
        occupation: '',
        smoke_id: '',
        primary_language_id: '',
        english_language_id: '',
        russian_language_id: '',
        drink_id: '',
        want_children: {},
        credits: 0,
        view_profile: 0,
        membership: {},
        active_gallery: 'private',
        selected_img: [],
        images: {
            public: [],
            privat: []
        },
        private_images: [
            {
                id: 45,
                src: "https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg",
                thumbnail: "https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 213
            },
            {
                id: 31,
                src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
                thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
                thumbnailWidth: 271,
                thumbnailHeight: 320
            },
            {
                id: 54,
                src: "https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg",
                thumbnail: "https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 213
            },
            {
                id: 48,
                src: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
                thumbnail: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 213
            },
            {
                id: 36,
                src: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
                thumbnail: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 213
            },
            {
                id: 47,
                src: "https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg",
                thumbnail: "https://c4.staticflickr.com/8/7476/28973628875_069e938525_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 213
            },
            {
                id: 120,
                src: "https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_b.jpg",
                thumbnail: "https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 179
            },
            {
                id: 80,
                src: "https://c6.staticflickr.com/9/8893/28897116141_641b88e342_b.jpg",
                thumbnail: "https://c6.staticflickr.com/9/8893/28897116141_641b88e342_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 215
            },
            {
                id: 2,
                src: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
                thumbnail: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_n.jpg",
                thumbnailWidth: 257,
                thumbnailHeight: 320
            },
            {
                id: 1,
                src: "https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_b.jpg",
                thumbnail: "https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_n.jpg",
                thumbnailWidth: 226,
                thumbnailHeight: 320
            }
        ]
    },
    countries: []
}

export default function user(user = initialState, action = {}) {
    let temp = Object.assign([], user.data)
    switch (action.type) {
        case types.SET_TOKEN:
            return Object.assign({}, user, {
                token: action.value
            });
        case types.LOGOUT:
            return Object.assign({}, user, {
                token: action.value
            });
        case types.ADD_CREDITS:
            temp.credits += action.value * 1
            return Object.assign({}, user, {
                data: temp
            });
        case types.SET_RECOVERY_HASH:
            return Object.assign({}, user, {
                recovery_hash: action.hash
            });
        case types.SET_CLIENT_DATA:
            for (let k in temp) {
                if (action.data[k]) {
                    temp[k] = action.data[k]
                }
            }
            return Object.assign({}, user, {
                data: temp
            });
        case types.SET_ACTIVE_BLOCK_USER:
            temp[action.key].push(action.id)
            return Object.assign({}, user, {
                data: temp
            });
        case types.SET_PLAN:
            temp.membership = {
                id: action.plan.id,
                name: action.plan.name
            }
            return Object.assign({}, user, {
                data: temp
            });
        case types.SET_GALLERY:
            temp.active_gallery = action.value
            return Object.assign({}, user, {
                data: temp
            });
        case types.SET_SELECTED:
            temp.selected_img = action.value
            return Object.assign({}, user, {
                data: temp
            });
        case types.ADD_TO_GALLERY:
            temp.private_images.push({
                id: 522,
                src: action.value,
                thumbnail: action.value,
                thumbnailWidth: 226,
                thumbnailHeight: 320
            })
            return Object.assign({}, user, {
                data: temp
            });
        case types.SET_IMAGES:
            for (let k in action.value) {
                for (let j in action.value[k]) {
                    temp.images[k].push({
                        id: action.value[k][j].id,
                        src: action.value[k][j].image,
                        thumbnail: action.value[k][j].image,
                        thumbnailWidth: 150,
                        thumbnailHeight: 150
                    })
                }
            }
            return Object.assign({}, user, {
                data: temp
            });
        case types.REMOVE_ACTIVE_BLOCK_USER:
            for (var k in temp[action.key]) {
                if (temp[action.key][k] === action.id) {
                    temp[action.key].splice(k, 1)
                }
            }
            return Object.assign({}, user, {
                data: temp
            });
        default:
            return user;
    }
}