import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Welcome to the Fizbuz API Docs!</h1>
    <p>Now go build something great.</p>
    <p><Link to="/api-explorer">API Explorer</Link></p>
    <h2>The GraphQL endpoint</h2>
      <pre>
        <code>https://fizbuz.com/graphql</code>
      </pre>
    <h2>Authentication</h2>
    <p>
      For the moment, there is no authentication needed for querying the
      GraphQL API. All of the data that can be queried is considered public by
      nature, because it is data that is displayed on a user&apos;s public
      Fizbuz profile. Any requests for fields that are private (i.e. email)
      are automatically redacted by the GraphQL API before being returned to
      the client.
    </p>
    <h2>Querying the GraphQL Endpoint</h2>
    <p>
      To query the GraphQL API, make a POST request with a JSON payload. The
      payload must contain a string called query:
    </p>
    <pre>
      <code>
        {`curl https://fizbuz.com/graphql -d 'query={account(nickname:"carter"){email,name}}'`}
      </code>
    </pre>
    <p>
      The response from a query to the GraphQL API will be a JSON payload. If
      the query is successful, it will have a <code>data</code> property whose
      value is the results of the query. If the query fails, it will have an{' '}
      <code>errors</code> property that contains an array of errors.
    </p>
  </Layout>
)

export default IndexPage
