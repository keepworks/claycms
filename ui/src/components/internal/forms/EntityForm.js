import _ from 'lodash'
import createDecorator from 'final-form-calculate'
import React from 'react'
import { Field, Form } from 'react-final-form'

import FilledButton from 'components/buttons/FilledButton'
import SingleSelectInput from 'components/internal/inputs/SingleSelectInput'
import SwitchInput from 'components/internal/inputs/SwitchInput'
import TextInput from 'components/inputs/TextInput'
import { Entity } from 'models'
import { SidePaneFormFooter } from 'components/internal/sidePane'

const decorator = createDecorator({
  field: 'label',
  updates: {
    name: value => value && _.snakeCase(value)
  }
})

function EntityForm({ entities, initialValues, ...other }) {
  const decorators = initialValues.id ? [] : [ decorator ]

  const hiddenField = initialValues.id
    ? <Field name="id" component="input" type="hidden" />
    : <Field name="projectId" component="input" type="hidden" />

  const validateFunction = initialValues.id
    ? Entity.validateUpdate
    : Entity.validateCreate

  const entityOptions = entities.map(entity => ({ label: entity.label, value: entity.id }))
  entityOptions.unshift({ label: 'None', value: null })

  return (
    <Form
      initialValues={initialValues}
      validate={validateFunction}
      decorators={decorators}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          {hiddenField}

          <Field name="label" component={TextInput} label="Label" spaced stretched={false} autoFocus />
          <Field name="name" component={TextInput} label="Name" spaced stretched={false} />
          <Field name="parentId" component={SingleSelectInput} label="Parent Entity" options={entityOptions} spaced stretched={false} hint="Optional." />
          <Field name="singleton" component={SwitchInput} label="Singleton" type="checkbox" spaced stretched={false} />

          <SidePaneFormFooter>
            <FilledButton label="Submit" disabled={submitting} />
          </SidePaneFormFooter>
        </form>
      )}
      {...other}
    />
  )
}

export default EntityForm
