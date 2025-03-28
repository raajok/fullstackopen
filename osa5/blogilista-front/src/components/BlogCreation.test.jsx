import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogCreation from './BlogCreation'

describe('<BlogCreation />', () => {
  test('eventHandler is called with right info after submitting form', async () => {
    const user = userEvent.setup()
    const createMock = vi.fn()

    render(<BlogCreation handleCreate={createMock} />)

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const button = screen.getByText('create')

    await user.type(titleInput, 'test title')
    await user.type(authorInput, 'test author')
    await user.type(urlInput, 'testurl.com')
    await user.click(button)

    expect(createMock.mock.calls).toHaveLength(1)
    expect(createMock.mock.calls[0][0])
      .toStrictEqual({
        title: 'test title',
        author: 'test author',
        url: 'testurl.com'
      })
  })
})