import { SET_MEMBERS, SET_MEMBER_INFO, SET_FAVORITE } from 'actions/types.js'

const initialState = {
    list: [],
    new_list: [],
    popular_list: [],
    favorite_list: [],
    search_list: [],
    data: {
        avatar: {},
        birthday: {},
        height: {},
        weight: {},
        match: {},
        interests_value: [],
        find_ethnicity_value: []
    }
}

export default function members(members = initialState, action = {}) {
    let temp = Object.assign([], members.data)
    switch (action.type) {
        case SET_MEMBERS:
            return Object.assign({}, members, {
                [action.key]: action.data
            });
        case SET_MEMBER_INFO:
            return Object.assign({}, members, {
                data: action.data
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
        default:
            return members;
    }
}