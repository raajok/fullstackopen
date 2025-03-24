import { useState } from "react"
import blogService from "../services/blogs"

export default function BlogCreation({ user, bloglist, setBloglist, setSuccess }) {
  const [title, setTitle] = useState()
  const [author, setAuthor] = useState()
  const [url, setUrl] = useState()

  const handleCreate = async (event) => {
    event.preventDefault()

    setTitle('')
    setAuthor('')
    setUrl('')

    const blog = {
      title: title,
      author: author,
      url: url,
      user: user
    }

    await blogService.create(blog)

    setBloglist(bloglist.concat(blog))
    setSuccess(`a new blog ${title} by ${author} added`)
    setTimeout(() => {
      setSuccess(null)
    }, 5000)
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={(e) => handleCreate(e)}>
        <div>
          title:
          <input 
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input 
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}