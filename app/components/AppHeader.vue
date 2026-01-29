<template>
    <UHeader id="header" :ui="{ root: isScrolled ? 'dark:bg-black/75' : '' }">
        <template #left>
            <NuxtLink to="/">
                <div class="tracking-tighter font-extrabold text-xl">
                    Sébastien<span class="text-primary">.V</span>
                </div>
            </NuxtLink>
        </template>

        <template #right>
            <UNavigationMenu :items="items" variant="link" class="hidden lg:block"/>
            <UColorModeButton class="cursor-pointer" />
        </template>

        <template #body>
            <UNavigationMenu :items="items" class="" orientation="vertical" />
        </template>
    </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

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
        label: 'Ma personnalité',
        to: '#about',
        active: activeHeadings.value.includes('about') && !activeHeadings.value.includes('projects')
    },
    { 
        label: 'Projets',
        to: '#projects',
        active: activeHeadings.value.includes('projects')
    },
    { 
        label: 'Contactez-moi',
        to: '#contact',
        active: activeHeadings.value.includes('contact') && !activeHeadings.value.includes('projects')
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

<style scoped>

</style>