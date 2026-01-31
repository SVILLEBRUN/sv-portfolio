<template>
    <div class="h-screen flex flex-col justify-center items-center text-center px-4 bg-radial-[circle_at_center] dark:from-primary/15 from-primary/10 from-0% dark:to-neutral-950 to-neutral-100/ to-70%">
        <div v-motion-slide-up>
            <div class="font-bold mb-4 tracking-widest uppercase text-sm text-success">{{ page.hero.headline }}</div>
            <div class="text-5xl md:text-7xl font-bold mb-6" v-html="page.hero.title"></div>
            <p class="text-muted max-w-2xl mx-auto mt-4 text-lg mb-8 font-medium">
                {{ page.hero.description }}
            </p>
            <div class="flex space-x-4 justify-center">
                <UButton size="xl" :to="page.hero.button.to" class="font-bold px-8" variant="outline">
                    {{ page.hero.button.label }}
                </UButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{ page: IndexCollectionItem }>()
</script>
