import gql from 'graphql-tag'
import React, { Fragment } from 'react'

import Body from 'components/onboarding/Body'
import Card from 'components/onboarding/Card'
import CardFootnote from 'components/onboarding/CardFootnote'
import CardWrapper from 'components/onboarding/CardWrapper'
import Content from 'components/onboarding/Content'
import Header from 'components/onboarding/Header'
import Helmet from 'react-helmet-async'
import LoginForm from 'components/onboarding/forms/LoginForm'
import { Text, TextLink } from 'components/onboarding/typography'
import { withClientMutation, withMutation } from 'lib/data'

import SET_TOKEN from 'mutations/session'

function LoginPage({ createSession, setToken }) {
  const handleSubmit = values => (
    createSession(values, {
      onSuccess: response => setToken({ token: response.data.session.token })
    })
  )

  return (
    <Fragment>
      <Helmet>
        <title>
          Log in
        </title>
      </Helmet>

      <Header heading="LOGIN" hint="New user?" link={{ name: 'Register', url: '/signup' }} />

      <Body>
        <Content>
          Welcome back. We missed you!
        </Content>

        <CardWrapper>
          <Card>
            <LoginForm onSubmit={handleSubmit} />
          </Card>

          <CardFootnote>
            <Text>
              Forgot your password?&nbsp;
              <TextLink to="/forgot-password">
                Reset it now
              </TextLink>
              .
            </Text>
          </CardFootnote>
        </CardWrapper>
      </Body>
    </Fragment>
  )
}

LoginPage = withMutation(gql`
  mutation CreateSessionMutation($input: CreateSessionInput!) {
    session: createSession(input: $input) {
      id
      token
    }
  }
`)(LoginPage)

LoginPage = withClientMutation(SET_TOKEN)(LoginPage)

export default LoginPage
