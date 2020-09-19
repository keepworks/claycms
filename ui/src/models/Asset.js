import filesize from 'lib/filesize'

import BaseModel from './BaseModel'

class Asset extends BaseModel {
  static getFullName(asset) {
    let { name } = asset
    const extension = this.getExtension(asset)
    name = name.replace(/\.[^/.]+$/, '') // Remove file extension

    return `${name}.${extension}`
  }

  static getExtension(asset) {
    const fileExtension = asset.metadata.extension
    return fileExtension.replace(/\./g, '')
  }

  static getFormattedSize(asset) {
    return filesize(asset.metadata.size)
  }
}

export default Asset
