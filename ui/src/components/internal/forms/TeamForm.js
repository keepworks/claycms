import React from 'react'
import { Field, Form } from 'react-final-form'

import AppContext from 'components/AppContext'
import DialogFormFooter from 'components/internal/DialogFormFooter'
import FilledButton from 'components/buttons/FilledButton'
import HintBox from 'components/internal/HintBox'
import TextInput from 'components/inputs/TextInput'
import { DialogDescription, Hint } from 'components/internal/typography'
import { Team } from 'models'

function TeamForm({ onSubmit }) {
  return (
    <AppContext.Consumer>
      {({ currentUser }) => (
        <Form
          onSubmit={onSubmit}
          validate={Team.validateCreate}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              {/* Change */}
              <DialogDescription>
                Teams tie multiple projects and users, providing centralized billing under one roof.
              </DialogDescription>

              <Field name="name" component={TextInput} placeholder="eg. Your Organization's Name" icon="team" autoFocus />

              <HintBox>
                <Hint>
                  If you&apos;re a single user, you can call it something like&nbsp;
                  <strong>
                    {currentUser.firstName}
                    &apos;s Personal Team
                  </strong>
                  .
                </Hint>
              </HintBox>

              <DialogFormFooter>
                <FilledButton label="Submit" disabled={submitting} />
              </DialogFormFooter>
            </form>
          )}
        />
      )}
    </AppContext.Consumer>
  )
}

export default TeamForm
