import Routes from '../support/routes'
import Utils from '../support/utils'

describe('Company', function() {
  beforeEach(function() {
    cy.saveSeedsToLocalStorage()
  })

  context('Sign up', function(){
    beforeEach(function(){
      cy.visit(Routes.rootUrl())
    })

    it ("Registrate employer with existing domain", function() {
      cy.contains("Sign up").click()
      cy.contains("As an employer").click()
      cy.get("input[name=work_email]").type(Utils.getRandomEmail('test-company.com'))
      cy.contains("Next").click()

      cy.get("#company_sign_up_first_name").type("Test")
      cy.get("#company_sign_up_last_name").type("Cypress")
      cy.get("#company_sign_up_password").type(Utils.getPassword())
      cy.get("#company_sign_up_password_confirmation").type(Utils.getPassword())
      cy.contains('Sign up').click()
      cy.contains("In order to proceed please confirm your email. You can do this by following the link in the confirmation email we sent to you.")
    })

    it ("Registrate employer with new domain", function() {
      cy.contains("Sign up").click()
      cy.contains("As an employer").click()
      cy.get("input[name=work_email]").type(Utils.getRandomEmail())
      cy.contains("Next").click()

      cy.get("#company_sign_up_company_name").type(Utils.getRandomText())
      cy.get("#company_sign_up_first_name").type("Test")
      cy.get("#company_sign_up_last_name").type("Cypress")
      cy.get("#company_sign_up_password").type(Utils.getPassword())
      cy.get("#company_sign_up_password_confirmation").type(Utils.getPassword())
      cy.contains('Sign up').click()
      cy.contains("In order to proceed please confirm your email. You can do this by following the link in the confirmation email we sent to you.")
    })

    it ("Cancel invitation", function() {
      var employer = Utils.readSeeds('employer')
      cy.signIn(employer.email)
      cy.url().should('include', '/dashboard') //to ensure success
      cy.contains("Signed in successfully")
      cy.visit(Routes.hiringTeamsUrl('test-company'))
      cy.contains("Test Cypress").parents('.cy-company-user').find('.delete-member i').click()
      cy.contains("Invitation cancelled")
    })
  })
})
