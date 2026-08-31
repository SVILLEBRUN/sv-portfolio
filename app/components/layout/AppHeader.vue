<template>
    <UHeader id="header" :ui="{ root: isScrolled ? 'dark:bg-black/75' : '' }">
        <template #left>
            <NuxtLink to="/">
                <div class="tracking-tighter font-bold text-xl">
                    Sébastien<span class="text-primary">.V</span>
                </div>
            </NuxtLink>
        </template>

        <template #right>
            <UNavigationMenu :items="items" variant="link" class="hidden lg:block"/>
            <UColorModeButton class="cursor-pointer" />
            <ULocaleSelect
                :model-value="locale"
                :locales="Object.values([fr, en, es])"
                @update:model-value="setLocale($event as any)"
                class="hidden lg:block"
            />
        </template>

        <template #body>
            <UNavigationMenu :items="items" orientation="vertical" />
        </template>
    </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { en, es, fr } from '@nuxt/ui/locale'

const { locale, defaultLocale, setLocale } = useI18n()
const { data: header } = await useAsyncData(
    () => `header-${locale.value}`,
    async () => {
        let content = await queryCollection('header')
            .path(`/${locale.value}/header`)
            .first()
        if (!content && locale.value !== defaultLocale) {
            content = await queryCollection('header')
                .path(`/${defaultLocale}/header`)
                .first()
        }
        return content
    },
    { watch: [locale] }
)

if(!header.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}


const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()

const isScrolled = ref(false)

onMounted(() => {
    window.addEventListener('scroll', () => {
        isScrolled.value = window.scrollY > 50
    })
})

const items = computed<NavigationMenuItem[]>(() => [
    { 
        label: header.value?.links[0]?.label,
        to: header.value?.links[0]?.to,
        active: activeHeadings.value.includes('about') && !activeHeadings.value.includes('projects')
    },
    { 
        label: header.value?.links[1]?.label,
        to: header.value?.links[1]?.to,
        active: activeHeadings.value.includes('projects')
    },
    { 
        label: header.value?.links[2]?.label,
        to: header.value?.links[2]?.to,
        active: activeHeadings.value.includes('contact') && !activeHeadings.value.includes('projects')
    },
    {
        label: 'Langue',
        icon: 'i-lucide-globe',
        children: [
            { label: '🇫🇷 Français', onSelect: () => setLocale('fr'), active: locale.value === 'fr' },
            { label: '🇬🇧 English', onSelect: () => setLocale('en'), active: locale.value === 'en' },
            { label: '🇪🇸 Español', onSelect: () => setLocale('es'), active: locale.value === 'es'},
        ]
    }
])

nuxtApp.hooks.hookOnce('page:finish', () => {
    updateHeadings([
        document.querySelector('#about'),
        document.querySelector('#projects'),
        document.querySelector('#contact')
    ].filter(Boolean) as Element[])
})
</script>