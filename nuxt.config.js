import messages from "./locale";

export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'clear-way',
        htmlAttrs: {
            lang: 'en'
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
        'ant-design-vue/dist/antd.css',
        '~/assets/fonts/raleway/stylesheet.css',
        '~/assets/fonts/raleway-prezi/stylesheet.css',
        '~/assets/icons/icomoon/style.css',
        'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css',
        '~/assets/css/main.css',
        '~/assets/css/media.css',
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/antd-ui',
        '@/plugins/router',
        '@/plugins/axios',
        '@/plugins/vue-print-nb',
        "~/plugins/perfect-scrollbar.js",
        "~/plugins/calendar.js",
        "~/plugins/filter.js"

    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        "nuxt-i18n",
        '@nuxtjs/axios',
    ],
    i18n: {
        locales: [{
                code: "uz",
                name: "O'zb"
            },
            {
                code: "oz",
                name: "Ўзб"
            },
            {
                code: "ru",
                name: "Рус"
            },
            {
                code: "en",
                name: "Eng"
            }
        ],
        strategy: "prefix_except_default",
        defaultLocale: "uz",
        vueI18n: {
            fallBackLocale: "uz",
            messages: messages
        }
    },
    axios: {
        baseURL: process.env.VUE_APP_BASE_URL,
        // proxy: true,
    },

    // proxy: {
    //   '/api/': 'https://edu.sudya.uz/api/v1/'
    // },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}