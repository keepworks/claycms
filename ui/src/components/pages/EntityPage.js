import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import injectSheet from 'react-jss'
import React, { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import FieldsPage from 'components/pages/FieldsPage'
import FieldsEditPage from 'components/pages/FieldsEditPage'
import Loader from 'components/internal/Loader'
import RecordsPage from 'components/pages/RecordsPage'
import RecordsEditPage from 'components/pages/RecordsEditPage'
import Spacer from 'components/Spacer'
import withConfirmation from 'components/internal/decorators/withConfirmation'
import { BackLink, PageSubTitle } from 'components/internal/typography'
import { withQuery } from 'lib/data'
import { TabLink, TabList } from 'components/internal/tab'

function EntityPage({ entity = {}, loading, match }) {
  const { params: { teamId, projectId } } = match

  if (loading) {
    return <Loader record={{ loading: true }} />
  }

  return (
    <Fragment>
      <Helmet>
        <title>
          Entity:
          {' '}
          {entity.label || ''}
        </title>
      </Helmet>

      <BackLink to={`/teams/${teamId}/projects/${projectId}/entities`}>
        Back to Entities
      </BackLink>
      <PageSubTitle>
        Entity:
        {' '}
        {entity.label}
      </PageSubTitle>

      <TabList>
        <TabLink to={`${match.url}/fields`}>Structure</TabLink>
        <TabLink to={`${match.url}/records`}>Content</TabLink>
      </TabList>

      <Spacer height={30} />

      <Switch>
        <Route exact path={`${match.path}/fields`} component={FieldsPage} />
        <Route exact path={`${match.path}/records`} component={RecordsPage} />
        <Route exact path={`${match.path}/records/:recordId/edit`} component={RecordsEditPage} />
        <Route
          exact
          path={`${match.path}/fields/:fieldId/edit`}
          component={FieldsEditPage}
        />

        <Redirect from={match.url} to={`${match.url}/fields`} />
      </Switch>
    </Fragment>
  )
}

EntityPage = injectSheet(({ colors, typography }) => ({
  entityName: {
    ...typography.semibold,

    alignItems: 'center',
    color: colors.text_dark,
    display: 'flex',
    lineHeight: 1
  }
}))(EntityPage)

EntityPage = withQuery(gql`
  query EntityPageQuery($entityId: ID!) {
    entity(id: $entityId) {
      id
      label
      name
    }
  }
`, {
  options: ({ match }) => ({
    variables: {
      entityId: match.params.entityId
    }
  })
})(EntityPage)

export default withConfirmation()(EntityPage)
