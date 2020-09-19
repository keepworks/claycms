const clear = (fields, state, utils) => {
  fields.forEach((field) => {
    utils.changeValue(state, field, () => undefined)
  })
}

const set = (args, state, utils) => {
  const [ fieldList ] = args
  Object.keys(fieldList).forEach((field) => {
    utils.changeValue(state, field, () => fieldList[field])
  })
}

export { clear, set }
