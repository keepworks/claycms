/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import _ from 'lodash'
import arrayMutators from 'final-form-arrays'
import gql from 'graphql-tag'
import flat from 'flat'
import injectSheet from 'react-jss'
import React, { Fragment, useState, useRef, useEffect } from 'react'
import { Field, Form } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { ReactSortable } from 'react-sortablejs'
import { withApollo } from 'react-apollo'

import * as mixins from 'styles/mixins'
import ButtonGroupInput from 'components/internal/inputs/ButtonGroupInput'
import CloseButton from 'components/buttons/CloseButton'
import ColorPickerInput from 'components/internal/inputs/ColorPickerInput'
import DragButton from 'components/buttons/DragButton'
import FieldGroup from 'components/internal/FieldGroup'
import FieldModel from 'models/Field'
import FilledButton from 'components/buttons/FilledButton'
import Hint from 'components/internal/typography/Hint'
import ItemBar from 'components/ItemBar'
import Record from 'models/Record'
import SingleSelectInput from 'components/internal/inputs/SingleSelectInput'
import Spacer from 'components/Spacer'
import SwitchInput from 'components/internal/inputs/SwitchInput'
import Text from 'components/internal/typography/Text'
import TextInput from 'components/inputs/TextInput'
import UploadInput from 'components/inputs/UploadInput'
import { LoaderText } from 'components/internal/typography'
import { SidePaneFormFooter } from 'components/internal/sidePane'

import RECORD_FRAGMENTS from 'fragments/record'

const REFERENCE_OPTIONS = [
  { value: 'new', label: 'New Record' },
  { value: 'edit', label: 'Existing Record' }
]

const objToKeyValueArray = (obj = {}) => {
  if (Object.keys(obj).length === 0) return [ {} ]

  const flatObject = flat.flatten(obj)

  return Object.keys(flatObject).map(key => ({ key, value: flatObject[key] }))
}

const keyValuesArrayToObj = (keyValuesArray = []) => {
  const flatValues = keyValuesArray
    .filter(v => v && v.key)
    .reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {})

  return flat.unflatten(flatValues, { object: true })
}

const JSONField = ({ input, label }) => {
  const [ values, setValues ] = useState(() => objToKeyValueArray(input.value))
  const { name: inputName, onChange } = input

  const debouncedOnChange = useRef(
    _.debounce((keyValuesArray) => {
      onChange(keyValuesArrayToObj(keyValuesArray))
    },
    200)
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((currentValues) => {
      const copy = [ ...currentValues ]
      _.set(copy, name, value)
      return copy
    })
  }

  const push = () => {
    setValues(currentValues => ([ ...currentValues, {} ]))
  }

  const remove = index => () => {
    setValues(currentValues => currentValues.filter((__, i) => i !== index))
  }

  useEffect(() => {
    debouncedOnChange.current(values)
  }, [ values ])

  return (
    <Fragment key={inputName}>
      <Fragment>
        <Text variant="regularSquished" color="pale">{label}</Text>
        <Spacer height={10} />
        <FieldGroup>
          {values.map((val, index) => (
            /* eslint-disable react/no-array-index-key */
            <ItemBar justifyContent="space-between" gutter="large" key={index}>
              <TextInput
                flexGrow={1}
                placeholder="key"
                spaced={false}
                stretched={false}
                input={{
                  name: `${index}.key`,
                  onChange: handleChange,
                  value: val.key || ''
                }}
              />
              <TextInput
                flexGrow={1}
                placeholder="value"
                spaced={false}
                stretched={false}
                input={{
                  name: `${index}.value`,
                  onChange: handleChange,
                  value: val.value || ''
                }}
              />
              <CloseButton onClick={remove(index)} />
            </ItemBar>
          ))}

          <FilledButton label="Add data" onClick={push} size="tiny" type="button" />
        </FieldGroup>
      </Fragment>
    </Fragment>
  )
}

