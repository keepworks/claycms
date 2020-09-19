import Helmet from 'react-helmet-async'
import React, { Fragment } from 'react'

import { PageTitle } from 'components/internal/typography'

function TeamBillingPage() {
  return (
    <Fragment>
      <Helmet>
        <title>
          Billing
        </title>
      </Helmet>

      <PageTitle>
        Billing
      </PageTitle>
    </Fragment>
  )
}

export default TeamBillingPage
