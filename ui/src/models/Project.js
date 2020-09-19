import { object, string } from 'yup'

import BaseModel from './BaseModel'

class Project extends BaseModel {
  static validateCreate(values) {
    return this.validate(values, [ 'name' ])
  }

  static validateUpdate(values) {
    return this.validate(values, [ 'name' ])
  }
}

Project.schema = object({
  name: string().required()
})

export default Project
