module.exports = {
  siteMetadata: {
    title: `bioRxiv Feed`,
    description: `Highly accessed bioRxiv articles from the past week.`,
    author: `Augustin Luna`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-rss`,
        short_name: `rss`,
        start_url: `/`,
        background_color: `#c50000`,
        theme_color: `#c50000`,
        display: `minimal-ui`,
        icon: `src/images/red_square.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              author
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allBiorxivPaper } }) => {
              let items = allBiorxivPaper.edges;

              let startDate = new Date();
              startDate.setDate(startDate.getDate() - 30);

              items = items.filter( item => {
                const date = new Date(item.node.first_posted);
                return (date >= startDate);
              });

              items = items.reverse();
              items = items.slice(0, 2);

              return items.map((item, i) => {
                return Object.assign({}, {
                  title: item.node.title,
                  description: item.node.abstract,
                  date: item.node.first_posted,
                  url: item.node.biorxiv_url,
                  guid: item.node.biorxiv_url,
                  custom_elements: [{ "content:encoded": 'UTF-8' }],
                })
              })
            },
            query: `
            {
              allBiorxivPaper(
                sort: {
                  fields: [first_posted]
                  order: DESC
                }
              ) {
                edges {
                  node {
                    id
                    biorxiv_url
                    title
                    authors
                    first_posted
                    category
                    downloads
                    abstract
                  }
                }
              }
            }
          `,
            output: "/rss.xml",
            title: "RSS Feed",
          },
        ],
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
