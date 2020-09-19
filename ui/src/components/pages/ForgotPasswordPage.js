import gql from 'graphql-tag'
import React, { Fragment } from 'react'

import Body from 'components/onboarding/Body'
import Card from 'components/onboarding/Card'
import CardFootnote from 'components/onboarding/CardFootnote'
import CardWrapper from 'components/onboarding/CardWrapper'
import Content from 'components/onboarding/Content'
import ForgotPasswordForm from 'components/onboarding/forms/ForgotPasswordForm'
import Header from 'components/onboarding/Header'
import Helmet from 'react-helmet-async'
import { Text, TextLink } from 'components/onboarding/typography'
import { withMutation } from 'lib/data'

function ForgotPasswordPage({ forgotPassword }) {
  const handleSubmit = (values, formApi) => (
    forgotPassword(values, { onSuccess: () => formApi.reset() })
  )

  return (
    <Fragment>
      <Helmet>
        <title>
          Forgot password
        </title>
      </Helmet>

      <Header heading="FORGOT PASSWORD" hint="New user?" link={{ name: 'Register', url: '/signup' }} />

      <Body>
        <Content>
          Don&apos;t worry.
          <br />
          It happens to the best of us.
        </Content>

        <CardWrapper>
          <Card>
            <ForgotPasswordForm onSubmit={handleSubmit} />
          </Card>

          <CardFootnote>
            <Text>
              Remember your password?&nbsp;
              <TextLink to="/login">
                Login here
              </TextLink>
              .
            </Text>
          </CardFootnote>
        </CardWrapper>
      </Body>
    </Fragment>
  )
}

ForgotPasswordPage = withMutation(gql`
  mutation ForgotPasswordMutation($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      success
    }
  }
`, {
  successAlert: ({ input }) => ({
    message: `We have sent a reset password link to ${input.email}.`
  })
})(ForgotPasswordPage)

export default ForgotPasswordPage
