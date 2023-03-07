import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            username: "Petar",
            email: "peatarkostadinov30@gmail.com",
            password: bcrypt.hashSync("123456"),
            isAdmin: true
        },
        {
            username: "John",
            email: "example@gmail.com",
            password: bcrypt.hashSync("123456"),
            isAdmin: false
        }
    ],
    products: [
        {
           
            name: 'Bacardi Oro',
            slug: 'bacardi-oro',
            category: 'Rum',
            image: '/images/5010677025805_20-1-5-12.webp',
            price: 100,
            countMany: 10,
            brand: 'Bacardi',
            rating: 4.5,
            numReviews: 5,
            description: 'High quality rum from Puerto Rico'
        },
        {
           
            name: 'Hendrick\'s Gin',
            slug: 'hendrick\'s-gin',
            category: 'Gin',
            image: '/images/Product-Hendricks-Gin_600x.webp',
            price: 100,
            countMany: 8,
            brand: 'Hendrick\'s',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality gin from Scotland'
        },
        {
           
            name: 'Jack Daniel\'s Single Barrel',
            slug: 'jack-daniel\'s-single-barrel',
            category: 'Whiskey',
            image: '/images/jack-daniel-s-single-barrel-select-45.jpg',
            price: 100,
            countMany: 0,
            brand: 'Jack Daniel\'s',
            rating: 3.5,
            numReviews: 10,
            description: 'High quality Tennessee whiskey'
        },
        {
           
            name: 'Veuve Clicquot Yellow Label',
            slug: 'veuve-clicquot-yellow-label',
            category: 'Champagne',
            image: '/images/Veuve-Clicquot-Yellow-Label-0.75.png',
            price: 100,
            countMany: 10,
            brand: 'Veuve Clicquot',
            rating: 4,
            numReviews: 10,
            description: 'Veuve Clicquot is not just champagne, but a lifestyle. Veuve Clicquot brings joy and pleasure to the whole world with its innovation, creativity and a small dose of madness.'
        },
        
    ]
}

export default data;