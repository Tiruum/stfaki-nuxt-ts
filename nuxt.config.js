import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'stfaki-nuxt-ts',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/fakeVuexStore",
    "~plugins/axios.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@pinia/nuxt',
    '@nuxtjs/proxy',
  ],

  auth: {
    strategies: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        scope: ['profile', 'email'],
        codeChallengeMethod: '',
        responseType: 'token id_token',
      },
      yandex: {
        scheme: '~/schemes/yandex',
        clientId: "5230ad75d7624818a97070c9910d409d",
        clientSecret: "f2e803e14a90439d9126096811c989d7",
        endpoints: {
          login: { url: 'https://oauth.yandex.ru/authorize?response_type=token&client_id=5230ad75d7624818a97070c9910d409d&redirect_uri=http://localhost:3000/login', method: 'get', propertyName: 'access_token' },
          logout: {},
          user: { url: 'http://oauth.yandex.ru', method: 'post', propertyName: 'oauth_token' }
        }
      },
      local: {
        endpoints: {
          login: { url: 'https://oauth.yandex.ru/authorize?response_type=token&client_id=5230ad75d7624818a97070c9910d409d&redirect_uri=http://localhost:3000/login', method: 'get', propertyName: 'access_token' },
          get_token: { url: 'http://oauth.yandex.ru', method: 'post', propertyName: 'oauth_token' },
          user: { url: '/api/users/user', method: 'get', propertyName: 'data.attributes' }
        },
      },
      discord: {
        clientId: '1006560952239534133',
        clientSecret: 'y9K0lxHF29hMC9EChGmhSGm056DpP4Z0'
      },
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    proxy: true,
    prefix: '/api/'
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },

  proxy: {
    '/api/': {
      target: 'http://localhost:8080/',
      pathRewrite: {'^/api/': ''}
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    optimization: {
      runtimeChunk: true,
      splitChunks: {
        name: true,
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  }
})