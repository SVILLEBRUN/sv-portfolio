<template>
    <template v-if="page">
        <Hero :page />
    </template>
</template>

<script setup lang="ts">
const { locale, defaultLocale } = useI18n()

const { data: page } = await useAsyncData('index-' + locale.value, async () => {
    let content = await queryCollection('index')
        .path(`/${locale.value}`)
        .first()
    if (!content && locale.value !== defaultLocale ) {
        content = await queryCollection('index')
            .path(`/${defaultLocale}`)
            .first()
    }
    return content
})

if(!page?.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>