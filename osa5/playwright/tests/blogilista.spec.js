const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginText = await page.getByText('log in to application')
    await expect(loginText).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen")
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'väärä')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen")
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, "test title", "test author", "test url")
      await expect(page.getByText('test title test author')).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {
      await createBlog(page, "test title", "test author", "test url")
      await page.getByRole('button', { name: 'view' }).click()

      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('can remove own blogs', async ({ page }) => {
      await createBlog(page, "test title", "test author", "test url")
      await page.getByRole('button', { name: 'view' }).click()

      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()

      await expect(page.getByText("test title test author")).not.toBeVisible()
    })

    test("can see own blog's remove button, not others'", async ({ page, request }) => {
      await createBlog(page, "test title", "test author", "test url")
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
      await page.getByRole('button', { name: 'logout' }).click()

      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Test User',
          username: 'testuser',
          password: 'salainen'
        }
      })
      await loginWith(page, "testuser", "salainen")

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('blogs are sorted, most liked first', async ({ page }) => {
      await createBlog(page, "second most liked", "test author", "test url")
      await page.getByRole('button', { name: 'view' }).click()
      // somehow clickCount option is not working
      let likeButton = page.getByRole('button', { name: 'like' })
      likeButton.click()
      likeButton.click()

      await createBlog(page, "least liked", "test author", "test url")
      await page.getByRole('button', { name: 'view' }).click()
      likeButton = page.getByRole('button', { name: 'like' }).last()
      likeButton.click()

      await createBlog(page, "most liked", "test author", "test url")
      await page.getByRole('button', { name: 'view' }).click()
      likeButton = page.getByRole('button', { name: 'like' }).last()
      likeButton.click()
      likeButton.click()
      likeButton.click()

      const blogs = await page.getByText('test author').all()
      console.log(blogs)

      // had trouble finding the titles. The first one in the list is the success message of the last blog added...
      await expect(blogs[1]).toHaveText(/most liked .*/)
      await expect(blogs[2]).toHaveText(/second most liked .*/)
      await expect(blogs[3]).toHaveText(/least liked .*/)
    })
  })
})