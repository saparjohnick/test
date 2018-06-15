import Routes from '../support/routes'
import Utils from '../support/utils'

describe('Company', function() {
  beforeEach(function() {
    cy.saveSeedsToLocalStorage()
  })

  context('Edit Profile', function(){
    beforeEach(function(){
      var employer = Utils.readSeeds('employer')
      cy.signIn(employer.email)
      cy.get('.fa.fa-folder-open').click()
    })

    it ('General', function() {
      cy.get('#general').within(($form) => {
        cy.get('#company_name').clear({force: true}).type('Company')
        cy.get('#company_motto').clear({force: true}).type('Motto')
        cy.selectFirstChosen('#general #company_industry')
        cy.get('#company_color').clear({force: true}).type('#111111')
        cy.get('#company_website').clear({force: true}).type(Utils.getExampleUrl())
        cy.get('button[type=submit]').click({ force: true })
      })
      cy.get('#description').should('have.class', 'active')
    })

    it ('Description', function() {
      cy.get('a[href="#description"] span').click({force: true})
      cy.get('#description').within(($form) => {
        cy.get('#company_desc_text').clear({force: true}).type('Desc text')
        cy.get('#company_desc_type_video').parent().click({force: true})
        cy.get('#company_desc_video').clear({force: true}).type(Utils.getExampleUrl())
        cy.get('button[type=submit]').click({ force: true })
      })
      cy.get('#keyPerson').should('have.class', 'active')
    })

    it ('Key person', function() {
      cy.get('a[href="#keyPerson"] span').click({force: true})
      cy.get('#keyPerson').within(($form) => {
        cy.uploadImage('#keyPerson #company_influencer_avatar_uploader')
        cy.get('#company_influencer_name').clear({force: true}).type('Name')
        cy.get('#company_influencer_position').clear({force: true}).type('Position')
        cy.get('#company_influencer_bio').clear({force: true}).type('Text')
        cy.get('#company_influencer_desc_type_video').parent().click({force: true})
        cy.get('#company_influencer_video').clear({force: true}).type(Utils.getExampleUrl())
        cy.get('button[type=submit]').click({ force: true })
      })
      cy.get('#team').should('have.class', 'active')
    })

    it ('Team', function() {
      cy.get('a[href="#team"] span').click({force: true})
      cy.get('#team').within(($form) => {
        cy.uploadImage('#team .team-member-photo-uploader.team-member-photo')
        cy.get('.cy-member-name').last().clear({ force: true }).type('Test Cypress')
        cy.get('.cy-member-position').last().clear({ force: true }).type('Good position for CY')
        cy.get('.cy-member-bio').last().clear({ force: true }).type('Call me Cypress!')
        cy.get('#company_team_desc_type_video').parent().click({force: true})
        cy.get('#company_team_desc_video').clear({force: true}).type(Utils.getExampleUrl())
        cy.get('button[type=submit]').click({ force: true })
      })
      cy.get('#headquarters').should('have.class', 'active')
    })

    it ('Headquarters', function() {
      cy.get('a[href="#headquarters"] span').click({force: true})
      cy.get('#headquarters').within(($form) => {
        cy.selectFirstChosen('#headquarters #company_country')
        cy.get('#company_city').clear({force: true}).type('London')
        cy.get('#company_street').clear({force: true}).type('221B, Baker street')
        cy.get('#company_postcode').clear({force: true}).type('NW1 6XE')
        cy.get('button[type=submit]').click({ force: true })
      })
      cy.get('#recruitmentPrograms').should('have.class', 'active')
    })

    it ('Recruitment programms', function() {
      cy.get('a[href="#recruitmentPrograms"] span').click({force: true})
      cy.get('#recruitmentPrograms').within(($form) => {
        cy.get('.cy-recruitment-name').clear({force: true}).type('Recruitment program')
        cy.get('.cy-recruitment-start').clear({force: true}).type('Jul')
        cy.get('.cy-recruitment-finish').clear({force: true}).type('December')
        cy.get('button[type=submit]').click({ force: true })
      })
      cy.get('#freeText').should('have.class', 'active')
    })

    it ('Free text', function() {
      cy.get('a[href="#freeText"] span').click({force: true})
      cy.get('#freeText').within(($form) => {
        cy.get('#company_free_text_attributes_title').clear({force: true}).type('Free text')
        cy.setDataCkeditor('company_free_text_attributes_text', 'Free text')
        cy.get('button[type=submit]').click({ force: true })
      })
    })
  })
})
