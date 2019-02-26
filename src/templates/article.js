import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import { rhythm } from "../utils/typography"

class ArticleTemplate extends React.Component {

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (

      <Layout location={this.props.location} title={siteTitle}>
        <h1>{data.nodeArticle.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.nodeArticle.body.processed }}></div>

        <div>
          {data.allNodeArticle.edges.map(({ node }) => {
            const title = node.title

            return (
              <div key={node.slug}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>

              </div>
            )
          })}
        </div>
      </Layout>
    )
  }
}

export default ArticleTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    nodeArticle(fields: { slug: { eq: $slug } }) {
      title
      body {
        processed
      }
    }
    allNodeArticle(filter: {fields: { slug: { ne: $slug } }}) {
      edges {
        node {
          title
          fields {
            slug
          }
        }
      }
    }
  }
`
