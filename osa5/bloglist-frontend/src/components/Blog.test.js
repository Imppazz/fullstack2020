import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    const blog = {
        title: 'Testiblog',
        author: 'Ilmari',
        url: 'testi.fi',
        user: {
            username: 'testuser',
            name: 'testuser'
        }
    }
    const user = {
        username: 'testuser',
        name: 'testuser',
        password: 'testuser'
    }

    test('renders title and author but not url or likes', () => {
        const component = render(
            <Blog key={blog.id} blog={blog} user={user} />
        )
    
        expect(component.container).toHaveTextContent(
            'Testiblog Ilmari'
        )
        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

    test('clicking the view shows url and likes', async () => {     
        const mockHandler = jest.fn()

        const component = render(
            <Blog key={blog.id} blog={blog} user={user} />
        )
      
        const button = component.getByText('view')
        fireEvent.click(button)
      
        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    test('clicking the like button calls event handler twice', async () => {
        const mockHandler = jest.fn()

        const component = render(
            <Blog key={blog.id} blog={blog} user={user} handleLikes={mockHandler} />
        )
      
        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)
      
        expect(mockHandler.mock.calls.length).toBe(2)
      })
})