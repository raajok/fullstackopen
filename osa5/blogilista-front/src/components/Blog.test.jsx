import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  test('Only title and author are rendered initially', async () => {
    const blog = {
      title: 'Testing title',
      author: 'Testing author',
      likes: 10,
      url: 'test.com',
      user: {
        username: 'testuser'
      }
    }

    const removeMock = vi.fn()
    const likeMock = vi.fn()

    render(<Blog username={blog.user.username} handleRemove={removeMock}
      handleLike={likeMock} blog={blog} />)

    const element = await screen.findByText(`${blog.title} ${blog.author}`)
    const likesElement = screen.queryByText(blog.likes, { exact: false })
    const urlElement = screen.queryByText(blog.url, { exact: false })

    // shows title and author but not likes nor url
    expect(element).toBeDefined()
    expect(likesElement).toBeNull()
    expect(urlElement).toBeNull()
  })

  test('Also URL, likes and user is rendered after view is clicked', async () => {
    const blog = {
      title: 'Testing title',
      author: 'Testing author',
      likes: 10,
      url: 'test.com',
      user: {
        username: 'testuser',
        name: 'Test User'
      }
    }

    const removeMock = vi.fn()
    const likeMock = vi.fn()

    render(<Blog username={blog.user.username} handleRemove={removeMock}
      handleLike={likeMock} blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = await screen.findByText(`${blog.title} ${blog.author}`)
    const likesElement = await screen.findByText(blog.likes, { exact: false })
    const urlElement = await screen.findByText(blog.url, { exact: false })
    const usernameElement = await screen.findByText(blog.user.name, { exact: false })

    // shows title and author as well as url, likes and user name
    expect(element).toBeDefined()
    expect(likesElement).toBeDefined()
    expect(urlElement).toBeDefined()
    expect(usernameElement).toBeDefined()
  })

  test('clicking like button twice fires the handler twice', async () => {
    const blog = {
      title: 'Testing title',
      author: 'Testing author',
      likes: 10,
      url: 'test.com',
      user: {
        username: 'testuser',
        name: 'Test User'
      }
    }

    const removeMock = vi.fn()
    const likeMock = vi.fn()

    render(<Blog username={blog.user.username} handleRemove={removeMock}
      handleLike={likeMock} blog={blog} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    // shows title and author but not likes nor url
    expect(likeMock.mock.calls).toHaveLength(2)
  })
})