const KeyValueField = ({ childFields, fieldLabel, initialValues, name, parentField, values, ...props }) => {
  const isParentArray = parentField && parentField.dataType === 'array'

  const [ isHidden, setIsHidden ] = useState(!(isParentArray && !(values && values.value)))

  const Wrapper = isParentArray ? Fragment : FieldGroup
  const subValues = isParentArray && values ? values.value : values
  const subInitialValues = initialValues && initialValues.value
  const isNestedField = parentField && parentField.parentId

  return (
    <Fragment>
      <ItemBar justifyContent="flex-start" gutter="small">
        <Text variant="regularSquished" color="pale">{fieldLabel}</Text>
        {isNestedField && (
          <FilledButton
            type="button"
            size="tiny"
            label={`${isHidden ? 'Expand' : 'Collapse'}`}
            onClick={() => setIsHidden(setIsHiddenPrev => !setIsHiddenPrev)}
          />
        )}
      </ItemBar>
      {isNestedField && isHidden && (
        <Fragment>
          <Spacer height={20} />
          <ItemBar>
            <Text variant="regularSquished">{Record.summarizeKeyValuePair(childFields, subValues, isHidden)}</Text>
            <Spacer height={20} />
          </ItemBar>
        </Fragment>
      )}
      <Spacer height={20} />
      {(!isNestedField || !isHidden) && (
        <Wrapper>
          {childFields.map(childField => fieldRenderer({
            ...props,
            field: childField,
            name: `${name}.${childField.name}`,
            values: subValues && subValues[childField.name],
            initialValues: subInitialValues && subInitialValues[childField.name]
          }))}
        </Wrapper>
      )}
    </Fragment>
  )
}

