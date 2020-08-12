// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}

require('mocha-allure-reporter');

module.exports = (on) => {
  on('task', {
    allureTestStep () {
      const testStep = allure.createStep("initial", () => {
        
      });

      return null
    }
  })
}
module.exports = (on) => {
  on('task', {
    allureAttachement (){
      allure.createAttachement(name, content, [type])

      return null
    }
  })
}

module.exports = (on, config) => {
  on('task', {
    setAllureSeverity: () => {
      allure.severity(allure.SEVERITY)
      return null
    } 
  })
}