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

import 'cypress-file-upload';

Cypress.Commands.add('uploadFile', (fileName, input, mime) => {
    cy.fixture(fileName).then(fileContent => {
        cy.get(input).upload(
            { fileContent, fileName, mimeType: mime },
            { subjectType: 'input' },);
    });
})

//general - for client and talent
Cypress.Commands.add('openButtonForLogin', () => {
    cy.get('button').contains('Log In').click()
})

Cypress.Commands.add('logoutButton', () => {
    cy.get('a').contains('Log Out').should('have.attr', 'ng-click', 'signout()').click()
})

Cypress.Commands.add('openMobileMenu', () => {
    cy.get('.hide-desktop > .outter__nav--mobile-btn').click()
})

Cypress.Commands.add('clearFieldsLogin', () => {
    cy.get('.ot-home__login-container').within(() => {
        cy.get('[type="email"]').clear()
        cy.get('[type="password"]').clear()
    })
})

Cypress.Commands.add('clearFieldsLoginMobile', () => {
    cy.get('.outter__nav--mobile-container').within(() => {
        cy.get('[type="email"]').clear()
        cy.get('[type="password"]').clear()
        cy.get('button').contains('Log In').click()
    })
})


// for client - login
Cypress.Commands.add('loginAsClient', (email, password = 'password') => {
    cy.server()
    cy.route({
          method: 'POST',
          url: '/authenticate?include=user.account.client'
      }).as('loginApi')
    cy.get('.ot-home__login-container').within(() => {
        email && cy.get('[type="email"]').type(email)
        password && cy.get('[type="password"]').type(password)
        cy.get('button').contains('Log In').click()
    })
})



Cypress.Commands.add('BasicsForDigitalEvent', (title, descr, brand) => {
    title && cy.get('#title').type(title)
    descr && cy.get('#description').type(descr)
    brand && cy.get('#brand').type(brand)
    cy.get('.create-event--logos-item').first().click()
    cy.get('#logo-container > img').should('be.visible')
    cy.get('div').contains('LiveCast').should('be.visible')
})

Cypress.Commands.add('createLiveCast', (number, format, account, hashtag, action, creative) => {
    cy.server()
    cy.route({
          method: 'POST',
          url: '/event?include=shifts,expertises'
      }).as('createCast')
    number && cy.get('#shift0_staff_num').clear().type(number)
    cy.get('#radio_2').click()
    cy.get('#select_option_9').click({force:true})
    cy.get('.create-event--select-option').invoke('attr', 'style', 'display: none')
    cy.get('.md-select-backdrop').invoke('attr', 'style', 'display: none ')
    cy.get('body').invoke('attr', 'style', 'position: relative')
    format && cy.get('#shift0_event_format').type(format)
    cy.get('[aria-label="Brand"]').click()
    account && cy.get('#shift0_brand_account').type(account)
    hashtag && cy.get('#shift0_hashtags').type(hashtag)
    cy.get('div').contains('Visit URL:').click()
    action && cy.get('#shift0_cta_url').type(action)
    creative && cy.get('#shift0_guidelines').scrollIntoView().type(creative)
    cy.uploadFile('file.pdf', '#upload-file-cast', 'image/pdf')
    cy.get('button').contains('Publish Event').click()
})

Cypress.Commands.add('createLiveBlast', (number, action, caption) => {
    cy.server()
    cy.route({
          method: 'POST',
          url: '/event?include=shifts,expertises'
      }).as('createBlast')
    number && cy.get('#shift0_staff_num').clear().type(number)
    cy.get('[value="instagram"]').click()
    cy.get('[aria-label="Story"]').click({force:true})
    cy.get('[aria-label="Live"]').click({force:true})
    cy.get('[aria-label="In-Feed"]').click({force:true})
    cy.get('[aria-label="Share Brand Post"]').click({force:true})
    cy.get('#select_option_10').click({force:true})
    cy.get('.create-event--select-option').invoke('attr', 'style', 'display: none')
    cy.get('.md-select-backdrop').invoke('attr', 'style', 'display: none ')
    cy.get('body').invoke('attr', 'style', 'position: relative')
    cy.get('div').contains('Visit URL:').click()
    action && cy.get('#shift0_cta_url').type(action)
    cy.uploadFile('file.pdf', '#upload-file-blast', 'image/pdf')
    caption && cy.get('#shift0_caption').scrollIntoView().type(caption)
    cy.get('button').contains('Publish Event').click()
})

