export default {
    'public': [
        {
            'path': '/',
            'component': 'Home'
        }, {
            'path': '/about',
            'component': 'About'
        }, {
            'path': '/support',
            'component': 'Support'
        }, {
            'path': '/girl-profile',
            'component': 'GirlProfile'
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
            'path': '/profile',
            'component': 'ClientProfile'
        }, {
            'path': '/client-edit',
            'component': 'EditClientProfile'
        }, {
            'path': '/girls',
            'component': 'Girls'
        }, {
            'path': '/success-stories',
            'component': 'SuccessStories'
        }, {
            'path': 'blog',
            'component': 'Blog'
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
            'path': '*',
            'component': 'NotFound'
        }
    ]
}