import { Component } from 'react'
import { CachePersistor } from 'apollo-cache-persist'

import cache from 'client/cache'
import client from 'client'

const SCHEMA_VERSION = '1'
const SCHEMA_VERSION_KEY = 'apollo-schema-version'

const storage = window.localStorage

class ClientProvider extends Component {
  constructor() {
    super()

    this.state = {
      apolloClient: null
    }
  }

  componentDidMount() {
    const persistor = new CachePersistor({
      cache,
      storage
    })

    const currentSchemaVersion = this.getSchemaVersion()

    if (currentSchemaVersion === SCHEMA_VERSION) {
      persistor.restore().then(this.setClient)
    } else {
      persistor.purge().then(() => {
        this.setSchemaVersion()
        this.setClient()
      })
    }
  }

  setSchemaVersion = () => storage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)

  getSchemaVersion = () => storage.getItem(SCHEMA_VERSION_KEY)

  setClient = () => this.setState({ apolloClient: client })

  render() {
    const { children } = this.props

    return children(this.state)
  }
}

export default ClientProvider
