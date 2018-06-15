import Routes from '../support/routes'
import Utils from '../support/utils'

describe('User', function() {
  beforeEach(function() {
    cy.saveSeedsToLocalStorage()
  })

  context('Sign in, Sign out, Reset password', function(){
    beforeEach(function(){
      cy.visit(Routes.rootUrl())
    })

    it ("sign in", function(){
      var candidate = Utils.readSeeds('candidate')
      cy.contains("Login").click()
      cy.get('#user_email').type(candidate.email).should('have.value', candidate.email)
      cy.get('#user_password').type(Utils.getPassword())
      cy.get('.cy-sign-in-btn').click()
      cy.url().should('include', '/resources')
      cy.contains("Signed in successfully")
    })

    it ("sign out", function(){
      var candidate = Utils.readSeeds('candidate')
      cy.signIn(candidate.email)
      cy.get('.close-alert').click() //close alert
      cy.get('.cy-user-menu-dd').click() //dropdown
      cy.contains('Sign out').click() //sign out
      cy.contains('Signed out successfully.') //to ensure success
    })

    it ("reset password", function(){
      var candidate = Utils.readSeeds('candidate')
      cy.contains("Login").click()
      cy.contains("Forgot your password?").click()
      cy.get('#user_email').type(candidate.email)
      cy.get('.cy-reset-btn').click()
      cy.contains('You will receive an email with instructions on how to reset your password in a few minutes.')
    })
  })
})
