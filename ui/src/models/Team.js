import { object, string } from 'yup'

import BaseModel from './BaseModel'

class Team extends BaseModel {
  static validateCreate(values) {
    return this.validate(values, [ 'name' ])
  }

  static validateUpdate(values) {
    return this.validate(values, [ 'name' ])
  }

  static validateCreateTransferRequest(values) {
    return this.validateSchema(values, { userId: string().required() })
  }
}

Team.schema = object({
  name: string().required()
})

export default Team
