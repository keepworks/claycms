import _ from 'lodash'
import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import injectSheet from 'react-jss'
import React, { Fragment, Component } from 'react'

import AppContext from 'components/AppContext'
import UpdateProfileForm from 'components/internal/forms/UpdateProfileForm'
import Column from 'components/internal/Column'
import IconButton from 'components/internal/buttons/IconButton'
import PictureModal from 'components/internal/modals/PictureModal'
import ProfilePicture from 'components/internal/ProfilePicture'
import Row from 'components/internal/Row'
import { PageTitle } from 'components/internal/typography'
import { Panel, PanelBody, PanelContainer } from 'components/internal/panel'
import { withMutation } from 'lib/data'

class UserProfilePage extends Component {
  constructor() {
    super()

    this.state = {
      isPictureModalOpen: false
    }
  }

  openPictureModal = () => this.setState({ isPictureModalOpen: true })

  closePictureModal = () => this.setState({ isPictureModalOpen: false })

  onPictureFormSubmit = (values) => {
    const { updateProfile } = this.props

    return updateProfile({ profilePicture: values.file }, {
      onSuccess: () => {
        this.closePictureModal()
      }
    })
  }

  render() {
    const { classes, updateProfile } = this.props
    const { isPictureModalOpen } = this.state

    return (
      <AppContext.Consumer>
        {({ currentUser }) => {
          const changeNameInitialValues = _.pick(currentUser, [ 'firstName', 'lastName' ])

          return (
            <Fragment>
              <Helmet>
                <title>
                  Profile
                </title>
              </Helmet>

              <PageTitle>
                Profile
              </PageTitle>

              <PanelContainer>
                <Panel>
                  <PanelBody>
                    <Row>
                      <Column width={0}>
                        <div className={classes.wrapper}>
                          <div className={classes.buttonWrapper}>
                            <IconButton
                              heavy
                              icon="camera"
                              onClick={this.openPictureModal}
                              size="small"
                              variant="color"
                            />
                          </div>
                          <ProfilePicture user={currentUser} size="large" />
                        </div>
                      </Column>
                      <Column>
                        <UpdateProfileForm
                          onSubmit={updateProfile}
                          initialValues={changeNameInitialValues}
                        />
                      </Column>
                    </Row>
                  </PanelBody>
                </Panel>
              </PanelContainer>
              <PictureModal
                isOpen={isPictureModalOpen}
                onSubmit={this.onPictureFormSubmit}
                onRequestClose={this.closePictureModal}
                user={currentUser}
              />
            </Fragment>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

UserProfilePage = withMutation(gql`
  mutation UpdateProfileMutation($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      firstName
      lastName
      profilePictureThumbnail
      profilePictureNormal
    }
  }
`, {
  successAlert: {
    message: 'Successfully updated your profile.'
  }
})(UserProfilePage)

export default injectSheet({
  wrapper: {
    position: 'relative'
  },
  buttonWrapper: {
    cursor: 'pointer',
    position: 'absolute',
    right: 0,
    top: 0
  }
})(UserProfilePage)
