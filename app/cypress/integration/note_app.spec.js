
describe('Note App', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'carmen',
      username: 'carmela',
      password: '1234'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })
  it('frontpage can be opened', () => {
    cy.contains('Notes')
  })

  it('login form can be opened', () => {
    cy.contains('Show login').click()
    cy.get('[placeholder="Username"]').type('carmela')
    cy.get('[placeholder="Password"]').type('1234')
    cy.get('#form-login-button').click()
    cy.contains('New Note')
  })

  it('login fails with wrong password', () => {
    cy.contains('Show login').click()
    cy.get('[placeholder="Username"]').type('wrong')
    cy.get('[placeholder="Password"]').type('1234')
    cy.get('#form-login-button').click()
    cy.get('.error').should('contain', 'Wrong credentials')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'carmela', password: '1234' })
    })

    it('a new note can be created', () => {
      cy.contains('New Note').click()
      cy.get('input').type('a note crated by cypress')
      cy.contains('Save').click()
      cy.contains('a note crated by cypress')
    })

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({
          content: 'A note created from cypress',
          important: false
        })
      })

      it('can be made important', () => {
        cy.contains('A note created from cypress').as('theNote')

        cy.get('@theNote')
          .contains('make important')
          .click()

        cy.debug()

        cy.get('@theNote')
          .contains('make not important')
      })
    })
  })
})
