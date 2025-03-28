import { useState } from 'react'

export default function BlogCreation({ handleCreate }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    setTitle('')
    setAuthor('')
    setUrl('')

    const blog = {
      title: title,
      author: author,
      url: url
    }

    handleCreate(blog)
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            placeholder='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            placeholder='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            placeholder='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}