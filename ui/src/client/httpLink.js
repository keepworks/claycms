import { createUploadLink } from 'apollo-upload-client'

const httpLink = createUploadLink({
  uri: `${process.env.API_BASE_URL}/graphql`
})

export default httpLink
