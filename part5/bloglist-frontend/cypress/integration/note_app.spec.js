describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Stepan',
      username: 'stepan.t',
      password: 'piotr'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    cy.contains('Log in to application')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('stepan.t')
      cy.get('#password').type('piotr')
      cy.get('#login-button').click()
      cy.contains('Stepan logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('stepan.t')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Stepan logged in')
    })
  })

  describe('when logged in', function() {

    beforeEach(function() {
      cy.login({ username: 'stepan.t', password: 'piotr' })
    })

    it('a new blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Title by Cypress')
      cy.get('#author').type('Cauthor')
      cy.get('#url').type('www.cyblog.press')
      cy.get('#createBlog').click()
      cy.contains('A new blog Title by Cypress by Cauthor has been created.')
      // Make sure it was added to the list of blogs
      cy.get('.listOfBlogs').contains('Title by Cypress')
    })

    it('a blog can be liked', function() {
      cy.createBlog({
        title: 'Title by Cypress',
        author: 'Cauthor',
        url: 'http://www.cyblog.press'
      })
      cy.contains('Title by Cypress').find('button').click()
      cy.contains('Title by Cypress').parent().find('.numberOfLikes').should('contain', 'likes: 0')
      cy.contains('Title by Cypress').parent().find('.likeButton').click()
      cy.contains('Title by Cypress').parent().find('.numberOfLikes').should('contain', 'likes: 1')
    })

    it('a blog can be deleted by the user who added it', function() {
      cy.createBlog({
        title: 'Title by Cypress',
        author: 'Cauthor',
        url: 'http://www.cyblog.press'
      })
      cy.contains('Title by Cypress').find('button').click()
      cy.get('.listOfBlogs').should('contain', 'Title by Cypress')
      cy.contains('Title by Cypress').parent().find('.removeBlogButton').click()
      cy.get('.listOfBlogs').should('not.contain', 'Title by Cypress')
    })

  })
})
