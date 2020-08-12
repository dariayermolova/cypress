describe('Create new digital event: live blast', () => {
 
  describe.skip(' : for basics', () => {
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
      cy.get('button').contains('Create event ').click()
      cy.get('a').contains('Digital Event').click()
      cy.url().should('include', '/digital-event')
      cy.wait(1000)
    })

    it('upload invalid file as logo', () => {
      cy.uploadFile('example.json', '#upload-logo', '	application/json')
      cy.wait(1500)
      cy.contains('Please upload an image file in jpeg, jpg, or png formats').should('be.visible')
    })

    it('upload large logo', () => {
      cy.uploadFile('largeimage.jpeg', '#upload-logo', 'image/jpeg')
      cy.wait(1500)
      cy.contains('Please upload an image less than 1500x1500px').should('be.visible')
    })

    it('upload small logo', () => {
      cy.uploadFile('stift.png', '#upload-logo', 'image/png')
      cy.contains('Please upload an image greater than 100x100px').should('be.visible')
    })

  })

  describe.skip(' : negative for blast', () => {
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
      cy.get('button').contains('Create event ').click()
      cy.get('a').contains('Digital Event').click()
      cy.url().should('include', '/digital-event')
      cy.wait(1000)
      cy.BasicsForDigitalEvent('digital event', 'Lorem ipsum dolor sit amet, consectetur adipiscing el', 'spacex')
      cy.get('md-checkbox').eq(2).click()
      cy.get('.create-event__shift-title').contains('LiveBlast').should('be.visible')
    })

   
    it('save without data', () => {
      cy.wait(500)
      cy.get('button').contains('Publish Event').click()
      cy.contains('Number of Talent is required').should('be.visible')
      cy.contains('Channel is required').should('be.visible')
      cy.contains('At least 1 is required').should('be.visible')
      cy.contains('Area is required').should('be.visible')
      cy.contains('At least 1 is required').should('be.visible')
      cy.contains('Caption is required').should('be.visible')
    })

    it('check negative number of talents', () => {
      cy.get('#shift0_staff_num').type("-10")
      cy.get('button').contains('Publish Event').click()
      cy.contains('Number of Talent is required').should('be.visible')
     })
 
    it('check more number of talents', () => {
      cy.get('#shift0_staff_num').type("10000000")
      cy.get('button').contains('Publish Event').click()
      cy.contains('Max number is 1000').should('be.visible')
    })
     
    it('check lesser then 3 actions', () => {
      cy.get('div').contains('Visit URL:').click()
      cy.get('div').contains('Follow:').click()
      cy.get('div').contains('Subscribe:').click()
      cy.get('[aria-label="Shop Now"]').should('have.attr', 'disabled', 'disabled')

    })

    it('upload invalid file as creative', () => {
      cy.uploadFile('example.json', '#upload-file-blast', '	application/json')
      cy.wait(1000)
      cy.contains('Please upload a file in pdf, jpg, or png formats').should('be.visible')
    })

    it('upload large creative', () => {
      cy.uploadFile('largefile.pdf', '#upload-file-blast', 'image/pdf')
      cy.wait(1000)
      cy.contains('Please upload a file less than 5 megabyte').should('be.visible')
    })

   
  })

  describe(' : positive for blast', () => {
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
      cy.get('button').contains('Create event ').click()
      cy.get('a').contains('Digital Event').click()
      cy.url().should('include', '/digital-event')
      cy.wait(1000)
      cy.BasicsForDigitalEvent('digital event', 'Lorem ipsum dolor sit amet, consectetur adipiscing el', 'spacex')
      cy.get('md-checkbox').eq(2).click()
      cy.get('.create-event__shift-title').contains('LiveBlast').should('be.visible')
    })

    after.skip(function ( ){
      cy.visit(Cypress.env("host_client")+ '/events/upcoming')
      cy.wait(5000)
      cy.get('a').contains('Cancel').click({force: true})
      cy.get('button').contains(' Remove ').click({force: true})
    })


    it('create live blast and check search page', () => {
      cy.createLiveBlast('2', 'action', 'caption')
      //cy.wait(2000)
      cy.wait('@createBlast').then((xhr) => {
          expect(xhr.responseBody).to.not.be.null
          const idEvent = xhr.responseBody.data.id


          cy.url().should('include', '/events/'+ idEvent+ '/search/')
      })


        
      })
    })

   

  })
 
    