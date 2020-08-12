describe('Log in Client', () => {
  describe(' : layout', () => {
      
    beforeEach(function () {
      cy.visit(Cypress.env('host_client'))
      cy.viewport(Cypress.env('viewport_dekstop_client'))
      cy.clearCookie('token')
      cy.openButtonForLogin()
    })

    it('check form fields', () => {
      cy.get('[type="email"]').should('be.visible')
      cy.get('[type="password"]').should('be.visible')
    })
  
    it('check buttons', () => {
      cy.get('a').contains('Forgot Password?').should('have.attr', 'href', '/forgot')
      cy.get('a').contains('Talent Application').should('have.attr', 'href', Cypress.env('host_talent')+'/signup')
      cy.get('a').contains('Brand Sign Up').should('have.attr', 'href', '/signup')
    })

  })



describe(' : flow', () => {
 
  beforeEach(function () {
    cy.visit(Cypress.env('host_client'))
    cy.viewport(Cypress.env('viewport_dekstop_client'))
    cy.clearCookie('token')
    cy.openButtonForLogin()
  })

  it('send empty form', () => {
    cy.loginAsClient('   ', '')
    cy.get('.ot-form__error').contains('Email is required')
    cy.get('.ot-form__error').contains('Password is required')
        
  })

  it('loggin with invalid email and invalid password', () => {
    cy.clearFieldsLogin()
    cy.loginAsClient('test@', 'aaaaaaa ')
    cy.get('.ot-form__error').contains('Enter a valid email')
    })

  it('loggin with invalid email without @ and valid password', () => {
    cy.clearFieldsLogin()
    cy.loginAsClient('d.yermolova+talentcypress.newlinetechnologies.net', '12345678')
    cy.get('.ot-form__error').contains('Enter a valid email')
  })

  it('loggin with valid email and invalid password', () => {
    cy.clearFieldsLogin()
    cy.loginAsClient(Cypress.env("email_client"), 'AAAAAA')
    cy.wait('@loginApi').its('status').should('eq', 400)
    cy.get('.ot-form__error').contains('Email and password do not match')
  })
    
  it('Login as Client', () => {
    cy.clearFieldsLogin()
    cy.loginAsClient(Cypress.env('email_client'), Cypress.env('password_client'))
    cy.wait('@loginApi').its('status').should('eq', 200).then(() => {
      cy.url().should('include', '/events/upcoming');
    });
    cy.get('.ot-header__nav-user-name').contains(Cypress.env('first_name_client')+' '+Cypress.env('last_name_client'))
    cy.logoutButton()
    cy.getCookie('token').should('be.null')

  })

  
  
  
})
})