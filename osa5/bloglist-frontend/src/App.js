import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState()
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = React.createRef()

  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessageType(1)
      setErrorMessage(`${user.name} logged in`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setMessageType(0)
      setErrorMessage('invalid username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.create({ title, author, url })
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessageType(1)
      setErrorMessage(`a new blog ${title} by ${user.name} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setMessageType(0)
      setErrorMessage('Title or url missing')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLikes = async (blog) => {
    const newLikes = blog.likes + 1
    const updatedBlog = {
        likes: newLikes
    }
    await blogService.update(blog.id, updatedBlog)
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(blogs)
  }
  const handleDelete = async (blog) => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.user.name}`)) {     
      try {
        await blogService.remove(blog.id)
        const blogs = await blogService.getAll()
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(blogs)
        setMessageType(1)
        setErrorMessage(`blog ${blog.title} removed`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      } catch (exception) {
        setMessageType(0)
        setErrorMessage('Unauthorized user')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <CreateForm
        title={title}
        author={author}
        url={url}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
        handleSubmit={handleCreate}
      />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h1>Log in to application</h1>

        <Notification message={errorMessage} id={messageType} />

        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={errorMessage} id={messageType} />

      <form onSubmit={handleLogout}>
        <div>
            <p> {user.name} logged in <button type="submit">logout</button> </p>
        </div>
      </form>
        
      {blogForm()}

      <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleDelete={handleDelete} user={user}/>
          )}
      </div>
    </div>
  )
}

export default App