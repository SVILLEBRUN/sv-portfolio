<template>
    <UCard 
        variant="subtle" 
        class="cursor-pointer"
        :class="!detailed ? 'group/card hover:scale-105 transition-transform duration-300 glass-card' : ''"
    >
        <div class="w-full overflow-hidden" :class="detailed ? 'h-70' : 'h-48'">
            <NuxtImg 
                :src="project.image" 
                :alt="project.title" 
                format="webp" 
                class="w-full object-cover"
                :class="!detailed ? 'group-hover/card:scale-120 transition duration-300 h-48' : 'h-70'"
            />
        </div>

        <div class="font-bold text-xl mt-2">{{ project.title }}</div>
        
        <div class="mt-4 text-dimed">{{ project.description }}</div>

        <div class="mt-5">
            <UBadge
                v-for="(stack, stack_index) in project.main_stack"
                :key="stack_index"
                class="mr-2 mb-2"
                variant="subtle"
                size="lg"
            >
                {{ stack }}
            </UBadge>
        </div>

        <div class="md:text-sm text-muted mt-2 whitespace-pre-line" :class="detailed ? '' : 'line-clamp-2'">
            {{ project.detailed_description }}
        </div>

        <div class="flex flex-wrap justify-center gap-2 mt-6">
            <template v-for="(item, item_index) in project.stack" :key="item_index">
                <UTooltip :content="{ side: 'top' }" :text="item.title" :delayDuration="100">
                    <div  class="relative transition-transform duration-300 group/item group-hover/item:scale-100 cursor-pointer">
                        <NuxtImg :src="item.logo" :alt="item.title" format="webp" quality="40" class="bg-white rounded-full border-2 border-white flex items-center justify-center h-8 w-8 md:h-10 md:w-10 object-contain transition duration-300 group-hover/item:scale-110" />
                    </div>
                </UTooltip>
            </template>
        </div>

        <template v-if="detailed">
            <div class="flex font-bold items-center gap-4 mt-6">
                <UIcon name="i-tabler-list-check" class="size-6" />
                <div>{{ project.key_features.title }}</div>
            </div>
            <div class="mt-3 text-toned font-medium text-sm">
                <div v-for="(feature, feature_index) in project.key_features.features" :key="feature_index" class="flex items-center mt-1">
                    <UIcon name="i-tabler-check" class="size-4 text-primary" />
                    <div class="ml-2">{{ feature }}</div>
                </div>
            </div>
        </template>

        <div 
            v-if="project.github_link || project.demo_link"
            class="flex flex-col sm:flex-row gap-6 mt-10 w-full"
        >
            <UButton
                v-if="project.github_link"
                :href="project.github_link"
                target="_blank"
                variant="subtle"
                color="neutral"
                icon="i-tabler-brand-github"
                size="xl"
                class="flex-1 justify-center"
                @click.stop="$emit('close-modal')"
            >
                GitHub
            </UButton>
            <UButton
                v-if="project.demo_link"
                :href="!project.is_current_site ? project.demo_link : '#'"
                :target="project.is_current_site ? '_self' : '_blank'"
                variant="soft"
                color="primary"
                icon="i-lucide-play"
                size="xl"
                class="flex-1 justify-center"
                @click.stop="$emit('close-modal')"
            >
                {{ demo_button_title }}
            </UButton>
        </div>
        <div v-else class="flex flex-col sm:flex-row gap-6 mt-10 w-full">
            <UButton
                disabled
                target="_blank"
                variant="subtle"
                color="neutral"
                icon="i-lucide-lock"
                size="xl"
                class="flex-1 justify-center"
                @click.stop="$emit('close-modal')"
            >
                {{ private_button_title }}
            </UButton>
        </div>

    </UCard>
    <!-- <div>{{ project.main_stack }}</div> -->
</template>

<script setup lang="ts">
import type { ProjectItem } from '@@/content.config'

const props = defineProps<{
    project: ProjectItem,
    demo_button_title: string,
    private_button_title: string,
    detailed?: boolean,
}>()

defineEmits<{
    (e: 'close-modal'): void
}>()

</script>

<style scoped>
.glass-card:hover {
  box-shadow:   color-mix(in srgb, var(--color-primary-500) 30%, transparent) 0 0 0 1px,
                color-mix(in srgb, var(--color-primary-500) 30%, transparent) 0 0 30px;

}
</style>