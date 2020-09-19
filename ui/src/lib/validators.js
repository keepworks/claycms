import { string } from 'yup'

const allowBlank = () => undefined

const required = value => (
  string().required().validate(value)
    .then(() => undefined)
    .catch(e => e.message)
)

export { allowBlank, required }
