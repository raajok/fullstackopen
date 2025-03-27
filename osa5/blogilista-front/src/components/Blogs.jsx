import { useState, useEffect, useRef } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import BlogCreation from './BlogCreation'
import Togglable from './Togglable'

export default function Blogs({ user, setUser }) {
  const [bloglist, setBloglist] = useState([])
  const [success, setSuccess] = useState(null)
  const blogCreationRef = useRef()

  useEffect(() => {
    blogService.getAll().then(response =>
      setBloglist(response.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  const handleCreate = async (blog) => {
    blogCreationRef.current.toggleVisibility()
    blog.user = user
    await blogService.create(blog)

    setBloglist(bloglist.concat(blog).toSorted((a, b) => b.likes - a.likes))
    setSuccess(`a new blog ${blog.title} by ${blog.author} added`)
    setTimeout(() => {
      setSuccess(null)
    }, 5000)
  }

  const handleLike = async (likedBlog) => {
    blogService
      .like(likedBlog)
      .then(returnedBlog => {
        setBloglist(
          bloglist.map(blog => blog.id !== likedBlog.id ? blog : returnedBlog)
            .toSorted((a, b) => b.likes - a.likes))
      })
  }

  const handleRemove = async (removedBlog) => {
    if (window.confirm(`Remove blog ${removedBlog.title} by ${removedBlog.author}`)) {
      blogService
        .remove(removedBlog.id)
        .then(() => {
          setBloglist(bloglist.filter(blog => blog.id !== removedBlog.id))
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div>
      <h2>blogs</h2>
      {success && <p>{success}</p>}
      {user.name} logged in
      <button onClick={(event) => handleLogout(event)}>logout</button>
      <Togglable buttonLabel="new blog" ref={blogCreationRef} >
        <BlogCreation handleCreate={handleCreate} />
      </Togglable>
      {bloglist.map(blog =>
        <Blog key={blog.id} username={user.username} handleRemove={handleRemove} handleLike={handleLike} blog={blog} />
      )}
    </div>
  )
}