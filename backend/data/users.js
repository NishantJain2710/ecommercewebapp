import bcrypt from 'bcryptjs'
const users =[
    {
        name:'Admin User',
        email:'admin@example.com',
        password: bcrypt.hashSync('1234',10),
        isAdmin: true,
        isSeller: true,
    },
    {
        name:'Anuj Kaushik',
        email:'anuj@example.com',
        password: bcrypt.hashSync('1234',10),
        isSeller: true,
    },
    {
        name:'Nishant Jain',
        email:'Nishant@example.com',
        password: bcrypt.hashSync('1234',10),
    }
]

export default users