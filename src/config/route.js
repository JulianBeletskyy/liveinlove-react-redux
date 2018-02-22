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
    'clients': [
        {
            'path': '/',
            'component': 'Home'
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
    'girls': [
        {
            'path': '*',
            'component': 'NotFound'
        }
    ]
}