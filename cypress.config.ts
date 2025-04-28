const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'oxqj7i',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

    },
  reporter: 'cypress-mochawesome-reporter',
  baseUrl: 'http://localhost:8080',
  reporterOptions: {
    embeddedScreenshots: true,
    inlineAssets: true,
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true
  }
}


});