const fieldRenderer = (props) => {
  const { classes, fields, field, values, initialValues, name } = props
  const childFields = fields.filter(df => df.parentId === field.id)
  const key = `${name}-${field.id}`
  const isRequired = field.validations && field.validations.presence
  const isRequiredAsterix = isRequired ? '*' : ''
  const fieldLabel = `${field.label}${isRequiredAsterix}`

  if (field.dataType === 'image') {
    const { versions = [] } = field.settings
    let minVersion = versions[0]
    let note = ''

    versions.forEach((version) => {
      if (version.width < minVersion.width) {
        minVersion = version
      }
    })

    if (minVersion) {
      note = (
        <Hint>
          Note: Minimum dimensions -
          {minVersion.width}
          x
          {minVersion.height}
        </Hint>
      )
    }

    return (
      <div key={key} className={classes.inputWrapper}>
        <Field
          isImage
          name={name}
          label={fieldLabel}
          color="pale"
          component={UploadInput}
          type="file"
          variant="lightSquished"
          note={note}
          hint={field.hint}
        />
      </div>
    )
  }

  if (field.dataType === 'file') {
    return (
      <div key={key} className={classes.inputWrapper}>
        <Field
          previewUrl
          name={name}
          label={fieldLabel}
          color="pale"
          component={UploadInput}
          type="file"
          variant="lightSquished"
          hint={field.hint}
        />
      </div>
    )
  }

  if (field.dataType === 'boolean') {
    return (
      <div key={key} className={classes.inputWrapper}>
        <Field
          name={name}
          component={SwitchInput}
          type="checkbox"
          label={fieldLabel}
          spaced
          stretched={false}
          hint={field.hint}
        />
      </div>
    )
  }

  if (field.dataType === 'color') {
    return (
      <Field
        key={key}
        name={name}
        component={ColorPickerInput}
        label={fieldLabel}
        spaced
        hint={field.hint}
      />
    )
  }

  if (field.dataType === 'key_value') {
    return (
      <KeyValueField
        childFields={childFields}
        fieldLabel={fieldLabel}
        initialValues={initialValues}
        key={key}
        name={name}
        values={values}
        {...props}
      />
    )
  }

  if (field.dataType === 'array') {
    return (
      <Fragment key={key}>
        <Text variant="regularSquished" color="pale">{fieldLabel}</Text>
        <Spacer height={10} />

        <FieldArray name={name}>
          {({ fields: fieldsArray }) => {
            const list = fieldsArray.map((fieldArrayName, index) => ({ id: fieldArrayName, index, fieldArrayName }))

            return (
              <Fragment>
                <ReactSortable
                  handle=".drag-handle"
                  list={list}
                  setList={(currentList) => {
                    currentList.forEach((a, index) => {
                      fieldsArray.update(index, {
                        ...values[a.index],
                        position: index
                      })
                    })
                  }}
                >
                  {list.map(({ fieldArrayName, index }) => (
                    <FieldGroup key={fieldArrayName}>
                      <FieldGroup.Header>
                        <DragButton />
                        <CloseButton onClick={() => fieldsArray.remove(index)} />
                      </FieldGroup.Header>
                      <Field
                        name={`${fieldArrayName}.position`}
                        type="hidden"
                        component="input"
                      />
                      {childFields.map((childField) => {
                        const childFieldName = childField.dataType === 'reference' ? fieldArrayName : `${fieldArrayName}.value`
                        const newProps = {
                          ...props,
                          field: childField,
                          parentField: field,
                          name: childFieldName,
                          values: values && values[index],
                          initialValues: initialValues && initialValues[index]
                        }

                        return fieldRenderer(newProps)
                      })}
                    </FieldGroup>
                  ))}
                </ReactSortable>
                <FilledButton
                  type="button"
                  size="tiny"
                  label="Add"
                  onClick={() => fieldsArray.push({
                    position: list.length
                  })}
                />
                <Spacer height={20} />
              </Fragment>
            )
          }}
        </FieldArray>
      </Fragment>
    )
  }

  if (field.dataType === 'json') {
    return <Field component={JSONField} label={fieldLabel} name={name} />
  }

  if (field.dataType === 'reference') {
    if (!field.referencedEntityId) {
      return <LoaderText>{`Reference entity not defined for field - ${field.label}.`}</LoaderText>
    }

    const { mutators, getEntities, entitiesLoading, recordLoading, getRecord } = props
    const parentEntity = props.entities.find(e => e.id === field.referencedEntityId)
    const loading = <LoaderText>Loading References...</LoaderText>

    if (entitiesLoading) {
      return loading
    }

    if (!parentEntity) {
      getEntities(field.referencedEntityId)

      return loading
    }

    const groupedEntities = props.entities.filter(e => e.parentId === parentEntity.id)
    const entities = (groupedEntities.length && groupedEntities) || [ parentEntity ]

    const entitiesOptions = entities.map(e => ({ label: e.label, value: e.id, entity: e }))
    const existingRecordsOptions = entities && entities.reduce((options, entity) => ([
      ...options,
      ...entity.records.map(record => ({ value: record.id, label: new Record(entity.fields).summarize(record, entity), entity })) || []
    ]), [])

    const currentOption = (values && values.currentOption) || 'edit'
    const isformHidden = values && (values.hidden || values.hidden === undefined)
    const selectedEntityId = values && values.entityId
    const selectedRecord = values && values.id

    let selectedEntity = {}
    let record = null
    if (currentOption === 'new' && selectedEntityId) {
      selectedEntity = entities.find(e => e.id === selectedEntityId)
    } else if (currentOption === 'edit' && selectedRecord) {
      const recordOption = existingRecordsOptions.find(o => o.value === selectedRecord)

      if (!recordOption) {
        if (!recordLoading) {
          getRecord(selectedRecord)
        }

        return loading
      }

      selectedEntity = existingRecordsOptions.find(o => o.value === selectedRecord).entity
      record = selectedEntity && selectedEntity.records.find(r => r.id === selectedRecord)
    }

    const newProps = {
      ...props,
      fields: selectedEntity.fields || [],
      parentName: name
    }

    return (
      <Fragment key={key}>
        <Text variant="regularSquished" color="pale">{fieldLabel}</Text>
        <Spacer height={20} />
        <Field
          name={`${name}.currentOption`}
          component={ButtonGroupInput}
          options={REFERENCE_OPTIONS}
          defaultValue="edit"
        />
        {currentOption && (
          <Fragment>
            <Spacer height={20} />
            <ItemBar>
              {currentOption === 'new' && (
                <Field
                  name={`${name}.entityId`}
                  component={SingleSelectInput}
                  options={entitiesOptions}
                  label="Select Entity"
                  onSelectOption={option => mutators.newReference(name, option.entity)}
                  hint={field.hint}
                />
              )}
              {currentOption === 'edit' && (
                <Field
                  name={`${name}.id`}
                  component={SingleSelectInput}
                  options={existingRecordsOptions}
                  label={`Select from ${parentEntity.label}`}
                  onSelectOption={() => mutators.editReference(name, record, selectedEntity.fields)}
                  truncateText
                  hint={field.hint}
                />
              )}
              {((selectedRecord && currentOption === 'edit') || (selectedEntityId && currentOption === 'new')) && (
                <Fragment>
                  <Spacer width={30} />
                  <FilledButton
                    type="button"
                    size="tiny"
                    label="Hide / Show Fields"
                    onClick={() => mutators.toggleFormVisibility(name, record, selectedEntity.fields)}
                  />
                  <FilledButton type="button" size="tiny" label="Clear" onClick={() => mutators.clearReference(name)} />
                </Fragment>
              )}
            </ItemBar>
            <Spacer height={20} />
          </Fragment>
        )}
        {!isformHidden && renderForm(newProps)}
      </Fragment>
    )
  }

  const fieldOptions = {}

  if (field.dataType === 'number') {
    fieldOptions.type = 'number'
    fieldOptions.autoComplete = 'off'
    fieldOptions.parse = value => +value
  } else if (field.dataType === 'multiple_line_text') {
    fieldOptions.isMultiline = true
  }

  if (field.dataType === 'single_line_text' && field.settings && field.settings.options) {
    const options = field.settings.options.map(option => ({ label: option.label, value: option.key }))

    return (
      <Field
        component={SingleSelectInput}
        key={name}
        label={fieldLabel}
        name={name}
        hint={field.hint}
        options={options}
      />
    )
  }

  return (
    <Field
      key={key}
      name={name}
      component={TextInput}
      label={fieldLabel}
      spaced
      parse={v => v}
      stretched={false}
      hint={field.hint}
      {...fieldOptions}
    />
  )
}

