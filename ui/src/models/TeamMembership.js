import { object, string } from 'yup'

import BaseModel from './BaseModel'

class TeamMembership extends BaseModel {
  static validateCreate(values) {
    return this.validate(values, [ 'teamId', 'email', 'role' ])
  }

  static validateUpdate(values) {
    return this.validate(values, [ 'id', 'role' ])
  }
}

TeamMembership.roleList = [
  { value: 'editor', label: 'Editor', hint: 'Can manage content within projects.' },
  { value: 'developer', label: 'Developer', hint: 'Can manage structure and content within projects.' },
  { value: 'manager', label: 'Manager', hint: 'Can create projects, can invite others to the team.' }
]

TeamMembership.roles = TeamMembership.roleList.map(role => role.value)

TeamMembership.defaultRole = 'editor'

TeamMembership.permissions = {
  invite: [ 'owner', 'manager' ]
}

TeamMembership.schema = object({
  id: string().required(),
  teamId: string().required(),
  email: string().email().required(),
  role: string().oneOf(TeamMembership.roles).required()
})

export default TeamMembership
