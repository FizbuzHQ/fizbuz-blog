/**
 * Renders information about a GraphQL type
 */

import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import styles from "./graphql-type.module.css"

function TypeName({type}) { 
    return type.kind === "OBJECT"
        ? <Link to={"/#" + type.name}>{type.name}</Link>
        : type.kind === "LIST"
        ? <>List of <FieldType type={type.ofType}/></>
        : type.name
}

function FieldType({type}) {
    return type.kind === "NON_NULL"
        ? <TypeName type={type.ofType}/>
        : <TypeName type={type}/>
}

function GraphqlType({ type }) {
  return (
    <div className={styles.type}>
        <div className={styles.typeName} id={type.name}><TypeName type={type}/></div>
        <div className={styles.typeDetails}>            
            <div className={styles.typeFields}><div className={styles.fieldsHeader}>Fields:</div>{
                type.fields.map(f => 
                    <div key={f.name} className={styles.field}>
                        <div className={styles.fieldHeader}>
                            <span className={styles.fieldName}>{f.name}</span> <span className={styles.fieldType}><FieldType type={f.type}/></span>
                        </div>
                        <div className={styles.fieldDescription}>{f.description}</div>
                </div>)}
            </div>
            <div className={styles.typeExample}>
                
            </div>
        </div>
    </div>
  )
}

GraphqlType.defaultProps = {}

GraphqlType.propTypes = {
  type: PropTypes.object
}

export default GraphqlType
