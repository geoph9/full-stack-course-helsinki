import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'


describe('<Blog />', () => {
  let blog, user, component, mockRemoveHandler, mockIncreaseHandler
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
    mockRemoveHandler = jest.fn()
    mockIncreaseHandler = jest.fn()
    component = render(
      <Blog
        blog={blog}
        user={user}
        removeBlog={mockRemoveHandler}
        increaseLikes={mockIncreaseHandler}
      />
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
    // Since the details are not shown then the short description must be shown
    // where the short description is the title and the author's name.
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

  test('like: clicking the button twice calls event handler twice', () => {

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockIncreaseHandler.mock.calls).toHaveLength(2)
  })

  test('clicking the button calls event handler once', () => {

    const button = component.getByText('remove')
    fireEvent.click(button)

    expect(mockRemoveHandler.mock.calls).toHaveLength(1)
  })
})