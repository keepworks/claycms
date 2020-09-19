import { addMethod, mixed, lazy, object, reach, setLocale, string } from 'yup'
import { setIn } from 'final-form'

/* eslint-disable no-template-curly-in-string */

setLocale({
  mixed: {
    required: "can't be blank"
  },

  string: {
    email: 'is not a valid email',
    max: 'is too long (maximum is ${max} characters)',
    min: 'is too short (minimum is ${min} characters)'
  }
})

function equalTo(ref, msg) {
  return mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg || "doesn't match ${reference}",
    params: {
      reference: ref.path
    },
    test(value) {
      return value === this.resolve(ref)
    }
  })
}

addMethod(string, 'equalTo', equalTo)

/* eslint-enable no-template-curly-in-string */

class BaseModel {
  static validate(values, fields = []) {
    const validationSchema = lazy(() => {
      if (fields.length === 0) {
        return this.schema
      }

      return object(fields.reduce((fieldList, field) => {
        fieldList[field] = reach(this.schema, field)
        return fieldList
      }, {}))
    })

    return this.validateWithSchema(values, validationSchema)
  }

  static validateSchema(values, schema) {
    const validationSchema = object(schema)

    return this.validateWithSchema(values, validationSchema)
  }

  static validateWithSchema(values, validationSchema) {
    return validationSchema.validate(values, { strict: true, abortEarly: false })
      .then(() => {})
      .catch(e => e.inner.reduce((errors, { path, message }) => setIn(errors, path, message), {}))
  }

  static authorize(record = {}, action) {
    return this.permissions[action].indexOf(record.role) !== -1
  }
}

export default BaseModel
