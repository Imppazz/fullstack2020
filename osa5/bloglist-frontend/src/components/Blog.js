import React, { useState } from 'react'

const Blog = ({ blog, handleLikes, handleDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}> view </button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
          <p> {blog.title} {blog.author} <button onClick={toggleVisibility}> hide </button> </p>
          <p> {blog.url} </p>
          <p> Likes: {blog.likes} <button onClick={({target}) => handleLikes(blog)}> like </button> </p>
          <p> {blog.user.name} </p>
          {blog.user.username === user.username &&
          <p><button onClick={({target}) => handleDelete(blog)}>delete</button></p>}
      </div>
    </div>
)}

export default Blog
