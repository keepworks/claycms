import _ from 'lodash'
import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import injectSheet from 'react-jss'
import React, { Fragment } from 'react'

import EntitySidePane from 'components/internal/sidePanes/EntitySidePane'
import FilledButton from 'components/buttons/FilledButton'
import IconButton from 'components/internal/buttons/IconButton'
import ItemBar from 'components/ItemBar'
import Loader from 'components/internal/Loader'
import Table from 'components/internal/dataTable/Table'
import Tag from 'components/internal/Tag'
import useSidePane from 'lib/hooks/useSidePane'
import withConfirmation from 'components/internal/decorators/withConfirmation'
import { MutationResponseModes, OptimisticResponseModes, withMutation, withQuery } from 'lib/data'
import { CellLabel, CellText, CellTitle, PageTitle } from 'components/internal/typography'

function EntitiesPage({
  confirm,
  createEntity,
  updateEntity,
  destroyEntity,
  history,
  loading,
  entities = [],
  match,
  sortEntities
}) {
  const [ entity, isEntitySidePaneOpen, openEntitySidePane, closeEntitySidePane ] = useSidePane()
  const { params: { teamId, projectId } } = match

  const goToEntity = id => history.push(`/teams/${teamId}/projects/${projectId}/entities/${id}`)

  const handleFormSubmit = (values) => {
    if (values.id) {
      return updateEntity(values, { onSuccess: () => closeEntitySidePane() })
    }

    return createEntity(
      values, { onSuccess: (
        { data: { createEntity: { id } } }
      ) => { goToEntity(id) } }
    )
  }

  const labelRenderer = ({ record: { label } }) => (
    <Fragment>
      <CellLabel>Label</CellLabel>
      <CellTitle>{label}</CellTitle>
    </Fragment>
  )

  const nameRenderer = ({ record: { name } }) => (
    <Fragment>
      <CellLabel>Name</CellLabel>
      <CellText>{name}</CellText>
    </Fragment>
  )

  const parentNameRenderer = ({ record: { parentId } }) => {
    const parent = entities.find(e => e.id === parentId)

    return (
      <Fragment>
        <CellLabel>Parent</CellLabel>
        <CellText>{(parent && parent.label) || '-'}</CellText>
      </Fragment>
    )
  }

  const isSingletonRenderer = ({ record: { singleton } }) => (
    <Tag>{singleton ? 'SINGLETON' : 'COLLECTION'}</Tag>
  )

  const manageButtonRenderer = ({ record: { id } }) => {
    const goToRecords = () => history.push(`/teams/${teamId}/projects/${projectId}/entities/${id}/records`)

    return (
      <ItemBar>
        <FilledButton label="Edit Structure" size="small" variant="flat" onClick={() => goToEntity(id)} />
        <FilledButton label="Edit Content" size="small" variant="flat" onClick={goToRecords} />
      </ItemBar>
    )
  }

  const columns = [
    { dataKey: 'label', bordered: false, flexGrow: 1, cellRenderer: labelRenderer },
    { dataKey: 'name', flexGrow: 1, cellRenderer: nameRenderer },
    { dataKey: 'parentId', flexGrow: 1, cellRenderer: parentNameRenderer },
    { dataKey: 'singleton', width: 200, uppercase: true, cellRenderer: isSingletonRenderer },
    { dataKey: 'manageButton', width: 350, cellRenderer: manageButtonRenderer }
  ]

  const actions = [
    { icon: 'edit', onClick: record => openEntitySidePane(record) },
    {
      icon: 'trash',
      onClick: record => confirm({
        description: `By clicking on Confirm, you will delete the entity: ${record.name}`,
        onConfirmClick: () => destroyEntity(record)
      })
    }
  ]

  const rootEntities = entities.filter(e => !e.parentId)
  const sortedEntities = _.sortBy(entities, [ 'position', 'label' ])
  const nextPosition = sortedEntities.length > 0 ? (_.last(sortedEntities).position || 0) + 1 : 0
  const formValues = { projectId: match.params.projectId, position: nextPosition, ...entity }

  return (
    <Fragment>
      <Helmet>
        <title>
          Entities
        </title>
      </Helmet>

      <PageTitle>
        Entities
      </PageTitle>

      <IconButton icon="plus" onClick={() => openEntitySidePane()} />

      <Loader
        record={{
          loading,
          value: entities
        }}
        emptyView={{
          buttonLabel: 'Create new entity',
          title: 'entities',
          onButtonClick: () => openEntitySidePane()
        }}
      />

      <Table
        actions={actions}
        columns={columns}
        loading={loading}
        records={sortedEntities}
        selectable={false}
        sortable
        onSortingChange={data => sortEntities({
          entities: data.map((datum, index) => ({ id: datum.id, position: index }))
        })}
      />

      <EntitySidePane
        isOpen={isEntitySidePaneOpen}
        entities={rootEntities}
        formValues={formValues}
        onFormSubmit={handleFormSubmit}
        onRequestClose={closeEntitySidePane}
      />
    </Fragment>
  )
}

EntitiesPage = injectSheet(({ colors, typography }) => ({
  entityName: {
    ...typography.semibold,

    alignItems: 'center',
    color: colors.text_dark,
    display: 'flex',
    lineHeight: 1
  }
}))(EntitiesPage)

EntitiesPage.fragments = {
  entities: gql`
    fragment EntitiesPage_entities on Entity {
      id
      parentId
      name
      label
      singleton
      position
    }
  `
}

EntitiesPage = withMutation(gql`
  mutation CreateEntityMutation($input: CreateEntityInput!) {
    createEntity(input: $input) {
      ...EntitiesPage_entities
    }
  }

  ${EntitiesPage.fragments.entities}
`, {
  inputFilter: gql`
    fragment CreateEntityInput on CreateEntityInput {
      projectId
      parentId
      name
      label
      singleton
      position
    }
  `,
  mode: MutationResponseModes.APPEND
})(EntitiesPage)

EntitiesPage = withMutation(gql`
  mutation UpdateEntityMutation($id: ID!, $input: UpdateEntityInput!) {
    updateEntity(id: $id, input: $input) {
      ...EntitiesPage_entities
    }
  }

  ${EntitiesPage.fragments.entities}
`, {
  inputFilter: gql`
    fragment UpdateEntityInput on UpdateEntityInput {
      parentId
      name
      label
      singleton
    }
  `,
  optimistic: { mode: OptimisticResponseModes.UPDATE, response: { __typename: 'Entity' } }
})(EntitiesPage)

EntitiesPage = withMutation(gql`
  mutation DestroyEntityMutation($id: ID!) {
    destroyEntity(id: $id) {
      id
    }
  }
`, {
  optimistic: { mode: OptimisticResponseModes.DESTROY, response: { __typename: 'Entity' } },
  mode: MutationResponseModes.DELETE,
  successAlert: ({ input: { name } }) => ({
    message: `Successfully deleted entity: ${name}`
  })
})(EntitiesPage)

EntitiesPage = withMutation(gql`
  mutation SortEntitiesMutation($input: SortEntitiesInput!) {
    sortEntities(input: $input) {
      ...EntitiesPage_entities
    }
  }

  ${EntitiesPage.fragments.entities}
`)(EntitiesPage)

EntitiesPage = withQuery(gql`
  query EntitiesPageQuery($projectId: ID!) {
    entities(projectId: $projectId) {
      ...EntitiesPage_entities
    }
  }

  ${EntitiesPage.fragments.entities}
`, {
  options: ({ match }) => ({
    variables: {
      projectId: match.params.projectId
    }
  })
})(EntitiesPage)

export default withConfirmation()(EntitiesPage)
