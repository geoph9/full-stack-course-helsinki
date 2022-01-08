import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'


describe('<Blog />', () => {
  let blog, user, component, mockHandler
  beforeEach(() => {
    blog = {
      title: 'Random Blog',
      author: 'Me',
      url: 'http://blog.com',
      likes: 1
    }

    user = {
      name: 'Faust'
    }
    blog['user'] = user
    mockHandler = jest.fn()
    component = render(
      <Blog blog={blog} user={user} removeBlog={mockHandler} />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'Random Blog Me'
    )
    expect(component.container).toHaveTextContent(
      'http://blog.com'
    )
    expect(component.container).toHaveTextContent(
      'likes: 1 like'
    )
  })

  test('By default does not render url and likes', () => {
    const expandedDescr = component.container.querySelector('.blogDetailsExpanded')
    expect(expandedDescr).toHaveStyle('display: none')
    const shortDescr = component.container.querySelector('.blogDetailsShort')
    expect(shortDescr).not.toHaveStyle('display: none')
  })
  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    const shortDescr = component.container.querySelector('.blogDetailsShort')
    expect(shortDescr).toHaveStyle('display: none')
    const expandedDescr = component.container.querySelector('.blogDetailsExpanded')
    expect(expandedDescr).not.toHaveStyle('display: none')
  })

  test('clicking the button calls event handler once', () => {

    const button = component.getByText('remove')
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})