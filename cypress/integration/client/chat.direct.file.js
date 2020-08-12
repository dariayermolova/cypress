describe('Check direct chat', () => {
  describe(' : upload files', () => {
    beforeEach(function () {
      cy.visit(Cypress.env("host_client"))
      cy.viewport(Cypress.env('viewport_dekstop_client'))
      cy.clearCookie('token')
      cy.openButtonForLogin()
      cy.loginAsClient(Cypress.env('email_client'), Cypress.env('password_client'))
      cy.wait('@loginApi').its('status').should('eq', 200).then(() => {
        cy.wait(5000)
        cy.url().should('include', '/events/upcoming')
      })

      cy.get('span').contains('Messages').click()
      //cy.get('[li="cursor-pointer"]').first().click()
      cy.wait(500)
      cy.get('[data-channel-id="'+Cypress.env("uuid_chat_direct")+'"]').click()
      cy.get('.conversation__name').contains('autotest').should('be.visible')
    })

    it('upload invalid image', () => {
      cy.uploadFile('example.json', '#img-input', '	application/json')
      cy.wait(1000)
      cy.get('.chat__error-box').contains(' Invalid format ').should('be.visible')
    })

    it('upload large image', () => {
      cy.uploadFile('largeimage.jpeg', '#img-input', 'image/jpeg')
      cy.wait(1000)
      cy.get('.chat__error-box').contains(' Please upload a file less than 10 megabytes ').should('be.visible')
    })

    it('upload image', () => {
      cy.uploadFile('cat.jpg', '#img-input', 'image/jpeg')
      cy.wait(1000)
      cy.get('.message-img').should('be.visible').click()
      cy.get('.modal-content').should('be.visible')
      cy.get('.close').click()
      cy.get('.modal-content').should('be.not.exist')
      cy.get('.message').contains('You: cat.jpg').should('be.visible')
      cy.wait(1000)
      cy.get('[ng-click="deleteMessage(Message)"]').click({force: true})
    })

    it('upload invalid file', () => {
      cy.uploadFile('example.json', '#doc-input', '	application/json')
      cy.wait(1000)
      cy.get('.chat__error-box').contains(' Invalid format ').should('be.visible')
    })

    it('upload large file', () => {
      cy.uploadFile('largefile.pdf', '#doc-input', 'application/pdf')
      cy.wait(1000)
      cy.get('.chat__error-box').contains(' Please upload a file less than 10 megabytes ').should('be.visible')
    })

    it('upload file', () => {
      cy.uploadFile('file.pdf', '#doc-input', 'application/pdf')
      cy.wait(1000)
      cy.get('.message').contains('You: file.pdf').should('be.visible')
      cy.wait(1000)
      cy.get('[ng-click="deleteMessage(Message)"]').click({force: true})
    })

  
    
  })

 
})
    