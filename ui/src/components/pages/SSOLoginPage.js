import _ from 'lodash'
import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import React, { Fragment, useEffect, useState, useCallback } from 'react'

import Body from 'components/onboarding/Body'
import Card from 'components/onboarding/Card'
import CardFootnote from 'components/onboarding/CardFootnote'
import Content from 'components/onboarding/Content'
import LoaderView from 'components/LoaderView'
import { Text, TextLink } from 'components/onboarding/typography'
import CardWrapper from 'components/onboarding/CardWrapper'
import { withMutation } from 'lib/data'

const SsoLoginStates = Object.freeze({
  NONE: 'none',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success'
})

function SsoLoginPage({ ssoLogin }) {
  const [ ssoLoginState, setSsoLoginState ] = useState(SsoLoginStates.NONE)
  const executeSsoLogin = useCallback(() => {
    setSsoLoginState(SsoLoginStates.LOADING)
    ssoLogin(null, {
      onSuccess: (response) => {
        const ssoUrl = _.get(response, 'data.ssoLogin.ssoUrl')
        setSsoLoginState(SsoLoginStates.SUCCESS)
        window.location.replace(ssoUrl)
      },
      onFailure: () => {
        setSsoLoginState(SsoLoginStates.ERROR)
      }
    })
  }, [ ssoLogin ])

  useEffect(executeSsoLogin, [])

  const renderContent = () => {
    if (ssoLoginState === SsoLoginStates.LOADING) {
      return <LoaderView overlay />
    }

    if (ssoLoginState === SsoLoginStates.ERROR) {
      return (
        <Text color="dark">
          Failed to redirect.
          {' '}
          {/* eslint-disable jsx-a11y/anchor-is-valid */}
          <TextLink variant="dark" onClick={executeSsoLogin}>Try again.</TextLink>
        </Text>
      )
    }

    return (
      <Text color="dark">
        Please wait one moment.
      </Text>
    )
  }

  return (
    <Fragment>
      <Helmet>
        <title>
          SSO Login
        </title>
      </Helmet>
      <Body>
        <Content>
            Redirecting...
        </Content>
        <CardWrapper>
          <Card>
            {renderContent()}
          </Card>
          <CardFootnote>
            <Text>
              Having trouble?
              {' '}
              <TextLink href="mailto:support@claycms.io">Contact support</TextLink>
              {' '}
              for help.
            </Text>
          </CardFootnote>
        </CardWrapper>
      </Body>

    </Fragment>
  )
}

SsoLoginPage = withMutation(gql`
  mutation SsoLoginMutation {
    ssoLogin
  }
`)(SsoLoginPage)

export default SsoLoginPage
