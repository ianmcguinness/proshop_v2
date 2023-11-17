import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true
  },
  {
    name: 'Connor Johnson',
    email: 'connor@email.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false
  },
  {
    name: 'Callum Fearon',
    email: 'callum@email.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false
  }
]

export default users
