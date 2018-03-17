import { SET_ACTIVE_CATEGORY, SET_PRODUCTS, SET_CATEGORIES } from 'actions/types.js'

const initialState = {
    categories_list: [{name: 'Flowers', id: 1}, {name: 'Candy', id: 2}, {name: 'Surprise', id: 3}],
    products_list: [
        {
            id: 1, name: 'GREEN ULTIMATE OVERSIZED',
            price: '229.00',
            image: '/assets/img/p05.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis eros lobortis, vestibulum turpis ac, pulvinar odio. Praesent vulputate a elit ac mollis. In sit amet ipsum turpis. Pellentesque venenatis, libero vel euismod lobortis, mi metus luctus augue, eget dapibus elit nisi eu massa. Phasellus sollicitudin nisl posuere nibh ultricies, et fringilla dui gravida.'
        }, {
            id: 2,
            name: 'CAMO SWEAT TOP WITH', price: '129.00',
            image: '/assets/img/p06.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis eros lobortis, vestibulum turpis ac, pulvinar odio. Praesent vulputate a elit ac mollis. In sit amet ipsum turpis. Pellentesque venenatis, libero vel euismod lobortis, mi metus luctus augue, eget dapibus elit nisi eu massa. Phasellus sollicitudin nisl posuere nibh ultricies, et fringilla dui gravida.'
        }
    ],
    active_category: 1
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
                categories_list: action.value
            });
        default:
            return shop;
    }
}