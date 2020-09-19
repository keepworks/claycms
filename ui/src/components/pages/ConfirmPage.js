import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import React, { Component, Fragment } from 'react'

import Body from 'components/onboarding/Body'
import Card from 'components/onboarding/Card'
import CardFootnote from 'components/onboarding/CardFootnote'
import CardWrapper from 'components/onboarding/CardWrapper'
import ConfirmUserForm from 'components/onboarding/forms/ConfirmUserForm'
import Content from 'components/onboarding/Content'
import FilledButton from 'components/buttons/FilledButton'
import Header from 'components/onboarding/Header'
import LoaderView from 'components/LoaderView'
import Spacer from 'components/Spacer'
import { CardHeading, CardText, Text, TextLink } from 'components/onboarding/typography'
import { withClientMutation, withMutation, withQuery } from 'lib/data'

import SET_TOKEN from 'mutations/session'

/* eslint-disable jsx-a11y/anchor-is-valid */

class ConfirmPage extends Component {
  constructor() {
    super()

    this.state = {
      resendConfirmationStatus: ConfirmPage.resendConfirmationStatuses.NONE
    }
  }

  handleLoginClick = () => {
    const { history } = this.props

    history.push('/login')
  }

  handleFormSubmit = (values) => {
    const { confirmUser, createSession, setToken } = this.props

    return confirmUser(values, {
      onSuccess: ({ data: { confirmUser: { email } } }) => (
        createSession({ email, password: values.password }, {
          onSuccess: sessionResponse => setToken({ token: sessionResponse.data.session.token })
        })
      )
    })
  }

  handleResendConfirmation = () => {
    const { resendConfirmation, unconfirmedUser } = this.props

    const email = unconfirmedUser ? unconfirmedUser.email : null

    this.setState({
      resendConfirmationStatus: ConfirmPage.resendConfirmationStatuses.LOADING
    })

    return resendConfirmation({ email }, {
      onSuccess: () => this.setState({
        resendConfirmationStatus: ConfirmPage.resendConfirmationStatuses.SUCCESS
      }),
      onFailure: () => this.setState({
        resendConfirmationStatus: ConfirmPage.resendConfirmationStatuses.ERROR
      })
    })
  }

  renderLoadingContent = () => (
    <LoaderView />
  )

  renderErrorContent = () => {
    const { error } = this.props

    const errorMessage = (
      error.networkError
      && error.networkError.result
      && error.networkError.result.errors
      && error.networkError.result.errors[0]
      && error.networkError.result.errors[0].message
    ) || 'Your confirmation token is invalid.'

    return (
      <Fragment>
        <CardHeading>
          Uh oh!
        </CardHeading>
        <CardText variant="boldMedium" color="primary">
          {errorMessage}
        </CardText>
        <CardText>
          Please try again later.
        </CardText>
      </Fragment>
    )
  }

  renderNotFound = () => (
    <Fragment>
      <CardHeading>
        Uh oh!
      </CardHeading>
      <CardText>
        Your confirmation token is invalid.
      </CardText>
      <Text color="dark">
        Please check if the link is correct. If you have used this link before, try&nbsp;
        <TextLink variant="dark" to="/login">logging in</TextLink>
        .
      </Text>
    </Fragment>
  )

  renderConfirmedContent = () => (
    <Fragment>
      <CardHeading>
        Success!
      </CardHeading>
      <CardText>
        You have confirmed your email.
      </CardText>
      <Spacer height={10} />
      <FilledButton label="Login" type="button" onClick={this.handleLoginClick} />
    </Fragment>
  )

