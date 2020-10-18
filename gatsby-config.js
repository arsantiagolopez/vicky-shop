require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Vicky Shop`,
    description: `Encuentra lo mas reciente en fashion a los mejores precios.`,
    author: `@arsantiagolopez`,
    // Environment variables created in Netlify CMS
    personalInfo: {
      phone:
        process.env.PHONE_NUMBER == null
          ? 1234567890
          : process.env.PHONE_NUMBER,
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/images/logoMini.png`,
      },
    },
    `gatsby-plugin-offline`,
    // include plugin, transformer and remark before all
    // to allow gatsby-image support
    {
      // Needed to transform Netlify CMS image paths
      resolve: `gatsby-plugin-netlify-cms-paths`,
      options: {
        // Path to your Netlify CMS config file
        cmsConfig: `/static/admin/config.yml`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-plugin-netlify-cms-paths`,
            options: {
              cmsConfig: `/static/admin/config.yml`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 700,
              // required to display blurred image first
              backgroundColor: 'transparent',
            },
          },
        ],
      },
    },
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-netlify-cms-paths`,
    // Plugin to display a loading wheel if page
    // takes long to load.
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `tomato`,
        showSpinner: false,
      },
    },
    // Markdown keys on these paths will be
    // discoverable by graphql
    // images folder should be first for
    // gatsby image support
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `colors`,
        path: `${__dirname}/static/colors`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `products`,
        path: `${__dirname}/static/products`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `categories`,
        path: `${__dirname}/static/categories`,
      },
    },
  ],
}
