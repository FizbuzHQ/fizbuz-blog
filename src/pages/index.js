import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { Spinner } from "@blueprintjs/core"
import Layout from "../components/layout"
import GraphqlType from "../components/graphql-type"
import SEO from "../components/seo"

const introspectionQuery = `query IntrospectionQuery {
  __schema {
    queryType { name }
    mutationType { name }
    subscriptionType { name }
    types {
      ...FullType
    }
    directives {
      name
      description
      locations
      args {
        ...InputValue
      }
    }
  }
}

fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
  description
  type { ...TypeRef }
  defaultValue
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}
`



const IndexPage = (props) => {
  let { location } = props
  let { hash } = location
  const [types, setTypes] = useState(null)

  // fetch the API description
  useEffect(() => {
    const URL = "https://staging.fizbuz.com/graphql"

    async function fetchData() {
      let response = await fetch(URL, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({query: introspectionQuery})})
      let json = await response.json()
      //console.log(json.data.__schema.directives)
      setTypes(json.data.__schema.types)
    }
    fetchData()
  }, [])

  // after types gets populated, if a hash anchor was specified, scroll to the correct location
  useEffect(() => {
    if (types && hash) document.getElementById(hash.substr(1)).scrollIntoView()
  }, [types, hash])

  let nodes
  let edges
  let connections
  
  if (types) {
    nodes = types.filter(t => t.kind === "OBJECT" && t.interfaces.find(i => i.name === "Node")).map(t => <GraphqlType key={t.name} type={t}/>)
    edges = types.filter(t => t.kind === "OBJECT" && t.interfaces.find(i => i.name === "Edge")).map(t => <GraphqlType key={t.name} type={t}/>)
    connections = types.filter(t => t.kind === "OBJECT" && t.interfaces.find(i => i.name === "Connection")).map(t => <GraphqlType key={t.name} type={t}/>)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Welcome to the Fizbuz API Docs!</h1>
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
      <h2>GraphQL API Explorer</h2>
      <p>If you'd like to dive-in and start running some GrapQL queries, go ahead and check-out our <Link to="/api-explorer">API Explorer</Link></p>
      <h2>GraphQL Types</h2>
      <p>The core of the Fizbuz API is the schema that backs a user's public profile. Broadly, there are three kinds of types:</p>
      <ul>
        <li><Link to="/#Nodes">Node</Link>: represents a part of a profile (an Experience, an Activity, etc)</li>
        <li><Link to="/#Connections">Connection</Link>: represents the one-to-many relationship between two Nodes.</li>
        <li><Link to="/#Edges">Edge</Link>: represents the 1-to-1 relationship between two Nodes.</li>
      </ul>
      {types 
        ? <>
            <h2 id="Nodes">Nodes</h2>
            {nodes}
            <h2 id="Edges">Edges</h2>
            {edges}
            <h2 id="Connections">Connections</h2>
            {connections}
          </>
        : <Spinner/>
      }

    </Layout>
  )
}

export default IndexPage
