import { useState, useEffect } from 'react'
import Blog from "./Blog";
import blogService from '../services/blogs'
import BlogCreation from './BlogCreation';

export default function Blogs({ user, setUser }) {
  const [bloglist, setBloglist] = useState([])
  const [success, setSuccess] = useState(null)

  useEffect(() => {
      blogService.getAll().then(response =>
        setBloglist(response)
      )  
    }, [])

  const handleLogout = (event) => {
    event.preventDefault();

    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div>
      <h2>blogs</h2>
      {success && <p>{success}</p>}
      {user.name} logged in
      <button onClick={(event) => handleLogout(event)}>logout</button>
      {bloglist.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <BlogCreation user={user} bloglist={bloglist} setBloglist={setBloglist} setSuccess={setSuccess} />
    </div>
  )
}