import React from "react"
import { Link } from "gatsby"
import GraphiQL from "graphiql";
import Layout from "../components/layout"
import SEO from "../components/seo"
import './api-explorer.css'

const URL = "https://fizbuz.com/graphql";

function graphQLFetcher(graphQLParams) {
  return fetch(URL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(graphQLParams)
  }).then(response => response.json());
}

const defaultQuery = `
{
  account(nickname: "carter") {
    about
    location
    activitiesConnection {
      edges {
        node {
          kind
          title
        }
      }
    }
  }
}
`;

const ApiExplorer = () => (
  <Layout width="100vw">
    <SEO title="API Explorer" />
    <h1>API Explorer</h1>
    <p>Some text</p>
    <div style={{height: '100vh'}}>
      <GraphiQL fetcher={graphQLFetcher} defaultQuery={defaultQuery} />
    </div>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default ApiExplorer
