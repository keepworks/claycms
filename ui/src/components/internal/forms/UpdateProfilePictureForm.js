import { withTheme } from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'
import { Field, Form } from 'react-final-form'

import Column from 'components/internal/Column'
import FilledButton from 'components/buttons/FilledButton'
import ImageDropInput from 'components/internal/inputs/ImageDropInput'
import ItemBar from 'components/ItemBar'
import ProfilePicture from 'components/internal/ProfilePicture'
import Row from 'components/internal/Row'
import Spacer from 'components/Spacer'
import Text from 'components/internal/typography/Text'

function UpdateProfilePictureForm(props) {
  const { user, theme } = props
  const { profilePictureSize_large: profilePictureSize } = theme.units

  return (
    <Form
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Row>
            <Column>
              <Text color="pale">Upload, Crop & Resize</Text>
              <Spacer height={20} />
              <Field name="file" component={ImageDropInput} imageSize={profilePictureSize} />
            </Column>
            <Column width="35%">
              <Text color="pale" align="center">Your Current Picture</Text>
              <Spacer height={20} />
              <ProfilePicture user={user} size="large" centered />
              <Spacer height={20} />
              <Text color="pale">Tip:</Text>
              <Text color="dark">
                For best results, upload an image that is at least
                {' '}
                <strong>{`${profilePictureSize} x ${profilePictureSize} px`}</strong>
                {' '}
                in size.
              </Text>
              <Spacer height={20} />
              <ItemBar reversed>
                <FilledButton type="submit" label="Submit" disabled={submitting} />
              </ItemBar>
            </Column>
          </Row>
        </form>
      )}
      {...props}
    />
  )
}

UpdateProfilePictureForm.propTypes = {
  user: PropTypes.object
}

UpdateProfilePictureForm.defaultProps = {
  user: {}
}

export default withTheme(UpdateProfilePictureForm)
