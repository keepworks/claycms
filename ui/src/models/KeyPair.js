import BaseModel from './BaseModel'

class KeyPair extends BaseModel {
}

KeyPair.fields = Object.freeze([
  { name: 'publicKey', label: 'Public Key' }
])

export default KeyPair
