import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  const user = { name: 'me' }

  const component = render(
    <BlogForm createBlog={createBlog} user={user} />
  )

  const inputTitle = component.getByText('title:').querySelector('input')
  // Another way of accessing the input field
  const inputAuthor = component.container.querySelector('#author')
  const inputURL = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'A Radom Author' }
  })
  fireEvent.change(inputURL, {
    target: { value: 'www.test.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
  expect(createBlog.mock.calls[0][0].author).toBe('A Radom Author')
  expect(createBlog.mock.calls[0][0].url).toBe('www.test.com')
  expect(createBlog.mock.calls[0][0].user.name).toBe('me')

})