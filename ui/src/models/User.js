import { object, ref, string } from 'yup'

import BaseModel from './BaseModel'

class User extends BaseModel {
  static validateChangePassword(values) {
    return this.validate(values, [ 'currentPassword', 'password', 'passwordConfirmation' ])
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
  password: string().required().min(8).max(72),
  passwordConfirmation: string().equalTo(ref('password')).required(),
  firstName: string().required(),
  lastName: string().required(),
  currentPassword: string().required()
})

User.sessionStates = Object.freeze({
  LOGGED_IN: 'logged_in',
  LOGGED_OUT: 'logged_out'
})

export default User
