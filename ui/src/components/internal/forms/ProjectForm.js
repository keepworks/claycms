import React from 'react'
import { Field, Form } from 'react-final-form'

import DialogFormFooter from 'components/internal/DialogFormFooter'
import FilledButton from 'components/buttons/FilledButton'
import HintBox from 'components/internal/HintBox'
import TextInput from 'components/inputs/TextInput'
import { DialogDescription, Hint } from 'components/internal/typography'
import { Project } from 'models'

function ProjectForm(props) {
  return (
    <Form
      validate={Project.validateCreate}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field name="teamId" component="input" type="hidden" />

          <DialogDescription>
            {/* Change */}
            Projects hold a collection of messages, customers, routes & deliveries.
          </DialogDescription>

          <Field name="name" component={TextInput} placeholder="eg. my-app-production" icon="project" autoFocus />

          <HintBox>
            <Hint>
              If your app has multiple environments
              (like staging and production),
              each of those would be a seperate project.
            </Hint>
          </HintBox>

          <DialogFormFooter>
            <FilledButton label="Submit" disabled={submitting} />
          </DialogFormFooter>
        </form>
      )}
      {...props}
    />
  )
}

export default ProjectForm
