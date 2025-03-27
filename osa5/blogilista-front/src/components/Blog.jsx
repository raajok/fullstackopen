import { useState } from "react"

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ username, handleRemove, handleLike, blog }) => {
  const [showAll, setShowAll] = useState(false)

  if (showAll) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setShowAll(false)}>hide</button>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button onClick={() => handleLike(blog)}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {username === blog.user.username && <button onClick={() => handleRemove(blog)}>remove</button>}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShowAll(true)}>view</button>
    </div>
  )
}

export default Blog