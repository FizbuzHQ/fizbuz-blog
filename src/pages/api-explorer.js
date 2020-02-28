import React from "react"
import GraphiQL from 'graphiql-with-extensions'
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

const defaultQuery = `{
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
  <Layout>
    <SEO title="Fizbuz API Explorer" />
    <h1>API Explorer</h1>
    <div style={{height: '100vh'}}>
    <GraphiQL
      fetcher={graphQLFetcher}
      // Some optional props
      defaultQuery={defaultQuery}
      // disableExplorer={false}
    />
    </div>
  </Layout>
)

export default ApiExplorer
