import Routes from '../support/routes'
import Utils from '../support/utils'

describe('Test', function() {
  beforeEach(function() {
    cy.saveSeedsToLocalStorage()
  })

  context('Tests for candidates', function(){
    beforeEach(function(){
      var candidate = Utils.readSeeds('candidate')
      var user_test = Utils.readSeeds('user_test')
      cy.signIn(candidate.email)
      cy.visit(Routes.testUrl(user_test.id))
    })

    it ("Run", function() {
      cy.contains('Practice questions')
      cy.contains('Start').click()

      cy.get('.iradio').first().click({force: true})
      cy.contains('Submit').click({force: true})

      cy.get('.iradio').first().click({force: true})
      cy.contains('Submit').click({force: true})

      cy.contains('You have completed the test')
    })
  })
})
