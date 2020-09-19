import classNames from 'classnames'
import injectSheet from 'react-jss'
import React, { Component, Fragment } from 'react'
import { Field, Form } from 'react-final-form'

import ButtonGroupInput from 'components/internal/inputs/ButtonGroupInput'
import DialogFormFooter from 'components/internal/DialogFormFooter'
import FilledButton from 'components/buttons/FilledButton'
import FontIcon from 'components/FontIcon'
import TextInput from 'components/inputs/TextInput'
import { TeamMembership } from 'models'

class TeamMemberForm extends Component {
  constructor() {
    super()

    this.state = {
      hoveredRole: null
    }
  }

  handleMouseOver = role => this.setState({ hoveredRole: role })

  handleMouseOut = () => this.setState({ hoveredRole: null })

  renderRoleHints = ({ role }) => {
    const { classes } = this.props
    const { hoveredRole } = this.state

    const options = TeamMembership.roleList

    return (
      <div className={classes.roleHints}>
        {options.map(({ hint, value }) => {
          if (!hint) {
            return null
          }

          const isHovered = value === hoveredRole
          const isSelected = value === role

          return (
            <div
              key={`option-${value}`}
              className={classNames(classes.roleHint, {
                [classes.roleHint_active]: hoveredRole ? isHovered : isSelected
              })}
            >
              <FontIcon name="round-info" size="small" />
              {hint}
            </div>
          )
        })}
      </div>
    )
  }

  renderFormFields = () => {
    const {
      initialValues: { id }
    } = this.props

    const options = TeamMembership.roleList

    if (id) {
      return (
        <Fragment>
          <Field name="id" component="input" type="hidden" />
          <Field name="email" component={TextInput} placeholder="Email" icon="email" disabled />
          <Field
            name="role"
            component={ButtonGroupInput}
            options={options}
            handleMouseOut={this.handleMouseOut}
            handleMouseOver={this.handleMouseOver}
            autoFocus
          />
        </Fragment>
      )
    }

    return (
      <Fragment>
        <Field name="teamId" component="input" type="hidden" />
        <Field name="email" component={TextInput} placeholder="Email" icon="email" autoComplete="on" autoFocus />
        <Field
          name="role"
          component={ButtonGroupInput}
          options={options}
          handleMouseOut={this.handleMouseOut}
          handleMouseOver={this.handleMouseOver}
        />
      </Fragment>
    )
  }

  render() {
    const { initialValues, ...other } = this.props

    const validateFunction = initialValues.id
      ? TeamMembership.validateUpdate
      : TeamMembership.validateCreate

    return (
      <Form
        initialValues={initialValues}
        validate={validateFunction}
        render={({ handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            {this.renderFormFields()}

            {this.renderRoleHints(values)}

            <DialogFormFooter>
              <FilledButton label="Submit" disabled={submitting} />
            </DialogFormFooter>
          </form>
        )}
        {...other}
      />
    )
  }
}

export default injectSheet(({ colors, typography, units }) => ({
  roleHints: {
    marginTop: units.roleHintsMarginTop,
    marginBottom: units.roleHintsMarginBottom
  },
  roleHint: {
    ...typography.lightSmall,

    color: colors.text_pale,
    display: 'none',
    minHeight: units.roleHintMinHeight,
    paddingLeft: units.roleHintPaddingLeft,
    position: 'relative',

    '& .icon': {
      lineHeight: `${typography.lightSmall.lineHeight * typography.lightSmall.fontSize}px`,
      position: 'absolute',
      left: 0
    }
  },
  roleHint_active: {
    display: 'block'
  }
}))(TeamMemberForm)
