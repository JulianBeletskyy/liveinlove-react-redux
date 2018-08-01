import { SET_MEMBERS, SET_MEMBER_INFO, SET_FAVORITE, SET_PAGES, ADD_MEMBERS, SET_PUBLIC_MEMBERS, SET_ACTIVE_MEMBERS, SET_INTEREST, ADD_MORE_MEMBERS, SET_MEMBERS_MAIN } from 'actions/types.js'

const initialState = {
    list: [],
    new_list: {
        list: [],
        current_page: 1,
        last_page: 1,
        next_link: '',
    },
    popular_list: {
        list: [],
        current_page: 1,
        last_page: 1,
        next_link: '',
    },
    viewed_list: {
        list: [],
        current_page: 1,
        last_page: 1,
        next_link: '',
    },
    favorite_list: [],
    interest_list: [],
    active_list: [],
    public: {
        all: [],
        new: [],
        popular: [],
        active: {
            type: 'popular',
            list: []
        }
    },
    search_list: [],

    current_page: 1,
    last_page: 1,
    next_link: '',

    data: {
        avatar: {},
        birthday: {},
        height: {},
        weight: {},
        match: {},
        interests_value: [],
        find_ethnicity_value: [],
        gallery: [],
        age: ''
    }
}

export default function members(members = initialState, action = {}) {
    let temp = Object.assign([], members.data)
    let temp_public = Object.assign([], members.public)
    switch (action.type) {
        case SET_PAGES:
            return Object.assign({}, members, {
                current_page: action.value.meta.current_page,
                last_page: action.value.meta.last_page,
                next_link: action.value.links.next
            });
        case SET_MEMBERS_MAIN:
            return Object.assign({}, members, {
                [action.key]: action.data,
                active_list: action.data
            });
        case SET_MEMBERS:
            return Object.assign({}, members, {
                [action.key]: {
                    list: action.data.data,
                    current_page: action.data.meta.current_page,
                    last_page: action.data.meta.last_page,
                    next_link: action.data.links.next,
                },
                //active_list: action.data
            });
        case ADD_MORE_MEMBERS:
            return Object.assign({}, members, {
                [action.key]: {
                    list: [...members[action.key].list, ...action.data.data],
                    current_page: action.data.meta.current_page,
                    last_page: action.data.meta.last_page,
                    next_link: action.data.links.next,
                }
            });
        case SET_PUBLIC_MEMBERS:
            temp_public[action.key] = action.value
            if (temp_public.active.type === action.key) {
                temp_public.active.list = action.value
            }
            return Object.assign({}, members, {
                public: temp_public
            });
        case ADD_MEMBERS:
            return Object.assign({}, members, {
                list: [...members.list, ...action.value],
                search_list: [...members.search_list, ...action.value]
            });
        case SET_MEMBER_INFO:
            return Object.assign({}, members, {
                data: action.data
            });
        case SET_ACTIVE_MEMBERS:
            temp_public.active = {
                type: action.key,
                list: temp_public[action.key]
            }
            return Object.assign({}, members, {
                public: temp_public
            });
        case SET_FAVORITE:
            let temp_lists = {
                list: Object.assign([], members.list),
                new_list: Object.assign([], members.new_list),
                popular_list: Object.assign([], members.popular_list),
                favorite_list: Object.assign([], members.favorite_list)
            }

            for (let k in temp_lists) {
                for (let j in temp_lists[k]) {
                    if (temp_lists[k][j].id === action.id) {
                        temp_lists[k][j].favorite = action.value
                    }
                }
            }

            if (temp.id === action.id) {
                temp.favorite = action.value
            }
            return Object.assign({}, members, {
                list: temp_lists.list,
                new_list: temp_lists.new_list,
                popular_list: temp_lists.popular_list,
                data: temp
            });
        case SET_INTEREST:
            temp.interest = action.value
            return Object.assign({}, members, {
                data: temp
            });
        default:
            return members;
    }
}