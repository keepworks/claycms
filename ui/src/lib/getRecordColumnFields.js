import _ from 'lodash'
import Field from 'models/Field'

const getRecordColumnFields = recordFields => _.sortBy((recordFields || [])
  .filter(Field.isRoot)
  .filter(Field.isColumn)
  .filter(Field.isVisibleColumn),
[ 'position' ])

export default getRecordColumnFields
