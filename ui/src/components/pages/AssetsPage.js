import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import React, { Fragment, useEffect, useState } from 'react'
import Uppy from '@uppy/core'
import { DashboardModal } from '@uppy/react'

import AssetDialog from 'components/internal/dialogs/AssetDialog'
import AssetList from 'components/internal/AssetList'
import IconButton from 'components/internal/buttons/IconButton'
import Loader from 'components/internal/Loader'
import withConfirmation from 'components/internal/decorators/withConfirmation'
import { Asset } from 'models'
import { OptimisticResponseModes, MutationResponseModes, withMutation, withQuery } from 'lib/data'
import { PageTitle } from 'components/internal/typography'

function AssetsPage({ match, assets, confirm, loading, createAsset, updateAsset, destroyAsset }) {
  const [ asset, setAsset ] = useState({})
  const [ isAssetDialogOpen, setIsAssetDialogOpen ] = useState(false)
  const [ isUppyDashboardModalOpen, setIsUppyDashboardModalOpen ] = useState(false)
  const [ uppy ] = useState(Uppy({
    id: 'assets-uppy',
    restrictions: {
      maxNumberOfFiles: 1
    }
  }))

  const openAssetDialog = (value) => {
    setAsset(value)
    setIsAssetDialogOpen(true)
  }

  const closeAssetDialog = () => setIsAssetDialogOpen(false)

  const openUppyDashboardModal = () => setIsUppyDashboardModalOpen(true)

  const closeUppyDashboardModal = () => setIsUppyDashboardModalOpen(false)

  useEffect(() => {
    uppy.on('upload', ({ fileIDs }) => {
      const fileID = fileIDs[0]
      const { data, meta } = uppy.getFile(fileID)

      createAsset({ file: data, name: meta.name, projectId: match.params.projectId }, {
        onSuccess: (response) => {
          const createdAsset = response.data.asset
          if (!createdAsset) {
            return
          }

          uppy.reset()
          closeUppyDashboardModal()
        }
      })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFormSubmit = values => (
    updateAsset(values, { onSuccess: closeAssetDialog })
  )

  const actions = [
    { icon: 'edit', onClick: record => openAssetDialog(record) },
    {
      icon: 'trash',
      onClick: record => confirm({
        description: `By clicking on Confirm, you will delete the asset: ${Asset.getFullName(record)}`,
        onConfirmClick: () => destroyAsset(record)
      })
    }
  ]

  return (
    <Fragment>
      <Helmet>
        <title>
          Assets
        </title>
      </Helmet>

      <PageTitle>
        Assets
      </PageTitle>

      <IconButton icon="plus" onClick={openUppyDashboardModal} />

      <Loader
        record={{
          loading,
          value: assets
        }}
        emptyView={{
          title: 'assets'
        }}
      />

      <AssetList actions={actions} records={assets} />

      <AssetDialog
        isOpen={isAssetDialogOpen}
        formValues={asset}
        onFormSubmit={handleFormSubmit}
        onRequestClose={closeAssetDialog}
      />

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

AssetsPage.fragments = {
  assets: gql`
    fragment AssetsPage_assets on Asset {
      id
      name
      metadata
    }
  `
}

AssetsPage = withMutation(gql`
  mutation CreateAssetMutation($input: CreateAssetInput!) {
    asset: createAsset(input: $input) {
      ...AssetsPage_assets
    }
  }

  ${AssetsPage.fragments.assets}
`, {
  inputFilter: gql`
    fragment CreateAssetInput on CreateAssetInput {
      projectId
      name
      file
    }
  `,
  mode: MutationResponseModes.PREPEND
})(AssetsPage)

AssetsPage = withMutation(gql`
  mutation UpdateAssetMutation($id: ID!, $input: UpdateAssetInput!) {
    updateAsset(id: $id, input: $input) {
      ...AssetsPage_assets
    }
  }

  ${AssetsPage.fragments.assets}
`, {
  inputFilter: gql`
    fragment UpdateAssetInput on UpdateAssetInput {
      name
    }
  `,
  optimistic: { mode: OptimisticResponseModes.UPDATE, response: { __typename: 'Asset' } }
})(AssetsPage)

AssetsPage = withMutation(gql`
  mutation  ($id: ID!) {
    destroyAsset(id: $id) {
      id
    }
  }
`, {
  optimistic: { mode: OptimisticResponseModes.DESTROY, response: { __typename: 'Asset' } },
  mode: MutationResponseModes.DELETE,
  successAlert: ({ input }) => ({
    message: `Successfully deleted asset: ${Asset.getFullName(input)}`
  })
})(AssetsPage)

AssetsPage = withQuery(gql`
  query AssetsPageQuery($projectId: ID!) {
    assets(projectId: $projectId) {
      ...AssetsPage_assets
    }
  }

  ${AssetsPage.fragments.assets}
`, {
  options: ({ match }) => ({
    variables: {
      projectId: match.params.projectId
    }
  })
})(AssetsPage)

export default withConfirmation()(AssetsPage)
