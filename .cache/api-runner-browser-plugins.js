module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-material-ui/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"world of tg","short_name":"wotg","start_url":"/","background_color":"#212121","theme_color":"#212121","display":"minimal-ui","icon":"src/images/android-chrome-512x512.png","cache_busting_mode":"query","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":"b1f8e1bb304bcc630a95d7c89e55f0d5"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
