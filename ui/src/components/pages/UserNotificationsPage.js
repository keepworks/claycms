import Helmet from 'react-helmet-async'
import React, { Fragment } from 'react'

import { PageTitle } from 'components/internal/typography'

function UserNotificationsPage() {
  return (
    <Fragment>
      <Helmet>
        <title>
          Notifications
        </title>
      </Helmet>

      <PageTitle>
        Notifications
      </PageTitle>
    </Fragment>
  )
}

export default UserNotificationsPage
