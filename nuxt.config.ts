
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: false },
    css: ['~/assets/css/main.css'],
    modules: ['@nuxt/ui', '@nuxt/content', '@nuxtjs/i18n', '@vueuse/motion/nuxt', '@nuxt/image', 'nuxt-mail'],
    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg?v=1' }
            ]
        }
    },
    image: {
        dir: 'assets/images'
    },
    components: [
        {
            path: '~/components',
            pathPrefix: false
        }
    ],
    i18n: {
        locales: [
            { code: 'fr', name: 'Français', language: 'fr-FR', dir: 'ltr' },
            { code: 'en', name: 'English', language: 'en-US', dir: 'ltr' },
            { code: 'es', name: 'Español', language: 'es-ES', dir: 'ltr' }
        ],
        strategy: 'prefix_and_default',
        defaultLocale: 'fr',
        detectBrowserLanguage: { useCookie: true, fallbackLocale: 'fr', cookieKey: 'i18n_redirected', redirectOn: 'root' }
    },
    runtimeConfig: {
        public: {
            motion: {
                directives: {
                    'slide-up': {
                        initial: { opacity: 0, y: 100 },
                        visibleOnce: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                type: 'keyframes',
                                duration: 1200,
                                ease: 'easeOut'
                            }

                        }
                    }
                }
            }
        },
        mail: {
            message: {
                to: process.env.MAIL_TARGET || '',
            },
            smtp: {
                service: 'gmail',
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                }
            }
        }
    }
})
