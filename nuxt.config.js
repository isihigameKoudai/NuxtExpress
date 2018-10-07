module.exports = {
  dev: (process.env.NODE_ENV !== 'production'),
  srcDir: 'src/client/',
  /*
  ** Headers of the page
  */
  head: {
    title: "nuxt-express",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=no"
      },
      { hid: "description", name: "description", content: "" },
      { property: 'og:title', content: ''},
      { property: 'og:type', content: 'website'},
      { property: 'og:image', content: '' },
      { property: 'og:image:alt', content: '' },
      { property: 'og:url', content: ''},
      { property: 'og:locale', content: 'ja_JP'},
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: '' },
      { name: 'twitter:description', content: '' },
      { name: 'twitter:image', content: '' }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: 'apple-touch-icon', size: '200x200', href: '/icon.jpg' },
      { rel: 'dns-prefetch', href: ''}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }

      config.module.rules = config.module.rules.map(rule => {
        if (
          rule.loader === "url-loader" &&
          rule.test.toString().includes("svg")
        ) {
          return { ...rule, test: /\.(png|jpe?g|gif)$/ };
        }
        return rule;
      });

      const path = require('path');
      config.resolve.alias['@components'] = path.join(__dirname, 'components');
    }
    // vendor: ['axios']
  },
  // modules: [["@nuxtjs/pwa", { icon: false }]],
  manifest: {
    name: "",
    lang: "ja",
    short_name: "",
    title: "",
    "og:title": "",
    description: "",
    "og:description": ""
  },
  workbox: {
    dev: false
  }
}