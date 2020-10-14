/* eslint-disable no-use-before-define */
import _ from 'lodash'
import arrayMutators from 'final-form-arrays'
import createDecorator from 'final-form-calculate'
import React, { Fragment } from 'react'
import Spacer from 'components/Spacer'
import Text from 'components/internal/typography/Text'
import { Field, Form } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'

import CloseButton from 'components/buttons/CloseButton'
import FieldGroup from 'components/internal/FieldGroup'
import FilledButton from 'components/buttons/FilledButton'
import FontIcon from 'components/FontIcon'
import SingleSelectInput from 'components/internal/inputs/SingleSelectInput'
import SwitchInput from 'components/internal/inputs/SwitchInput'
import TextInput from 'components/inputs/TextInput'
import { Field as FieldModel } from 'models'
import { FieldPrefix, PrefixedField } from 'components/internal/FieldPrefix'
import { SidePaneFormFooter } from 'components/internal/sidePane'
import { Tab, Tabs, TabPanel, TabList } from 'components/internal/tab'

const decorator = createDecorator(
  {
    field: /\b(\w*label\w*)\b/,
    updates: (value, name) => {
      const fieldName = name.replace('label', 'name')

      return { [fieldName]: value && _.snakeCase(value) }
    }
  },
  {
    field: /settings\.options\[\d+\]\.label/,
    updates: (value, name) => {
      const fieldName = name.replace('.label', '.key')

      return {
        [fieldName]: value && _.snakeCase(value)
      }
    }
  }
)

const isPrimitiveDataType = type => !(type === 'array' || type === 'key_value' || type === 'reference' || type === 'json')