  renderConfirmationExpiredContent = () => {
    const { resendConfirmationStatus } = this.state

    return (
      <Fragment>
        <CardHeading>
          Uh oh!
        </CardHeading>
        <CardText>
          Your confirmation token has expired.
        </CardText>

        <Spacer height={10} />

        {resendConfirmationStatus === ConfirmPage.resendConfirmationStatuses.NONE && (
          <FilledButton label="Resend Confirmation" type="button" onClick={this.handleResendConfirmation} />
        )}

        {resendConfirmationStatus === ConfirmPage.resendConfirmationStatuses.LOADING && (
          <Text color="dark">
            Resending...
          </Text>
        )}

        {resendConfirmationStatus === ConfirmPage.resendConfirmationStatuses.ERROR && (
          <Text color="dark">
            Failed to resend confirmation email.&nbsp;
            <TextLink variant="dark" onClick={this.handleResendConfirmation}>Try again.</TextLink>
          </Text>
        )}

        {resendConfirmationStatus === ConfirmPage.resendConfirmationStatuses.SUCCESS && (
          <Text color="dark">
            Re-sent confirmation email. If you don’t receive it within 5 minutes,
            check your spam folder or&nbsp;
            <TextLink variant="dark" onClick={this.handleResendConfirmation}>try again</TextLink>
            .
          </Text>
        )}
      </Fragment>
    )
  }

  renderFormContent = () => {
    const { match: { params: { token } } } = this.props

    const initialValues = {
      confirmationToken: token
    }

    return (
      <ConfirmUserForm initialValues={initialValues} onSubmit={this.handleFormSubmit} />
    )
  }

  renderContent = () => {
    const { error, loading, unconfirmedUser } = this.props

    if (loading) {
      return this.renderLoadingContent()
    }

    if (error) {
      return this.renderErrorContent()
    }

    if (!unconfirmedUser) {
      return this.renderNotFound()
    }

    if (unconfirmedUser.isConfirmed) {
      return this.renderConfirmedContent()
    }

    if (unconfirmedUser.isConfirmationExpired) {
      return this.renderConfirmationExpiredContent()
    }

    return this.renderFormContent()
  }

  renderCardFootnoteContent = () => {
    const { loading, unconfirmedUser } = this.props

    if (loading || !unconfirmedUser) {
      return null
    }

    const contactSupport = (
      <Text>
        Having trouble?&nbsp;
        <TextLink href="mailto:support@claycms.io">
          Contact support
        </TextLink>
        &nbsp;for help.
      </Text>
    )

    const termsOfService = (
      <Text>
        By clicking submit, you are agreeing to the&nbsp;
        <TextLink to="/terms-of-service">
          Terms of Service
        </TextLink>
        .
      </Text>
    )

    if (!unconfirmedUser.isConfirmed && !unconfirmedUser.isConfirmationExpired) {
      return termsOfService
    }

    return contactSupport
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>
            Confirm Email
          </title>
        </Helmet>

        <Header heading="CONFIRM EMAIL" hint="Existing user?" link={{ name: 'Login', url: '/login' }} />

        <Body>
          <Content>
            You are
            <br />
            almost there...
          </Content>

          <CardWrapper>
            <Card>
              {this.renderContent()}
            </Card>
            <CardFootnote>
              {this.renderCardFootnoteContent()}
            </CardFootnote>
          </CardWrapper>
        </Body>
      </Fragment>
    )
  }
}

ConfirmPage.resendConfirmationStatuses = Object.freeze({
  NONE: 'none',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success'
})

ConfirmPage = withClientMutation(SET_TOKEN)(ConfirmPage)

ConfirmPage = withMutation(gql`
  mutation CreateSessionMutation($input: CreateSessionInput!) {
    session: createSession(input: $input) {
      id
      token
    }
  }
`)(ConfirmPage)

ConfirmPage = withMutation(gql`
  mutation ConfirmUserMutation($input: ConfirmUserInput!) {
    confirmUser(input: $input) {
      id
      email
    }
  }
`)(ConfirmPage)

ConfirmPage = withMutation(gql`
  mutation ResendConfirmation($input: ResendConfirmationInput!) {
    resendConfirmation(input: $input) {
      id
    }
  }
`)(ConfirmPage)

ConfirmPage = withQuery(gql`
  query ConfirmPageQuery($confirmationToken: String!) {
    unconfirmedUser(confirmationToken: $confirmationToken) {
      id
      email
      isConfirmed
      isConfirmationExpired
    }
  }
`, {
  options: ({ match }) => ({
    variables: { confirmationToken: match.params.token }
  })
})(ConfirmPage)

export default ConfirmPage
