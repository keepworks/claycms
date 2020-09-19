import { object, string } from 'yup'

import BaseModel from './BaseModel'

class User extends BaseModel {
  static validateSignup(values) {
    return this.validate(values, [ 'email' ])
  }

  static validateProfile(values) {
    return this.validate(values, [ 'firstName', 'lastName' ])
  }

  static fullName({ firstName, lastName }) {
    return [ firstName, lastName ].map(str => str && str).join(' ').trim()
  }

  static initials({ firstName, lastName }) {
    return [ firstName, lastName ]
      .map(str => str && str.charAt(0).toUpperCase())
      .join('')
  }
}

User.schema = object({
  email: string().email().required(),
  firstName: string().required(),
  lastName: string().required()
})

User.sessionStates = Object.freeze({
  LOGGED_IN: 'logged_in',
  LOGGED_OUT: 'logged_out'
})

export default User