function FieldForm({ classes, entities, initialValues, ...other }) {
  const decorators = initialValues.id ? [] : [ decorator ]
  const entityOptions = entities
    .filter(entity => entity.id !== initialValues.entityId)
    .map(entity => ({ label: entity.label, value: entity.id }))

  const hiddenField = initialValues.id
    ? <Field name="id" component="input" type="hidden" />
    : <Field name="entityId" component="input" type="hidden" />

  const isExistingField = Boolean(initialValues.id)
  const validateFunction = isExistingField
    ? FieldModel.validateUpdate
    : FieldModel.validateCreate

  const renderArray = (values, parentName = null) => {
    const prefix = parentName ? `${parentName}.` : ''

    return (
      <Fragment>
        <Field name={`${prefix}elementType`} disabled={isExistingField} component={SingleSelectInput} options={FieldModel.elementTypeList} label="Element Type" spaced stretched={false} />

        {values.elementType === 'key_value' && renderKeyPair(values, parentName)}
        {values.elementType === 'reference' && renderReference(parentName)}
      </Fragment>
    )
  }

  const renderKeyPair = (values, parentName = null) => {
    const prefix = parentName ? `${parentName}.` : ''

    return (
      <Fragment>
        <Text variant="regularSquished" color="pale">Nested Fields</Text>
        <Spacer height={10} />

        <FieldArray name={`${prefix}children`}>
          {({ fields }) => (
            <Fragment>
              {fields.map((name, index) => (
                <FieldGroup key={name}>
                  <FieldGroup.Header>
                    <CloseButton onClick={() => fields.remove(index)} />
                  </FieldGroup.Header>
                  {renderForm({ ...values.children[index], position: index }, name)}
                </FieldGroup>
              ))}
              <FilledButton type="button" size="tiny" label="New" onClick={() => fields.push({ dataType: 'single_line_text' })} />
            </Fragment>
          )}
        </FieldArray>
        <Spacer height={15} />
      </Fragment>
    )
  }

  const renderReference = (parentName = null) => {
    const prefix = parentName ? `${parentName}.` : ''

    return (
      <Field name={`${prefix}referencedEntityId`} component={SingleSelectInput} options={entityOptions} label="Reference Entity" spaced stretched={false} />
    )
  }

  const renderVersionOptions = prefix => (
    <Fragment>
      <Text variant="regularSquished" color="pale">Versions</Text>
      <Spacer height={10} />
      <FieldArray name={`${prefix}settings.versions`}>
        {({ fields }) => (
          <Fragment>
            {fields.map((name, index) => (
              <FieldGroup key={name}>
                <FieldGroup.Header>
                  <CloseButton onClick={() => fields.remove(index)} />
                </FieldGroup.Header>
                <Field
                  name={`${name}.name`}
                  component={TextInput}
                  label="Name"
                />
                <Field
                  name={`${name}.width`}
                  component={TextInput}
                  label="Width"
                />
                <Field
                  name={`${name}.height`}
                  component={TextInput}
                  label="Height"
                />
              </FieldGroup>
            ))}
            <FilledButton type="button" size="tiny" label="New" onClick={() => fields.push(undefined)} />
          </Fragment>
        )}
      </FieldArray>
    </Fragment>
  )

  const renderOptions = prefix => (
    <Fragment>
      <Text variant="regularSquished" color="pale">Restrict to the following</Text>
      <Spacer height={10} />
      <FieldArray name={`${prefix}settings.options`}>
        {({ fields }) => (
          <Fragment>
            {fields.map((name, index) => (
              <FieldGroup key={name}>
                <FieldGroup.Header>
                  <CloseButton onClick={() => fields.remove(index)} />
                </FieldGroup.Header>
                <Field
                  name={`${name}.label`}
                  component={TextInput}
                  autoFocus
                  label="Label"
                />
                <Field
                  name={`${name}.key`}
                  component={TextInput}
                  label="Key"
                />
              </FieldGroup>
            ))}
            <FilledButton type="button" size="tiny" label="New" onClick={() => fields.push(undefined)} />
          </Fragment>
        )}
      </FieldArray>
    </Fragment>
  )

  const renderForm = (values, parentName = null) => {
    const prefix = parentName ? `${parentName}.` : ''
    const isNonPrimitiveDataType = values
      && values.dataType
      && !isPrimitiveDataType(values.dataType)

    return (
      <Tabs initialValue="Config">
        <TabList variant="fullWidth">
          <Tab>
            <FontIcon name="setting" size="small" />
            <span>Config</span>
          </Tab>
          <Tab>
            <FontIcon name="round-tick" size="small" />
            <span>Validations</span>
          </Tab>
        </TabList>
        <TabPanel>
          <Spacer height={30} />
          <Field name={`${prefix}label`} component={TextInput} label="Label" spaced stretched={false} autoFocus />
          <Field name={`${prefix}name`} component={TextInput} label="Name" spaced stretched={false} />
          <Field name={`${prefix}dataType`} disabled={isExistingField} component={SingleSelectInput} options={FieldModel.dataTypeList} label="Data Type" spaced stretched={false} />
          {isNonPrimitiveDataType && (
            <Fragment>
              {values.dataType === 'array' && renderArray(values, parentName)}
              {values.dataType === 'key_value' && renderKeyPair(values, parentName)}
              {values.dataType === 'reference' && renderReference(parentName)}
            </Fragment>
          )}

          {values && values.dataType && isPrimitiveDataType(values.dataType) && (
          <Field name={`${prefix}defaultValue`} component={TextInput} label="Default Value" spaced stretched={false} />
          )}

          <Field
            name={`${prefix}position`}
            component="input"
            type="hidden"
            parse={value => +value}
          />

          <Field name={`${prefix}hint`} component={TextInput} label="Hint" spaced stretched={false} />

          {!parentName && (
            <Field
              name="settings.visibility"
              component={SwitchInput}
              label="Show table column?"
              type="checkbox"
              defaultValue
              disabled={isNonPrimitiveDataType}
              spaced
              stretched={false}
            />
          )}
        </TabPanel>
        <TabPanel>
          <Spacer height={30} />
          <FieldPrefix prefix={`${prefix}validations`}>
            <PrefixedField
              name="presence"
              component={SwitchInput}
              label="Required?"
              type="checkbox"
              spaced
              stretched={false}
            />
          </FieldPrefix>
          {values.dataType === 'single_line_text' && renderOptions(prefix)}
          {values.dataType === 'image' && renderVersionOptions(prefix)}
        </TabPanel>
      </Tabs>
    )
  }

  return (
    <Form
      initialValues={initialValues}
      validate={validateFunction}
      decorators={decorators}
      mutators={{
        ...arrayMutators
      }}
      render={({
        handleSubmit,
        submitting,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          {hiddenField}
          {renderForm(values)}
          <SidePaneFormFooter>
            <FilledButton label="Submit" disabled={submitting} />
          </SidePaneFormFooter>
        </form>
      )}
      {...other}
    />
  )
}

export default FieldForm
