const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      passwordHash,
      name: 'Root' 
    })

    await user.save()
  })

  test('creation succeeds with fresh username', async () => {
    const startResponse = await api.get('/api/users')
    const usersAtStart = startResponse.body

    const newUser = {
      username: 'testuser',
      password: 'secret',
      name: 'Test User',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const endResponse = await api.get('/api/users')
    const usersAtEnd = endResponse.body
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken'), async () => {
    const startResponse = await api.get('/api/users')
    const usersAtStart = startResponse.body

    const newUser = {
      username: 'root',
      password: 'secret',
      name: 'Test User',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const endResponse = await api.get('/api/users')
    const usersAtEnd = endResponse.body
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert(result.body.error.includes('expected `username` to be unique'))
  }

  test('creation fails with a short password', async () => {
    const startResponse = await api.get('/api/users')
    const usersAtStart = startResponse.body

    const newUser = {
      username: 'testuser',
      password: 'se',
      name: 'Test User',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const endResponse = await api.get('/api/users')
    const usersAtEnd = endResponse.body
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert(result.body.error.includes('password is too short'))
  })

  test('creation fails with a short username', async () => {
    const startResponse = await api.get('/api/users')
    const usersAtStart = startResponse.body

    const newUser = {
      username: 'te',
      password: 'secret',
      name: 'Test User',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const endResponse = await api.get('/api/users')
    const usersAtEnd = endResponse.body
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert(result.body.error.includes('`username` (`te`) is shorter than the minimum allowed length (3)'))
  })
})