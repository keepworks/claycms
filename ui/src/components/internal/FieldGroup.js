import injectSheet from 'react-jss'
import React from 'react'

function FieldGroup({ classes, children }) {
  return (
    <div className={classes.childFieldWrapper}>{children}</div>
  )
}

FieldGroup.Header = ({ classes, children }) => (
  <div className={classes.childFieldHeader}>
    {children}
  </div>
)

FieldGroup.Header = injectSheet({
  childFieldHeader: {
    display: 'flex',
    position: 'absolute',
    top: 10,
    right: 10,

    '& > *': {
      marginLeft: 10
    }
  }
})(FieldGroup.Header)

export default injectSheet(({ colors }) => ({
  childFieldWrapper: {
    backgroundColor: colors.uploadInputBackground,
    border: `1px solid ${colors.uploadInputBorder}`,
    borderLeftWidth: 5,
    marginBottom: 20,
    padding: [ 30, 30, 20, 20 ],
    position: 'relative'
  }
}))(FieldGroup)
