// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import Routes from '../support/routes'
import Utils from '../support/utils'

Cypress.Commands.add("saveSeedsToLocalStorage", () => {
  cy.fixture('seeds').then(function(json){
    localStorage.setItem('cySeeds', JSON.stringify(json));
  })
})

Cypress.Commands.add("signIn", (email) => {
  var auth = cy.getCookie('signed_in')
  if(auth.value == 1) {
    cy.get('.cy-user-menu-dd').click()
    cy.contains('Sign out').click()
  }
  cy.clearCookies()
  cy.visit(Routes.rootUrl())
  cy.contains("Login").click()
  cy.get('#user_email').type(email)
  cy.get('#user_password').type(Utils.getPassword())
  cy.get('.cy-sign-in-btn').click()
})

Cypress.Commands.add("signOut", () => {
  cy.visit(Routes.rootUrl())
  cy.get('.cy-user-menu-dd').click()
  cy.contains('Sign out').click()
})

Cypress.Commands.add("selectFirstChosen", (selector) => {
  Cypress.$(selector+' option:nth(1)').prop('selected',true);
  Cypress.$(selector).trigger('chosen:updated');
})

Cypress.Commands.add("iCheckRadio", (selector) => {
  cy.window().then((win) => {
    win.$(selector).iCheck('check')
  })
})

Cypress.Commands.add("setDataCkeditor", (key, data) => {
  cy.window().then((win) => {
    var editor = win.CKEDITOR.instances[key]
    if (editor) editor.destroy(true)
    win.CKEDITOR.replace(key)
    win.CKEDITOR.instances[key].setData(data)
  })
})

Cypress.Commands.add("uploadImage", (selector) => {
  cy.window().then((win) => {
    cy.fixture("images/photo.png").then((photo) => {
      Cypress.Blob.base64StringToBlob(photo, "image/png").then(function(blob){
        var file = new File([blob], 'photo.png', {type: "image/png"})
        win.$(selector+' .upload-content').fileupload("add", {files: file})
      })
    })
  })
})

Cypress.Commands.add("uploadResume", (selector) => {
  cy.window().then((win) => {
    cy.fixture("files/cv.pdf").then((cv) => {
      Cypress.Blob.base64StringToBlob(cv, "application/pdf").then(function(blob){
        var file = new File([blob], 'cv.pdf', {type: "application/pdf"})
        win.$(selector+' .upload-content').fileupload("add", {files: file})
      })
    })
  })
})

Cypress.Commands.add("fillingApplication", (options) => {
  cy.get('#job_application_email').type(Utils.getRandomEmail())
  cy.get('#job_application_first_name').type('first name')
  cy.get('#job_application_last_name').type('last name')

  if(options && options.with_phone){
    cy.get('#job_application_phone').type('1234567890')
  }

  if(options && options.with_address){
    cy.selectFirstChosen('#job_application_country')
    cy.get('#job_application_city').type('city')
    cy.get('#job_application_street').type('street')
    cy.get('#job_application_postcode').type('123456')
  }

  if(!(options && options.without_experience)){
    cy.selectFirstChosen('#experience-industries')
    cy.selectFirstChosen('#experience-job_functions')
    cy.get('#experience-title').type('company')
    cy.get('#experience-start').type('01.2017')
    if(!(options && options.without_submit_entry)) cy.get('.add-experience').click()
  }

  if(!(options && options.without_education)){
    cy.get('#degree-university').type('university')
    cy.selectFirstChosen('#degree-degree')
    cy.selectFirstChosen('#degree-major')
    cy.get('#degree-start').type('01.2017')
    if(!(options && options.without_submit_entry)) cy.get('.add-degree').click()
  }

  cy.selectFirstChosen('#language-name')
  cy.selectFirstChosen('#language-level')
  if(!(options && options.without_submit_entry)) cy.get('.add-language').click()

  if(options && options.with_cover_letter){
    cy.get('#job_application_cover_letter').type('cover letter')
  }

  if(options && options.with_questions){
    var job = Utils.readSeeds('job_with_questions')
    var questions = job.application_form_settings.custom_questions
    Object.keys(questions).forEach(function(key) {
      var q = questions[key]
      switch (q.type) {
        case 'number':
          cy.get('#custom_answers_'+key).type('2')
          break;
        case 'date':
          cy.get('#custom_answers_'+key).type('01.01.2017')
          break;
        case 'text':
          cy.get('#custom_answers_'+key).type('text')
          break;
        default:
          break;
      }
    })
  }
})
