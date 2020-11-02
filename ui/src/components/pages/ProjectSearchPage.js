import Helmet from 'react-helmet-async'
import React, { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import FieldsSearchPage from 'components/pages/FieldsSearchPage'
import RecordsSearchPage from 'components/pages/RecordsSearchPage'
import { PageTitle } from 'components/internal/typography'
import { TabLink, TabList } from 'components/internal/tab'

function ProjectSearchPage({ match }) {
  return (
    <Fragment>
      <Helmet>
        <title>
          Search Project
        </title>
      </Helmet>

      <PageTitle>
        Search Project
      </PageTitle>

      <TabList>
        <TabLink to={`${match.url}/fields`}>Structure</TabLink>
        <TabLink to={`${match.url}/records`}>Content</TabLink>
      </TabList>

      <Switch>
        <Route path={`${match.path}/records`} component={RecordsSearchPage} />
        <Route path={`${match.path}/fields`} component={FieldsSearchPage} />
        <Redirect from={match.url} to={`${match.url}/records`} />
      </Switch>
    </Fragment>
  )
}

export default ProjectSearchPage
