module.exports = {
  siteMetadata: {
    title: `nik4u`,
    author: `Nikunj Kotecha`,
    description: `Personal space for Nikunj Kotecha.`,
    siteUrl: `https://nik4u.com/`,
    social: {
      twitter: `nikunjhk`,
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-drupal',
      options: {
        baseUrl: 'https://nik4u.com/',
        apiBase: 'jsonapi', // optional, defaults to `jsonapi`
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
  ],
}
