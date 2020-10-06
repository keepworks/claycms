import _ from 'lodash'
import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import React, { Fragment, useEffect, useCallback, useState } from 'react'
import qs from 'qs'

import Body from 'components/onboarding/Body'
import Card from 'components/onboarding/Card'
import CardFootnote from 'components/onboarding/CardFootnote'
import Content from 'components/onboarding/Content'
import LoaderView from 'components/LoaderView'
import CardWrapper from 'components/onboarding/CardWrapper'
import { Text, TextLink } from 'components/onboarding/typography'
import { withClientMutation, withMutation } from 'lib/data'

import SET_TOKEN from 'mutations/session'

const SsoCallbackStates = Object.freeze({
  NONE: 'none',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success'
})

function SsoCallbackPage({ ssoCallback, location, setToken }) {
  const [ ssoCallbackState, setSsoCallbackState ] = useState(SsoCallbackStates.NONE)
  const executeSsoCallback = useCallback(() => {
    setSsoCallbackState(SsoCallbackStates.LOADING)

    const queryParams = qs.parse(location.search.slice(1))

    ssoCallback(queryParams, {
      onSuccess: (response) => {
        const token = _.get(response, 'data.ssoCallback.token')
        setSsoCallbackState(SsoCallbackStates.SUCCESS)
        setToken({ token })
      },
      onFailure: (_error) => {
        setSsoCallbackState(SsoCallbackStates.ERROR)
      }
    })
  }, [ location.search, setToken, ssoCallback ])

  useEffect(executeSsoCallback, [])

  const renderContent = () => {
    if (ssoCallbackState === SsoCallbackStates.LOADING) {
      return <LoaderView overlay />
    }

    if (ssoCallbackState === SsoCallbackStates.ERROR) {
      return (
        <Text color="dark">
          Failed to Login.
          {' '}
          <TextLink variant="dark" to="/sso/login">Try again.</TextLink>
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
            Logging you in...
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

SsoCallbackPage = withMutation(gql`
  mutation SsoCallbackMutation($input: SsoCallbackInput!) {
    ssoCallback(input: $input)
  }
`)(SsoCallbackPage)

SsoCallbackPage = withClientMutation(SET_TOKEN)(SsoCallbackPage)

export default SsoCallbackPage
