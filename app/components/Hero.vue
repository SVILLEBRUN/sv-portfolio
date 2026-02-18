<template>
    <div class="h-screen flex flex-col justify-center items-center text-center px-4 bg-radial-[circle_at_center] dark:from-primary/15 from-primary/10 from-0% dark:to-neutral-950 to-neutral-100/ to-70%">
        <Transition name="hero" appear>
            <div>
                <div class="font-bold mb-4 sm:mb-6 md:mb-8 tracking-widest uppercase md:text-sm text-xs text-success">{{ page.hero.headline }}</div>
                <div class="text-5xl md:text-7xl font-bold mb-8 sm:mb-10 md:mb-14" v-html="page.hero.title"></div>
                <p class="text-muted max-w-3xl mx-auto md:text-lg text-sm mb-10 sm:mb-12 md:mb-16 lg:mb-20 font-medium">
                    {{ page.hero.description }}
                </p>
                <div class="flex space-x-4 justify-center">
                    <UButton size="xl" :to="page.hero.button.to" class="font-bold px-8" variant="outline">
                        {{ page.hero.button.label }}
                    </UButton>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{ page: IndexCollectionItem }>()
</script>

<style scoped>
.hero-enter-from {
    opacity: 0;
    transform: translateY(100px);
}

.hero-enter-active {
    transition: opacity 1.2s ease-out, transform 1.2s ease-out;
}

.hero-enter-to {
    opacity: 1;
    transform: translateY(0);
}
</style>