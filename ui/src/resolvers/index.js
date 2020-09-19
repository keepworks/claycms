import _ from 'lodash'

import alert from './alert'
import referrer from './referrer'
import session from './session'

const resolvers = _.merge(alert, referrer, session)

export default resolvers
