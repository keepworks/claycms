import path from 'path'

import isRetina from 'lib/isRetina'

const retinaImageSuffix = '@2x'
const req = require.context('images', true)

export default function resolveImage(source) {
  let filename = source

  if (isRetina()) {
    const extension = path.extname(source)

    filename = filename.replace(extension, '')
    filename = `${filename}${retinaImageSuffix}${extension}`
  }

  return req(`./${filename}`)
}
