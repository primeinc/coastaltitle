// nuxt.config.js
import eslintPlugin from 'vite-plugin-eslint';
import { faviconsPlugin } from '@darkobits/vite-plugin-favicons';
import vuetify from 'vite-plugin-vuetify'; // Import vite-plugin-vuetify
import languages from './lang/languages';
import theme from './config/theme';
import brand from './assets/text/brand';

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: brand.agency.name,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: brand.agency.desc },
        { name: 'msapplication-TileColor', content: '#FFFFFF' },
        { name: 'theme-color', content: theme.primary }, // PWA primary color
        // Social meta
        { property: 'og:site_name', content: 'luxi.ux-maestro.com' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:type', content: 'website' },
        { property: 'twitter:site', content: brand.agency.url },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: brand.agency.img },
        { property: 'og:image', content: brand.agency.img },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
      ],
      link: [
        // Removed all the static favicon links as they'll now be generated by the plugin
        // Fonts and Icons
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        },
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/ionicons@3.0.0/dist/css/ionicons.min.css',
        },
      ],
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyBPn1ULU2cmbKyxwc0aKfiT1KGsdF1keGg`,
          async: true,
          defer: true,
        },
      ],
    },
  },

  components: false,

  css: [
    'aos/dist/aos.css',
    'vuetify/lib/styles/main.sass',
    '@splidejs/vue-splide/css',
    '@/assets/scss/vuetify-overide.scss',
    '@/assets/scss/transition.scss',
    '@/assets/scss/vendors/animate.css',
    '@/assets/scss/vendors/animate-extends.css',
    '@/assets/scss/vendors/hamburger-menu.css',
  ],

  // Removed 'vite-plugin-eslint' from modules
  modules: ['@nuxtjs/i18n'],

  i18n: {
    locales: languages,
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'en',
    strategy: 'prefix',
    detectBrowserLanguage: {
      alwaysRedirect: false,
      fallbackLocale: '',
      onlyOnRoot: true, // recommended for improved SEO
      useCookie: true,
      cookieCrossOrigin: false,
      cookieDomain: null,
      cookieKey: 'i18n_redirected',
      cookieSecure: false,
    },
    vueI18n: './config/i18n.js', // use this option for next vueI18n version
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: { additionalData: `@import "@/assets/scss/styles.scss";` },
      },
    },
    plugins: [
      eslintPlugin({
        fix: true, // Enable auto-fixing
        // Optionally include/exclude specific files
        // include: ['**/*.{js,vue}'],
        // exclude: ['node_modules/**']
      }),
      faviconsPlugin({
        inject: true,
        cache: true,
        icons: {
          favicons: {
            source: './assets/images/agency-logo.png'
          },
          android: {
            source: './assets/images/agency-logo.png'
          },
          appleStartup: {
            source: './assets/images/agency-logo.png'
          }
        }
      }),
      vuetify(), // Added vite-plugin-vuetify
    ],
    build: {
      chunkSizeWarningLimit: 2000, // Increase from default 500KB to 2MB
      // Optionally adjust log level to suppress warnings
      logLevel: 'warn', // Options: 'info', 'warn', 'error', 'silent'
    },
    // Optionally, you can adjust other Vite settings here
  },

  build: {
    transpile: ['vuetify'],
    // Removed the 'extend' property as it's not valid in Nuxt 3
  },

  runtimeConfig: {
    public: {
      googleMapsApiKey: 'AIzaSyBPn1ULU2cmbKyxwc0aKfiT1KGsdF1keGg',
    },
  },

  server: {
    port: 8002,
    host: '0.0.0.0',
  },

  compatibilityDate: '2024-09-20',
});
