import { SET_ACTIVE_CATEGORY, SET_PRODUCTS, SET_CATEGORIES, SET_CART, SET_RECEIVER_TO_SHOP, SET_PRODUCT } from 'actions/types.js'

const initialState = {
    categories_list: [{name: 'Flowers', id: 1}, {name: 'Candy', id: 2}, {name: 'Surprise', id: 3}],
    products_list: [],
    active_category: 0,
    cart: [],
    receiver: {},
    product: {}
}

export default function shop(shop = initialState, action = {}) {
    switch (action.type) {
        case SET_ACTIVE_CATEGORY:
            return Object.assign({}, shop, {
                active_category: action.value
            });
        case SET_CATEGORIES:
            return Object.assign({}, shop, {
                categories_list: action.value
            });
        case SET_PRODUCTS:
            return Object.assign({}, shop, {
                products_list: action.value
            });
        case SET_PRODUCT:
            return Object.assign({}, shop, {
                product: action.value
            });
        case SET_CART:
            return Object.assign({}, shop, {
                cart: action.value
            });
        case SET_RECEIVER_TO_SHOP:
            return Object.assign({}, shop, {
                receiver: action.value
            });
        default:
            return shop;
    }
}