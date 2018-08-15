import { SET_ACTIVE_CATEGORY, SET_PRODUCTS, SET_CATEGORIES, SET_CART, SET_RECEIVER_TO_SHOP, SET_PRODUCT, ADD_PRODUCTS } from 'actions/types.js'

const initialState = {
    categories_list: [],
    products: {
        list: [],
        current_page: 1,
        last_page: 1,
        next_link: '',
    },

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
                products: {
                    list: action.value.data,
                    current_page: action.value.meta.current_page,
                    last_page: action.value.meta.last_page,
                    next_link: action.value.links.next
                }
            });
        case SET_PRODUCT:
            return Object.assign({}, shop, {
                product: action.value
            });
        case ADD_PRODUCTS:
            return Object.assign({}, shop, {
                products: {
                    list: [...shop.products.list, ...action.data.data],
                    current_page: action.data.meta.current_page,
                    last_page: action.data.meta.last_page,
                    next_link: action.data.links.next
                }
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