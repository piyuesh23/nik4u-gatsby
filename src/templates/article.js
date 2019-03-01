import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { rhythm } from "../utils/typography"
import Img from "gatsby-image"

class ArticleTemplate extends React.Component {

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const achievements = data.allNodeAchievement.edges
    return (

      <Layout location={this.props.location} title={siteTitle}>
        <h1>{data.nodeArticle.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.nodeArticle.body.processed }}></div>

        <div>
          {data.allNodeArticle.edges.map(({ node }) => {
            const title = node.title
            const slug = node.fields.slug

            return (
              <div key={ slug }>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={ slug }>
                    {title}
                  </Link>
                </h3>

              </div>
            )
          })}
        </div>

        <div>
          {achievements.map (edge => {
            const src = edge.node.relationships.field_badge.localFile.childImageSharp.fixed
            const slug = edge.node.id
            return (
              <span key={slug}>
                <Img fixed={src}/>
              </span>
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
    allNodeAchievement{
      edges{
        node{
          id
          relationships{
            field_badge{
              localFile{
                childImageSharp{
                  fixed(width:100 height:100) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
