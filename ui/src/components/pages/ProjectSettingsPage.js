import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import injectSheet from 'react-jss'
import React, { Fragment, useState } from 'react'

import ChangeProjectNameForm from 'components/internal/forms/ChangeProjectNameForm'
import Column from 'components/internal/Column'
import CopyToClipboard from 'components/internal/CopyToClipboard'
import FilledButton from 'components/buttons/FilledButton'
import ImportProjectDialog from 'components/internal/dialogs/ImportProjectDialog'
import Row from 'components/internal/Row'
import Spacer from 'components/Spacer'
import Text from 'components/typography/Text'
import { KeyPair } from 'models'
import { MutationResponseModes, withQueries, withClientQuery, withMutation } from 'lib/data'
import { PageTitle } from 'components/internal/typography'
import { Panel, PanelBody, PanelContainer, PanelHeader, PanelTable } from 'components/internal/panel'
import { parseServerDateTime } from 'lib/dateTime'

function ProjectSettingsPage({
  classes,
  exportProject,
  exports,
  importProject,
  keyPairs,
  loading,
  project,
  restores,
  updateProject
}) {
  const [ isImportDialogOpen, setIsImportDialogOpen ] = useState(false)
  const [ isImportButtonDisabled, setIsImportButtonDisabled ] = useState(false)

  const openImportDialog = () => setIsImportDialogOpen(true)
  const closeImportDialog = () => setIsImportDialogOpen(false)

  const onChangeProjectNameFormSubmit = values => (
    updateProject({ id: project.id, ...values })
  )

  const renderKeyPairs = () => (keyPairs || []).map(keyPair => (
    <Row key={keyPair.id}>
      {KeyPair.fields.map(({ name, label }) => {
        const value = keyPair[name]

        return (
          <Column key={value}>
            <div className={classes.keyLabel}>
              {label}
            </div>
            <div className={classes.keyValue}>
              {value}
              <CopyToClipboard text={value} />
            </div>
          </Column>
        )
      })}
    </Row>
  ))

  const onProjectImportSubmit = (values) => {
    importProject({ id: project.id, ...values }, {
      onSuccess: ({ data: { importProject: { status } = {} } = {} }) => {
        if (status === 'pending') {
          setIsImportButtonDisabled(true)
        }
      }
    }).then(closeImportDialog)
  }

  const processedExports = (exports || []).map(({ createdAt, status, file }, index) => ({
    name: `#${index + 1}`,
    badge: status,
    details: file,
    action: file && <CopyToClipboard text={file} />,
    time: parseServerDateTime(createdAt).fromNow()
  }))

  const processedImports = (restores || []).map(({ createdAt, status, url }, index) => ({
    name: `#${index + 1}`,
    badge: status,
    details: url,
    action: url && <CopyToClipboard text={url} />,
    time: parseServerDateTime(createdAt).fromNow()
  }))

  return (
    <Fragment>
      <Helmet>
        <title>
          Settings
        </title>
      </Helmet>

      <PageTitle>
        Settings
      </PageTitle>

      <PanelContainer>
        <Panel>
          <PanelHeader icon="lock">
            <Text color="dark" variant="semibold">Project Keys</Text>
          </PanelHeader>
          <PanelBody>
            {renderKeyPairs()}
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader icon="project">
            <Text color="dark" variant="semibold">Change Project Name</Text>
          </PanelHeader>
          <PanelBody>
            <ChangeProjectNameForm
              onSubmit={onChangeProjectNameFormSubmit}
              initialValues={{ name: project.name }}
            />
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader icon="project">
            <Text color="dark" variant="semibold">Export/Import Project</Text>
          </PanelHeader>
          <PanelBody>
            <FilledButton type="button" label="Export" onClick={() => exportProject({ id: project.id })} />
            <FilledButton type="button" label={isImportButtonDisabled ? 'Importing...' : 'Import'} disabled={isImportButtonDisabled} onClick={openImportDialog} />
            <Spacer height={30} />
            <Text color="dark" variant="semibold">Exports</Text>
            <Spacer height={20} />
            <PanelTable
              emptyText="There are no exports for this project."
              records={processedExports}
              loading={loading}
            />
            <Spacer height={10} />
            <Text color="dark" variant="semibold">Imports</Text>
            <Spacer height={20} />
            <PanelTable
              emptyText="There are no imports for this project."
              records={processedImports}
              loading={loading}
            />
          </PanelBody>
        </Panel>
      </PanelContainer>
      <ImportProjectDialog
        isOpen={isImportDialogOpen}
        onFormSubmit={onProjectImportSubmit}
        onRequestClose={closeImportDialog}
      />
    </Fragment>
  )
}

