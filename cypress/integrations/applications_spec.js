import Routes from '../support/routes'
import Utils from '../support/utils'

describe('Applications', function() {
  beforeEach(function() {
    cy.saveSeedsToLocalStorage()
  })

  context('Without sign_in', function(){
    context('Show', function(){
      beforeEach(function(){
        cy.visit(Routes.companyUrl('test-company'))
      })

      it('have jobs', function() {
        cy.get('a[href="#jobs"]').click()
        cy.get('.filtered-jobs .job-item').should('have.length', 5)
      })

      it('show job', function() {
        cy.get('a[href="#jobs"]').click()
        cy.get('.filtered-jobs .job-item:first a.show-job').click()
        cy.get('.section-job-apply').find('.btn-apply').as('btnApply').should('contain', 'Apply')
        cy.get('@btnApply').click()
        var email = Utils.getRandomEmail()
        cy.get('input#job_application_email').type(email).should('have.value', email).clear().should('have.value', '')
      })
    })

    context('Apply', function(){
      beforeEach(function(){
        var job = Utils.readSeeds('job')
        cy.visit(Routes.applicationsUrl('test-company', job.id))
      })

      it('apply job', function() {
        cy.fillingApplication()
        cy.get('.ca-apply-btn').click()
        cy.location('pathname').should('include', '/resources')
      })

      it('apply job without submit entry', function() {
        cy.fillingApplication({without_submit_entry: true})
        cy.get('.ca-apply-btn').click()
        cy.location('pathname').should('include', '/resources')
      })
    })

    context('Apply with external url', function(){
      beforeEach(function(){
        var job_with_url = Utils.readSeeds('job_with_url')
        cy.visit(Routes.applicationsUrl('test-company', job_with_url.id))
      })

      it('apply job', function() {
        cy.fillingApplication()
        cy.get('.ca-apply-btn').click()
        cy.get('.modal-redirecting').should('contain', 'Redirecting')
        var externalUrl = Cypress.$('.modal-redirecting').data('external-url')
        cy.get('.btn-redirecting').click()
        cy.location('href').should('include', externalUrl)
      })
    })

    context('Apply to full job with questions', function(){
      beforeEach(function(){
        var job = Utils.readSeeds('job_with_questions')
        cy.visit(Routes.applicationsUrl('test-company', job.id))
      })

      it('apply job', function() {
        cy.fillingApplication({with_phone: true, with_address: true, with_cover_letter: true, with_questions: true})
        cy.get('.ca-apply-btn').click()
        cy.location('pathname').should('include', '/resources')
      })
    })

    context('Apply without education', function(){
      beforeEach(function(){
        var job = Utils.readSeeds('job_without_education')
        cy.visit(Routes.applicationsUrl('test-company', job.id))
      })

      it('apply job', function() {
        cy.fillingApplication({without_education: true})
        cy.get('.ca-apply-btn').click()
        cy.location('pathname').should('include', '/resources')
      })
    })

    context('Apply without experience', function(){
      beforeEach(function(){
        var job = Utils.readSeeds('job_without_experience')
        cy.visit(Routes.applicationsUrl('test-company', job.id))
      })

      it('apply job', function() {
        cy.fillingApplication({without_experience: true})
        cy.get('.ca-apply-btn').click()
        cy.location('pathname').should('include', '/resources')
      })
    })
  })
})
