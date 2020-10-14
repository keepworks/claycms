import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import React, { Fragment, useEffect, useState } from 'react'
import Uppy from '@uppy/core'
import { DashboardModal } from '@uppy/react'

import AssetList from 'components/internal/AssetList'
import CopyToClipboard from 'components/internal/CopyToClipboard'
import IconButton from 'components/internal/buttons/IconButton'
import Loader from 'components/internal/Loader'
import withConfirmation from 'components/internal/decorators/withConfirmation'
import { Asset } from 'models'
import { OptimisticResponseModes, MutationResponseModes, withMutation, withQuery } from 'lib/data'
import { PageTitle } from 'components/internal/typography'

function ResourcesPage({
  match, resources, confirm, loading, createResource, updateResource, destroyResource
}) {
  const [ isUppyDashboardModalOpen, setIsUppyDashboardModalOpen ] = useState(false)
  const [ uppy ] = useState(Uppy({
    id: 'resources-uppy',
    restrictions: {
      maxNumberOfFiles: 1
    }
  }))

  const setSelectedResource = (value) => {
    const uppyState = uppy.getState()
    uppy.setState({
      ...uppyState,
      ...{ resource: value }
    })
  }

  const getSelectedResource = () => {
    const uppyState = uppy.getState()

    return uppyState.resource
  }

  const openUppyDashboardModal = () => setIsUppyDashboardModalOpen(true)

  const closeUppyDashboardModal = () => {
    setSelectedResource(null)
    setIsUppyDashboardModalOpen(false)
  }

  const onEditResourceClick = (resource) => {
    setSelectedResource(resource)
    openUppyDashboardModal()
  }

  const uploadOnSuccess = (response) => {
    const savedResource = response.data.resource

    if (!savedResource) {
      return
    }

    uppy.reset()
    closeUppyDashboardModal()
  }

  useEffect(() => {
    uppy.on('upload', ({ fileIDs }) => {
      const fileID = fileIDs[0]
      const { data, meta } = uppy.getFile(fileID)
      const resource = getSelectedResource()

      if (resource) {
        updateResource({ file: data, id: resource.id }, {
          onSuccess: uploadOnSuccess
        })
      } else {
        createResource({ file: data, name: meta.name, projectId: match.params.projectId }, {
          onSuccess: uploadOnSuccess
        })
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const actions = [
    { icon: 'edit', onClick: record => onEditResourceClick(record) },
    {
      icon: 'trash',
      onClick: record => confirm({
        description: `By clicking on Confirm, you will delete the resource: ${Asset.getFullName(record)}`,
        onConfirmClick: () => destroyResource(record)
      })
    },
    {
      key: 'copy-url',
      render: record => <CopyToClipboard text={record.file} description="Copy URL to clipboard" iconSize="small" />
    }
  ]

  return (
    <Fragment>
      <Helmet>
        <title>
          Resources
        </title>
      </Helmet>

      <PageTitle>
        Resources
      </PageTitle>

      <IconButton icon="plus" onClick={openUppyDashboardModal} />

      <Loader
        record={{
          loading,
          value: resources
        }}
        emptyView={{
          title: 'resources'
        }}
      />

      <AssetList actions={actions} records={resources} />

      <DashboardModal
        closeModalOnClickOutside
        uppy={uppy}
        metaFields={[
          { id: 'name', name: 'Name', placeholder: 'File Name' }
        ]}
        open={isUppyDashboardModalOpen}
        onRequestClose={closeUppyDashboardModal}
      />
    </Fragment>
  )
}

ResourcesPage.fragments = {
  resources: gql`
    fragment ResourcesPage_resources on Resource {
      id
      name
      metadata
      file
    }
  `
}

ResourcesPage = withMutation(gql`
  mutation CreateResourceMutation($input: CreateResourceInput!) {
    resource: createResource(input: $input) {
      ...ResourcesPage_resources
    }
  }

  ${ResourcesPage.fragments.resources}
`, {
  inputFilter: gql`
    fragment CreateResourceInput on CreateResourceInput {
      projectId
      name
      file
    }
  `,
  mode: MutationResponseModes.PREPEND
})(ResourcesPage)

ResourcesPage = withMutation(gql`
  mutation UpdateResourceMutation($id: ID!, $input: UpdateResourceInput!) {
    resource: updateResource(id: $id, input: $input) {
      id
      metadata
    }
  }
`, {
  inputFilter: gql`
    fragment UpdateResourceInput on UpdateResourceInput {
      file
    }
  `
})(ResourcesPage)

ResourcesPage = withMutation(gql`
  mutation  ($id: ID!) {
    destroyResource(id: $id) {
      id
    }
  }
`, {
  optimistic: { mode: OptimisticResponseModes.DESTROY, response: { __typename: 'Resource' } },
  mode: MutationResponseModes.DELETE,
  successAlert: ({ input }) => ({
    message: `Successfully deleted resource: ${Asset.getFullName(input)}`
  })
})(ResourcesPage)

ResourcesPage = withQuery(gql`
  query ResourcesPageQuery($projectId: ID!) {
    resources(projectId: $projectId) {
      ...ResourcesPage_resources
    }
  }

  ${ResourcesPage.fragments.resources}
`, {
  options: ({ match }) => ({
    variables: {
      projectId: match.params.projectId
    }
  })
})(ResourcesPage)

export default withConfirmation()(ResourcesPage)
