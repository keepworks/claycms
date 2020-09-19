import * as Sentry from '@sentry/browser'
import React from 'react'
import { render } from 'react-dom'

import * as models from 'models'
import Root from './Root'

const rootEl = document.getElementById('root')

const renderClient = () => {
  render(
    <Root />,
    rootEl
  )
}

const initErrorTracking = () => Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: process.env.HEROKU_SLUG_COMMIT
})

const autoBindModelMethods = () => {
  Object.values(models).forEach((model) => {
    const actions = Object.getOwnPropertyNames(model)

    actions
      .filter(action => typeof model[action] === 'function')
      .forEach((action) => { model[action] = model[action].bind(model) })
  })
}

const initApp = () => {
  initErrorTracking()
  autoBindModelMethods()
  renderClient()
}

initApp()
