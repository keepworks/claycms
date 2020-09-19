import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import React, { Component, Fragment } from 'react'

import Body from 'components/onboarding/Body'
import Card from 'components/onboarding/Card'
import CardFootnote from 'components/onboarding/CardFootnote'
import CardWrapper from 'components/onboarding/CardWrapper'
import Content from 'components/onboarding/Content'
import FilledButton from 'components/buttons/FilledButton'
import Header from 'components/onboarding/Header'
import SignupForm from 'components/onboarding/forms/SignupForm'
import Spacer from 'components/Spacer'
import { CardText, Text, TextLink } from 'components/onboarding/typography'
import { withMutation } from 'lib/data'

/* eslint-disable jsx-a11y/anchor-is-valid */

class SignupPage extends Component {
  constructor() {
    super()

    this.state = {
      resendConfirmationStatus: SignupPage.resendConfirmationStatuses.NONE,
      user: null
    }
  }

  static getDerivedStateFromProps(props) {
    const { history, location } = props

    if (location.state && location.state.newUser) {
      const user = Object.assign({}, location.state.newUser)

      // Clear state from location for next re-render.
      history.replace({ state: {} })

      return { user }
    }

    // Return null to indicate no change to state.
    return null
  }

  handleFormSubmit = (values) => {
    const { createUser } = this.props

    return createUser(values, {
      onSuccess: (response) => {
        const user = response.data.createUser

        this.setState({ user })
      }
    })
  }

  handleResendConfirmation = () => {
    const { resendConfirmation } = this.props
    const { user } = this.state

    this.setState({
      resendConfirmationStatus: SignupPage.resendConfirmationStatuses.LOADING
    })

    return resendConfirmation({ email: user ? user.email : null }, {
      onSuccess: response => this.setState({
        resendConfirmationStatus: SignupPage.resendConfirmationStatuses.SUCCESS,
        user: response.data.resendConfirmation
      }),
      onFailure: () => this.setState({
        resendConfirmationStatus: SignupPage.resendConfirmationStatuses.ERROR
      })
    })
  }

  render() {
    const { resendConfirmationStatus, user } = this.state

    return (
      <Fragment>
        <Helmet>
          <title>
            Sign up
          </title>
        </Helmet>

        <Header heading="CREATE AN ACCOUNT" hint="Already a user?" link={{ name: 'Log in', url: '/login' }} />

        <Body>
          <Content>
            Get started now for free.
          </Content>

          <CardWrapper showSecondary={!!(user && user.email)}>
            <Card>
              <SignupForm onSubmit={this.handleFormSubmit} />
            </Card>

            <Card>
              {user && user.email && (
                <Fragment>
                  <CardText>
                    {user.isConfirmationExpired
                      ? 'Your confirmation link has expired for the email address:'
                      : 'We have sent a confirmation link to the email address:'
                    }
                  </CardText>
                  <CardText variant="boldMedium" color="primary">
                    {user.email}
                  </CardText>
                </Fragment>
              )}
              {user && resendConfirmationStatus === SignupPage.resendConfirmationStatuses.NONE
                && (
                  <Fragment>
                    {!user.isConfirmationExpired && (
                      <Text color="dark">
                        If you don’t receive it within 5 minutes, check your spam folder or&nbsp;
                        <TextLink to="#" variant="dark" onClick={this.handleResendConfirmation}>resend your confirmation email</TextLink>
                        .
                      </Text>
                    )}
                    {user.isConfirmationExpired && (
                      <Fragment>
                        <Spacer height={20} />
                        <FilledButton label="Resend Confirmation" type="button" onClick={this.handleResendConfirmation} />
                      </Fragment>
                    )}
                  </Fragment>
                )
              }
              {user && resendConfirmationStatus === SignupPage.resendConfirmationStatuses.LOADING
                && (
                  <Text color="dark">
                    Resending...
                  </Text>
                )
              }
              {user && resendConfirmationStatus === SignupPage.resendConfirmationStatuses.ERROR
                && (
                  <Text color="dark">
                    Failed to resend confirmation email.&nbsp;
                    <TextLink to="#" variant="dark" onClick={this.handleResendConfirmation}>Try again.</TextLink>
                  </Text>
                )
              }
              {user && resendConfirmationStatus === SignupPage.resendConfirmationStatuses.SUCCESS
                && (
                  <Text color="dark">
                    Resent confirmation email. If you don’t receive it soon,
                    check your spam folder or&nbsp;
                    <TextLink to="#" variant="dark" onClick={this.handleResendConfirmation}>try again</TextLink>
                    .
                  </Text>
                )
              }
            </Card>

            <CardFootnote spaced hide={!!(user && user.email)}>
              <Text>
                By clicking submit, you are agreeing to the&nbsp;
                <TextLink to="/terms-of-service">
                  Terms of Service
                </TextLink>
                .
              </Text>
            </CardFootnote>
          </CardWrapper>
        </Body>
      </Fragment>
    )
  }
}

SignupPage.resendConfirmationStatuses = Object.freeze({
  NONE: 'none',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success'
})

SignupPage = withMutation(gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      isConfirmationExpired
    }
  }
`)(SignupPage)

SignupPage = withMutation(gql`
  mutation ResendConfirmation($input: ResendConfirmationInput!) {
    resendConfirmation(input: $input) {
      id
      email
      isConfirmationExpired
    }
  }
`)(SignupPage)

export default SignupPage
