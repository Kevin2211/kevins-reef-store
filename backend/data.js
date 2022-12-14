import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: 'Kevin Trinh',
            email: 'cagem123456@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true
        },
        {
            name: 'John',
            email: 'John@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false
        }
    ],
    products: [
        {

            name: 'UC Amazeballs Goni',
            slug: 'uc-amazeballs-shirt',
            category: 'LPS',
            image: '/images/amazeballs.jpeg',
            price: 120,
            countInStock: 10,
            careLevel: 1,
            description: 'what you see is what you get',
            lighting: 2,
            flow: 2,
            isAvailable: true
        },
        {

            name: 'Big R Walt Disney',
            slug: 'bigr-walt-disney',
            category: 'SPS',
            image: '/images/waltdisney.jpeg',
            price: 200,
            countInStock: 0,
            careLevel: 4,
            description: 'what you see is what you get',
            lighting: 3,
            flow: 3,
            isAvailable: true
        },
        {

            name: 'Weeping Willow Toadstool',
            slug: 'weeping-willow-toadstool',
            category: 'Softie',
            image: '/images/weepingwillow.jpeg',
            price: 100,
            countInStock: 10,
            careLevel: 1,
            description: 'what you see is what you get',
            lighting: 1,
            flow: 1,
            isAvailable: true
        },
        {
            name: 'Weeping Willow Toadstool 2',
            slug: 'weeping-willow-toadstool2',
            category: 'Softie',
            image: '/images/weepingwillow.jpeg',
            price: 100,
            countInStock: 0,
            careLevel: 1,
            description: 'what you see is what you get',
            lighting: 1,
            flow: 1,
            isAvailable: true
        }
    ]
}

export default data