import { object, string } from 'yup'

import BaseModel from './BaseModel'

class Entity extends BaseModel {
  static validateCreate(values) {
    return this.validate(values, [ 'name', 'label' ])
  }

  static validateUpdate(values) {
    return this.validate(values, [ 'name', 'label' ])
  }
}

Entity.schema = object({
  name: string().required(),
  label: string().required()
})

export default Entity
