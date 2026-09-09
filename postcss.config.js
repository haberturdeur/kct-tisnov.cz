// Local copy from hugo-theme-bootstrap v1.7.1: keep Node reads inside the project.

const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    // Explicit defaults avoid Browserslist searching parent directories.
    autoprefixer({ overrideBrowserslist: ['defaults'], stats: {} }),
    ...process.env.HUGO_ENVIRONMENT === 'production'
      ? [require('./purgecss.config.js').default]
      : [],
  ]
}