const renderForm = ({ fields, parentName, initialValues, values, ...other }) => {
  const hiddenFieldName = parentName ? `${parentName}.id` : 'id'
  const hiddenField = initialValues && initialValues.id
    ? <Field name={hiddenFieldName} component="input" type="hidden" />
    : <Field name="entityId" component="input" type="hidden" />
  let rootFields = fields.filter(f => !f.parentId)
  rootFields = _.sortBy(rootFields, [ 'position' ])

  return (
    <Fragment>
      {hiddenField}
      {rootFields.map((field) => {
        const name = parentName ? `${parentName}.traits.${field.name}` : `traits.${field.name}`
        const subValues = values && values.traits && values.traits[field.name]
        const subInitialValues = initialValues && initialValues.traits && initialValues.traits[field.name]

        return fieldRenderer({
          ...other,
          values: subValues,
          field,
          fields,
          name,
          initialValues: subInitialValues
        })
      })}
    </Fragment>
  )
}

const newReferenceMutator = ([ name, entity ], state, { changeValue }) => {
  const traits = {}
  const parentFields = entity.fields.filter(FieldModel.isRoot)
  parentFields.forEach((field) => {
    traits[field.name] = ''
  })

  changeValue(state, name, () => ({ entityId: entity.id, traits, hidden: false, currentOption: 'new' }))
}

