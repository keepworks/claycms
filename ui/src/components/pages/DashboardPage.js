import Helmet from 'react-helmet-async'
import React, { Fragment } from 'react'

import { PageTitle } from 'components/internal/typography'

function DashboardPage() {
  return (
    <Fragment>
      <Helmet>
        <title>
          Dashboard
        </title>
      </Helmet>

      <PageTitle>
        Dashboard
      </PageTitle>
    </Fragment>
  )
}

export default DashboardPage
