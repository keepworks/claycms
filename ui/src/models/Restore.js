import { object, string } from 'yup'

import BaseModel from './BaseModel'

class Restore extends BaseModel {
  static validateCreate(values) {
    return this.validate(values, [ 'url' ])
  }
}

Restore.schema = object({
  url: string().required()
})

export default Restore
