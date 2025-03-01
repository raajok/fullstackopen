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
  const blogs = response.body

  blogs.forEach(blog => {
    assert('id' in blog)
  })
})

test('added blog shows up in database', async () => {
  const blog = {
    title: 'Test',
    author: 'Test',
    url: 'http://test.com',
    likes: 100
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const body = response.body
  const titles = body.map(blog => blog.title)

  assert(titles.includes('Test'))
  assert.strictEqual(body.length, initialBlogs.length + 1)
})

test('blog has 0 likes if undefined', async () => {
  const blog = {
    title: 'Test',
    author: 'Test',
    url: 'http://test.com'
  }

  const mongoBlog = new Blog(blog)

  assert.strictEqual(mongoBlog.likes, 0)
})

test('blog with no title returns 400', async () => {
  const blog = {
    author: 'Test',
    url: 'http://test.com',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blog with no url returns 400', async () => {
  const blog = {
    title: 'Test',
    author: 'Test',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('deleting a blog', async () => {
  const blogsInDb = await api
    .get('/api/blogs')

  const blogToDelete = blogsInDb.body[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const response = await api.get('/api/blogs')
  const blogs = response.body

  assert.strictEqual(blogs.length, initialBlogs.length - 1)
  assert(!blogs.map(blog => blog.title).includes(blogToDelete.title))
})

test('updating a blog', async () => {
  const blogsInDb = await api
    .get('/api/blogs')

  const blogToUpdate = blogsInDb.body[0]
  const updatedBlog = { ...blogToUpdate, likes: (blogToUpdate.likes + 1) }

  await api.put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

  const response = await api.get('/api/blogs')
  const blogs = response.body

  assert.strictEqual(blogs.length, initialBlogs.length)
  assert(blogs.map(blog => blog.likes).includes(updatedBlog.likes))
})

after(async () => {
  await mongoose.connection.close()
})