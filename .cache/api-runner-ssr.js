var plugins = [{
      plugin: require('/Users/jlimpert/Documents/go/src/jlimpert/wotg/web/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/jlimpert/Documents/go/src/jlimpert/wotg/web/node_modules/gatsby-plugin-material-ui/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/jlimpert/Documents/go/src/jlimpert/wotg/web/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"world of tg","short_name":"wotg","start_url":"/","background_color":"#212121","theme_color":"#212121","display":"minimal-ui","icon":"src/images/android-chrome-512x512.png","cache_busting_mode":"query","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":"b1f8e1bb304bcc630a95d7c89e55f0d5"},
    },{
      plugin: require('/Users/jlimpert/Documents/go/src/jlimpert/wotg/web/node_modules/gatsby-plugin-feed/gatsby-ssr'),
      options: {"plugins":[],"query":"\n          {\n            site {\n              siteMetadata {\n                title\n                description\n                siteUrl\n                site_url: siteUrl\n              }\n            }\n          }\n        ","feeds":[{"query":"\n              {\n                appsync {\n                  feed {\n                    author\n                    description\n                    guid\n                    image\n                    link\n                    pubDate\n                    title\n                  }\n                }\n              }\n            ","output":"/rss.xml"}]},
    },{
      plugin: require('/Users/jlimpert/Documents/go/src/jlimpert/wotg/web/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
