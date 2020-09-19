import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { ThemeProvider } from 'react-jss'

import App from 'components/App'
import AppLoader from 'components/AppLoader'
import ClientProvider from 'components/ClientProvider'
import theme from 'styles/theme'

function Root() {
  return (
    <ThemeProvider theme={theme}>
      <ClientProvider>
        {({ apolloClient }) => {
          if (!apolloClient) {
            return <AppLoader />
          }

          return (
            <ApolloProvider client={apolloClient}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ApolloProvider>
          )
        }}
      </ClientProvider>
    </ThemeProvider>
  )
}

export default hot(module)(Root)
