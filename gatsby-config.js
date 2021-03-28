require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `World of TG`,
    description: `Largest collection of TG related content`,
    author: `John`,
    siteUrl: "https://www.worldoftg.com",
    image: "images/favicon.ico",
    keywords: ["tg", "transformation", "m2f", "transgender", "fiction", "genderbent", "f2m", "tg captions", "tg stories", "tg comics"]
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-material-ui`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'world of tg',
        short_name: 'wotg',
        start_url: '/',
        background_color: "#212121",
        theme_color: "#212121",
        display: "minimal-ui",
        icon: 'src/images/android-chrome-512x512.png'
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: "AWSAppSync",
        fieldName: "appsync",
        url: `${process.env.GATSBY_APP_SYNC_URL}`,
        headers: {
            "x-api-key": `${process.env.GATSBY_APP_SYNC_API_KEY}`
        },
      }
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
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { appsync } }) => {
              return appsync.feed.map(feed => {
                return {
                  title: feed.title,
                  description: feed.description,
                  date: feed.pubDate,
                  url: feed.link,
                  guid: feed.guid,
                  author: feed.author,
                  enclosure: {
                    url: feed.image,
                    type: "image/jpeg",
                  }
                }
              })
            },
            query: `
              {
                appsync {
                  feed {
                    author
                    description
                    guid
                    image
                    link
                    pubDate
                    title
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
  ],
}
