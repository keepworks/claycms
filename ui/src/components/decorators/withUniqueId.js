import hoistNonReactStatics from 'hoist-non-react-statics'
import React, { Component } from 'react'

let nextId = 0

function withUniqueId() {
  return (WrappedComponent) => {
    class EnhancedComponent extends Component {
      constructor(props) {
        super(props)

        this.cache = {}
      }

      uniqueId = (keyStr) => {
        if (!Object.prototype.hasOwnProperty.call(this.cache, keyStr)) {
          nextId += 1
          this.cache[keyStr] = `uid-${keyStr}-${nextId}`
        }
        return this.cache[keyStr]
      }

      render() {
        const wrappedComponentProps = Object.assign({}, this.props, {
          uniqueId: this.uniqueId
        })

        return <WrappedComponent {...wrappedComponentProps} />
      }
    }

    hoistNonReactStatics(EnhancedComponent, WrappedComponent)

    return EnhancedComponent
  }
}

export default withUniqueId
