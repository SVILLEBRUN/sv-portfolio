<template>
    <div class="h-screen flex flex-col justify-center items-center text-center px-4 bg-radial-[circle_at_center] dark:from-primary/15 from-primary/10 from-0% dark:to-neutral-950 to-neutral-100/ to-70%">
        <div v-motion-slide-up>
            <div class="font-bold mb-4 sm:mb-6 md:mb-8 tracking-widest uppercase md:text-sm text-xs text-success">{{ page.hero.headline }}</div>
            <div class="text-5xl md:text-7xl font-bold mb-8 sm:mb-10 md:mb-14" v-html="page.hero.title"></div>
            <p class="text-muted max-w-3xl mx-auto md:text-lg text-sm mb-10 sm:mb-12 md:mb-16 lg:mb-20 font-medium">
                {{ page.hero.description }}
            </p>
            <div class="flex flex-wrap justify-center gap-2 items-center">
                <UButton 
                    v-for="(skill, skill_index) of main_skills"
                    :key="skill_index"
                    disabled
                    variant="outline"
                    color="neutral"
                    class="px-4 py-2"
                >
                    {{ skill }}
                </UButton>
            </div>
            <div class="mt-16 sm:mt-20 md:mt-24">
                <UButton
                    :to="page.hero.button.to"
                    variant="ghost"
                    class="group relative flex flex-col items-center hover:bg-transparent active:bg-transparent transition-all animate-soft-bounce"
                >
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-12 h-12 bg-secondary/40 rounded-full blur-xl animate-pulse group-hover:bg-secondary/60 transition-colors"></div>
                    </div>

                    <div class="relative flex flex-col items-center">
                        <UIcon 
                            size="lg"
                            name="i-lucide-chevron-down" 
                            class="w-12 h-12 sm:w-18 sm:h-18 text-toned group-hover:text-muted transition-colors"
                        />
                    </div>
                </UButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{ page: IndexCollectionItem }>()

const main_skills = [
    'Vue.js/Nuxt.js',
    'Typescript',
    'Node.js',
    'Ruby on Rails',
    'MongoDB',
    'Docker'
]

</script>
