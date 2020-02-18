const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password) {
    return response.status(400).send({ error: `User validation failed: password: Path \'password\' is required.` })
  }

  if (body.password.length < 3) {
    return response.status(400).send({ error: `User validation failed: password: Path \'password\' (\'${body.password}\') is shorter than the minimum allowed length (3).` })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs')

    response.json(users.map(user => user.toJSON()))
  })

module.exports = usersRouter