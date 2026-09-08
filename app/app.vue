<template>
    <UApp>
        <AppHeader />
        <UMain>
            <NuxtPage />
        </UMain>
        <AppFooter />
    </UApp>
</template>

<script setup lang="ts">
const { locale, defaultLocale } = useI18n()
const { data: seo } = await useAsyncData(
    () => `seo-${locale.value}/seo`,
    async () => {
        let content = await queryCollection('seo')
            .path(`/${locale.value}/seo`)
            .first()
        if (!content && locale.value !== defaultLocale) {
            content = await queryCollection('seo')
                .path(`/${defaultLocale}/seo`)
                .first()
        }
        return content
    },
    { watch: [locale] }
)


useHead({
    title: () => seo.value?.title || '',
    link: [
        { rel: 'canonical', href: 'https://sebastien-villebrun.com' },
        { rel: 'alternate', hreflang: 'fr', href: 'https://sebastien-villebrun.com' },
        { rel: 'alternate', hreflang: 'en', href: 'https://sebastien-villebrun.com/en' },
        { rel: 'alternate', hreflang: 'es', href: 'https://sebastien-villebrun.com/es' },
        { rel: 'alternate', hreflang: 'x-default', href: 'https://sebastien-villebrun.com' }
    ]
})


useSeoMeta({
    title: () => seo.value?.title || '',
    description: () => seo.value?.description || '',
    author: () => seo.value?.author || '',

    // Open Graph
    ogTitle: () => seo.value?.ogTitle || '',
    ogDescription: () => seo.value?.ogDescription || '',
    ogImage: () => seo.value?.ogImage || '',
    ogUrl: () => seo.value?.ogUrl || '',
    ogType: 'website',
    ogSiteName: () => seo.value?.ogSiteName || '',

    // Twitter
    twitterCard: 'summary_large_image',
    twitterTitle: () => seo.value?.twitterTitle || '',
    twitterDescription: () => seo.value?.twitterDescription || '',
    twitterImage: () => seo.value?.twitterImage || '',
})


useSchemaOrg([
    definePerson({
        name: () => seo.value?.schemaOrg?.person?.name || '',
        jobTitle: () => seo.value?.schemaOrg?.person?.jobTitle || '',
        url: () => seo.value?.schemaOrg?.person?.url || '',
        sameAs: [
            'https://github.com/SVILLEBRUN',
            'https://www.linkedin.com/in/sébastien-villebrun-dev-fs/',
            'https://www.malt.fr/profile/sebastienvillebrun'
        ]
    })
])
</script>