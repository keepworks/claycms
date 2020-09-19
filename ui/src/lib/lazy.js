import { lazy } from 'react'

const MAX_RETRIES = 4
const INTERVAL = 1000

function retry(fn, retriesLeft = MAX_RETRIES) {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((err) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            reject(new Error(`${err} after ${MAX_RETRIES} retries`))
            return
          }

          retry(fn, retriesLeft - 1).then(resolve, reject)
        }, INTERVAL)
      })
  })
}

export default fn => lazy(() => retry(() => fn()))