ProjectSettingsPage.fragments = {
  keyPair: gql`
    fragment ProjectSettingsPage_keyPair on KeyPair {
      id
      publicKey
    }
  `,
  project: gql`
    fragment ProjectSettingsPage_project on Project {
      id
      name
      isRestoring
    }
  `,
  export: gql`
    fragment ProjectSettingsPage_export on Export {
      id
      file
      status
      metadata
      createdAt
    }
  `,
  restore: gql`
    fragment ProjectSettingsPage_restore on Restore {
      id
      url
      status
      createdAt
    }
  `
}

const ProjectSettingsPageQuery = gql`
  query ProjectSettingsPage($projectId: ID!) {
    keyPairs(projectId: $projectId) {
      ...ProjectSettingsPage_keyPair
    }
  }

  ${ProjectSettingsPage.fragments.keyPair}
`

const ProjectExportsQuery = gql`
  query ProjectExports($projectId: ID!) {
    exports(projectId: $projectId) {
      ...ProjectSettingsPage_export
    }
  }

  ${ProjectSettingsPage.fragments.export}
`

const ProjectRestoresQuery = gql`
  query ProjectRestores($projectId: ID!) {
    restores(projectId: $projectId) {
      ...ProjectSettingsPage_restore
    }
  }

  ${ProjectSettingsPage.fragments.restore}
`

const ProjectSettingsPageQueryConfig = {
  options: ({ match }) => ({
    variables: { projectId: match.params.projectId }
  })
}

ProjectSettingsPage = withClientQuery(gql`
  query ProjectQuery($id: ID!) {
    project(id: $id) {
     ...ProjectSettingsPage_project
    }
  }

  ${ProjectSettingsPage.fragments.project}
`, {
  options: ({ match }) => ({
    variables: { id: match.params.projectId }
  })
})(ProjectSettingsPage)

ProjectSettingsPage = withMutation(gql`
  mutation UpdateProjectMutation($id: ID!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
     ...ProjectSettingsPage_project
    }
  }

  ${ProjectSettingsPage.fragments.project}
`, {
  successAlert: ({ input: { name } }) => ({
    message: `Successfully changed project name to: ${name}`
  })
})(ProjectSettingsPage)

ProjectSettingsPage = withMutation(gql`
  mutation ImportProjectMutation($id: ID!, $input: ImportProjectInput!) {
    importProject(id: $id, input: $input) {
      ...ProjectSettingsPage_restore
    }
  }

  ${ProjectSettingsPage.fragments.restore}
`, {
  successAlert: {
    message: 'Successfully started importing project. It may take a while.'
  },
  mode: MutationResponseModes.PREPEND,
  query: ProjectRestoresQuery
})(ProjectSettingsPage)

ProjectSettingsPage = withMutation(gql`
  mutation ExportProjectMutation($id: ID!) {
    exportProject(id: $id) {
      ...ProjectSettingsPage_export
    }
  }

  ${ProjectSettingsPage.fragments.export}
`, {
  successAlert: {
    message: 'Successfully started exporting project. It may take a while.'
  },
  mode: MutationResponseModes.PREPEND,
  query: ProjectExportsQuery
})(ProjectSettingsPage)

ProjectSettingsPage = withQueries([
  {
    query: ProjectExportsQuery,
    config: { ...ProjectSettingsPageQueryConfig }
  },
  {
    query: ProjectRestoresQuery,
    config: { ...ProjectSettingsPageQueryConfig }
  },
  {
    query: ProjectSettingsPageQuery,
    config: { ...ProjectSettingsPageQueryConfig }
  }
])(ProjectSettingsPage)

export default injectSheet(({ colors, typography, units }) => ({
  keyLabel: {
    ...typography.regularSquished,

    color: colors.text_pale,
    paddingBottom: units.keyLabelPaddingBottom
  },
  keyValue: {
    ...typography.regular,

    alignItems: 'center',
    display: 'flex',
    color: colors.text_dark,
    cursor: 'pointer',

    '& .icon': {
      marginLeft: 10
    }
  }
}))(ProjectSettingsPage)
