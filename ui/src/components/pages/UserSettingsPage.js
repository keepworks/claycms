import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import React, { Fragment } from 'react'

import ChangePasswordForm from 'components/internal/forms/ChangePasswordForm'
import Text from 'components/typography/Text'
import { Panel, PanelBody, PanelContainer, PanelHeader } from 'components/internal/panel'
import { PageTitle } from 'components/internal/typography'
import { withMutation } from 'lib/data'

function UserSettingsPage({ updatePassword }) {
  return (
    <Fragment>
      <Helmet>
        <title>
          Settings
        </title>
      </Helmet>

      <PageTitle>
        Settings
      </PageTitle>

      <PanelContainer>
        <Panel>
          <PanelHeader icon="lock">
            <Text color="dark" variant="semibold">Change Password</Text>
          </PanelHeader>
          <PanelBody>
            <ChangePasswordForm onSubmit={updatePassword} />
          </PanelBody>
        </Panel>
      </PanelContainer>
    </Fragment>
  )
}

UserSettingsPage = withMutation(gql`
  mutation UpdatePasswordMutation($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
      success
    }
  }
`, {
  successAlert: {
    message: 'Successfully changed your password.'
  }
})(UserSettingsPage)

export default UserSettingsPage
