import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allNodeArticle.edges
    const achievements = data.allNodeAchievement.edges
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All articles"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        {posts.map(({ node }) => {
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
        {achievements.map (edge => {
          const src = edge.node.relationships.field_badge.localFile.childImageSharp.fixed
          const slug = edge.node.id
          return (
            <span key={slug}>
              <Img fixed={src}/>
            </span>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allNodeArticle {
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