const editReferenceMutator = ([ name, selectedRecord, fields ], state, { changeValue }) => {
  const record = selectedRecord && new Record(fields || []).process([ selectedRecord ])

  changeValue(state, name, () => ({ ...record, hidden: true, currentOption: 'edit' }))
}

const clearReferenceMutator = ([ name ], state, { changeValue }) => (
  changeValue(state, name, () => ({ hidden: true, currentOption: 'new' }))
)

const toggleFormVisibilityMutator = ([ name, selectedRecord, fields ], state, { changeValue }) => {
  changeValue(state, `${name}.hidden`, (prevValue) => {
    if (prevValue === undefined) {
      return false
    }

    return !prevValue
  })
  changeValue(state, name, (prevValue) => {
    if (selectedRecord && !prevValue.traits) {
      const record = selectedRecord && new Record(fields).process([ selectedRecord ])[0]

      return {
        ...prevValue,
        ...record
      }
    }
    return prevValue
  })
}

function RecordForm({ initialValues, fields, client, ...other }) {
  const newRecord = !initialValues.id

  const [ entities, setEntities ] = useState([])
  const [ entitiesLoading, setEntitiesLoading ] = useState(false)
  const [ recordLoading, setRecordLoading ] = useState(false)

  const getEntities = async (entityId) => {
    setEntitiesLoading(true)
    const { data } = await client.query({
      query: RecordForm.ENTITIES_QUERY,
      variables: {
        entityId
      },
      fetchPolicy: 'network-only'
    })

    const newEntities = [ ...entities, ...data.referencedEntities ]

    setEntities(newEntities)
    setEntitiesLoading(false)
    return newEntities
  }

  const getRecord = async (recordId) => {
    setRecordLoading(true)
    const { data: { record } } = await client.query({
      query: RecordForm.RECORD_QUERY,
      variables: {
        recordId
      },
      fetchPolicy: 'network-only'
    })

    const newEntities = entities
      .map((entity) => {
        if (entity.id === record.entityId) {
          entity.records.push(record)
        }

        return entity
      })

    setEntities(newEntities)
    setRecordLoading(false)
    return newEntities
  }

  return (
    <Form
      initialValues={initialValues}
      validate={Record.validateCreate(fields, entities)}
      mutators={{
        ...arrayMutators,
        clearReference: clearReferenceMutator,
        editReference: editReferenceMutator,
        newReference: newReferenceMutator,
        toggleFormVisibility: toggleFormVisibilityMutator
      }}
      render={({ handleSubmit, pristine, submitting, values, form: { mutators } }) => (
        <form onSubmit={handleSubmit}>
          {renderForm({
            getEntities,
            getRecord,
            entitiesLoading,
            recordLoading,
            initialValues,
            fields,
            values,
            entities,
            mutators,
            ...other
          })}
          <SidePaneFormFooter>
            <FilledButton label="Submit" disabled={(newRecord && pristine) || submitting} />
          </SidePaneFormFooter>
        </form>
      )}
      {...other}
    />
  )
}

RecordForm = injectSheet(({ typography }) => ({
  inputWrapper: {
    marginBottom: 50
  },
  input: {
    ...mixins.transitionSimple(),
    ...typography.regularSquished
  }
}))(RecordForm)

RecordForm.ENTITIES_QUERY = gql`
  query RecordsPageEntitiesQuery($entityId: ID!) {
    referencedEntities(entityId: $entityId) {
      id
      label
      name
      label
      parentId

      fields {
        ...Record_fields
      }

      records {
        ...Record_records
      }
    }
  }

  ${RECORD_FRAGMENTS.records}
  ${RECORD_FRAGMENTS.fields}
`

RecordForm.RECORD_QUERY = gql`
  query RecordsPageRecordQuery($recordId: ID!) {
    record(recordId: $recordId) {
      entityId

      ...Record_records
    }
  }

  ${RECORD_FRAGMENTS.records}
`

RecordForm = withApollo(RecordForm)

export default RecordForm
