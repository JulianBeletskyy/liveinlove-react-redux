export default {
    'public': [
        {
            'path': '/',
            'component': 'Home'
        }, {
            'path': '*',
            'component': 'NotFound'
        }
    ],
    'client': [
        {
            'path': '/',
            'component': 'Home'
        }, {
            'path': '/profile/*',
            'component': 'Home'
        }, {
            'path': '*',
            'component': 'NotFound'
        }
    ],
    'girl': [
        {
            'path': '/',
            'component': 'Home'
        }, {
            'path': '/profile/*',
            'component': 'Home'
        }, {
            'path': '*',
            'component': 'NotFound'
        }
    ]
}