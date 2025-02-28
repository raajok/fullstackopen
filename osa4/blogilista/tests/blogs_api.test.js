const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Title Example 1',
    author: 'Author Example 1',
    url: 'http://exampleUrl1.com',
    likes: 10
  },
  {
    title: 'Title Example 2',
    author: 'Author Example 2',
    url: 'http://exampleUrl2.com',
    likes: 5
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('two json blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, 2)
})

test('returned blogs have id field', async () => {
  const response = await api.get('/api/blogs')

  const ids = response.body.map(blog => blog.id)
  console.log('ids:', ids)

  assert.strictEqual(ids.length, 2)
})

after(async () => {
  await mongoose.connection.close()
})