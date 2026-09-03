<template>
    <template v-if="page && about_me">
        <Hero :page />

        <div class="container border-x border-default">
            <div class="pt-22 md:pt-32" id="about">
                <div class="text-3xl md:text-5xl font-bold text-center">{{ page.about.title }}</div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                    <div v-for="(skill, skill_index) in page.about.skills" 
                        :key="skill_index" 
                        class="relative  group rounded-4xl p-px hover:z-20"
                    >
                        <div :id="'skill_'+skill_index" class="absolute inset-0 z-0 overflow-hidden rounded-4xl">
                            <div class="moving-dot rounded-4xl absolute h-20 w-20 opacity-80 bg-[radial-gradient(var(--ui-primary)_40%,transparent_60%)] z-0"></div>
                        </div>
    
                        <div class="relative flex z-10 h-full w-full items-center rounded-4xl border border-default p-2 bg-default">
                            <NuxtImg :src="skill.image" :alt="skill.title" height="80" format="webp" quality="80" class="hidden lg:block py-2"/>
                            <div class="ml-2 text-center w-full h-full">
                                <div class="text-lg font-bold mb-2">{{ skill.title }}</div>
                                <div class="flex flex-wrap justify-center gap-2">
                                    <template v-for="(item, item_index) in skill.items" :key="item_index">
                                        <AnimatedTooltip class="group/item">
                                            <template #tooltip>
                                                <div class="px-4 py-2 bg-white dark:bg-black rounded-md text-nowrap text-center relative">
                                                    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-0 pointer-events-none">
                                                        <div
                                                            class="absolute w-[60%] -bottom-px left-1/2 -translate-x-1/2 h-px rounded-full"
                                                            style="background: linear-gradient(to right, transparent, var(--ui-secondary), var(--ui-primary), var(--ui-secondary), transparent);"
                                                        ></div>
                                                    </div>
                                                    <div class="font-bold text-sm">{{ item.title }}</div>
                                                    <div class="text-xs">{{ item.description }}</div>
                                                </div>
                                            </template>
                                            <div  class="relative cursor-pointer transition-transform duration-300 group-hover/item:scale-100">
                                                <NuxtImg :src="item.logo" :alt="item.title" format="webp" quality="40" class="bg-white rounded-full border-2 border-white flex items-center justify-center h-10 w-10 md:h-12 md:w-12 object-contain transition duration-300 group-hover/item:scale-110" />
                                            </div>
                                        </AnimatedTooltip>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <!-- About_me -->
                <div class="mt-12 md:mt-22 grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div class="md:col-span-3 border border-default rounded-2xl py-4 px-8 lg:py-10 lg:px-16 text-sm/6">
                        <ContentRenderer :value="about_me" class="text-sm" :prose="true" />
                    </div>
                    <div class="md:col-span-2 flex flex-col h-full gap-4">
                        <div class="flex-1 border border-default rounded-2xl py-4 px-4 lg:py-10 lg:px-8">
                            <div class="md:text-2xl text-xl font-bold mb-4">{{ page.about.stack.title }}</div>
                            <div class="flex flex-wrap gap-4">
                                <UButton 
                                    v-for="(item, tech_index) of page.about.stack.items"
                                    :key="tech_index"
                                    variant="soft"
                                    color="primary"
                                    class="px-8 py-4 cursor-default"
                                >
                                    {{ item }}
                                </UButton>
                            </div>
    
                        </div>
                        <div class="flex-1 flex flex-col border border-default rounded-2xl py-4 px-4 lg:py-10 lg:px-8">
                            <div class="md:text-2xl text-xl font-bold mb-2">{{ page.about.copy_email.title }}</div>
                            <div class="text-toned mb-2 text-sm lg:text-base"><span class="font-bold">Email : </span><a href="mailto:contact@sebastien-villebrun.com" class="hover:text-primary">contact@sebastien-villebrun.com</a></div>
                            <div class="flex items-center justify-center h-full">
                                <EmailButton 
                                    :email="'contact@sebastien-villebrun.com'" 
                                    :default-text="page.about.copy_email.button_default"
                                    :success-text="page.about.copy_email.button_success"
                               />
                            </div>
                        </div>
                    </div>
                </div>
    
                <!-- about.tools -->
                <div class="mt-12 md:mt-22">
                    <div class="md:text-2xl text-xl font-bold mb-12 text-center">{{ page.about.tools.title }}</div>
                    <UCarousel 
                        ref="carouselRef"
                        @mouseleave="restartCarousel"
                        v-slot="{ item }" 
                        :items="page.about.tools.items"
                        loop 
                        :auto-scroll="{ speed: -2 }"
                        wheel-gestures
                        :ui="{ item: 'basis-auto' }"
                        class="mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
                    >
                        <div class="flex items-center justify-center px-4 py-2 w-fit">
                            <NuxtImg :src="item.logo" :alt="item.title" format="webp" quality="40" class="h-10 md:h-12"/>
                            <div class="ml-2 font-bold text-sm md:text-base">{{ item.title }}</div>
                        </div>
                    </UCarousel>
                </div>
            </div>

            <!-- page.projects -->
            <div class="pt-22 md:pt-32" id="projects">
                <div class="text-3xl md:text-5xl font-bold text-center">{{ page.projects.title }}</div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    <template v-for="(project, project_index) in page.projects.items" :key="project_index">
                        <UModal
                            :open="openProjectIndex === project_index"
                            @update:open="(val) => openProjectIndex = val ? project_index : null"
                            :ui="{ 
                                content: 'sm:max-w-2xl md:max-w-3xl w-full p-0 sm:rounded-xl ',
                            }"
                            class="relative"
                        >
                                <ProjectCard 
                                    @click="openProjectIndex = project_index"
                                    :project="project" 
                                />

                                <template #content>
                                    <div class="max-h-[95vh] overflow-y-auto">
                                        <UButton
                                            icon="i-lucide-x"
                                            color="neutral"
                                            variant="ghost"
                                            size="sm"
                                            class="absolute top-3 right-3 z-10 rounded-full bg-background/50 backdrop-blur-md"
                                            @click="openProjectIndex = null"
                                        />
                                        <ProjectCard 
                                            :project="project" 
                                            :detailed="true" 
                                            @close-modal="project.is_current_site ? openProjectIndex = null : ''"
                                        />
                                    </div>
                                </template>
                            </UModal>
                    </template>
                </div>
            </div>


            <!-- page.contact -->
            <div class="pt-12 md:pt-22 pb-8 md:pb-18 mt-4" id="contact">
                <div class="text-center">
                    <UButton 
                        icon="i-lucide-mail" 
                        variant="subtle"
                        :ui="{ base: 'text-sm sm:text-base md:text-lg px-5 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3' }"
                        class="mb-6 md:mb:8 rounded-full cursor-pointer"
                        to="mailto:contact@sebastien-villebrun.com"
                    >
                        {{ page.contact.subtitle }}
                    </UButton>
                    
                    <div class="text-4xl md:text-6xl font-semibold mb-2 sm:mb-4 md:mb-6" v-html="page.contact.title"></div>
                    
                    <div class="text-muted max-w-3xl mx-auto md:text-lg text-sm mb-10 sm:mb-12 md:mb-16 lg:mb-20 tracking-wide">{{ page.contact.description }}</div>
                    <div class="max-w-4xl mx-auto">
                        <ContactForm :text_content="page.contact.form" />

                        <div class="grid grid-cols-1 lg:grid-cols-3 mt-12 gap-6">
                            <a 
                                class="border-default border rounded-3xl p-4 hover:scale-105 transition-transform duration-300 glass-card cursor-pointer"
                                :href="page.contact.email_button.to"
                                target="_blank"
                            >
                                <UButton 
                                    size="xl" 
                                    :icon="page.contact.email_button.icon" 
                                    variant="soft" 
                                    class="pointer-events-none rounded-full p-4"
                                    color="secondary"
                                />
                                <div class="font-bold mt-2">{{ page.contact.email_button.label }}</div>
                                <div class="text-muted text-sm mt-2">{{ page.contact.email_button.tooltip }}</div>
                            </a>

                            <a 
                                class="border-default border rounded-3xl p-4 hover:scale-105 transition-transform duration-300 glass-card cursor-pointer"
                                :href="page.contact.linkedin_button.to"
                                target="_blank"
                            >
                                <UButton 
                                    size="xl" 
                                    :icon="page.contact.linkedin_button.icon" 
                                    variant="soft" 
                                    class="pointer-events-none rounded-full p-4"
                                    color="info"
                                />
                                <div class="font-bold mt-2">{{ page.contact.linkedin_button.label }}</div>
                                <div class="text-muted text-sm mt-2">{{ page.contact.linkedin_button.tooltip }}</div>
                            </a>

                            <a 
                                class="border-default border rounded-3xl p-4 hover:scale-105 transition-transform duration-300 glass-card cursor-pointer"
                                :href="page.contact.github_button.to"
                                target="_blank"
                            >
                                <UButton 
                                    size="xl" 
                                    :icon="page.contact.github_button.icon" 
                                    variant="soft" 
                                    class="pointer-events-none rounded-full p-4"
                                    color="neutral"
                                />
                                <div class="font-bold mt-2">{{ page.contact.github_button.label }}</div>
                                <div class="text-muted text-sm mt-2">{{ page.contact.github_button.tooltip }}</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
const { locale, defaultLocale } = useI18n()

const { data: page } = await useAsyncData(
    () => `index-${locale.value}`,
    async () => {
        let content = await queryCollection('index')
            .path(`/${locale.value}`)
            .first()
            
        if (!content && locale.value !== defaultLocale) {
            content = await queryCollection('index')
                .path(`/${defaultLocale}`)
                .first()
        }
        return content
    },
    { watch: [locale] }
)

const { data: about_me } = await useAsyncData(
    () => `about_me-${locale.value}`,
    async () => {
        let content = await queryCollection('about_me')
            .path(`/${locale.value}/about_me`)
            .first()
            
        if (!content && locale.value !== defaultLocale) {
            content = await queryCollection('about_me')
                .path(`/${defaultLocale}/about_me`)
                .first()
        }
        return content
    },
    { watch: [locale] }
)

if(!page?.value || !about_me?.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}


// Carousel
const carouselRef = ref()
const restartCarousel = () => {
    const emblaApi = carouselRef.value?.emblaApi

    if (emblaApi) {
        const plugins = emblaApi.plugins()
        const autoScroll = plugins.autoScroll
        const isRunning = autoScroll.isPlaying()
        
        if (autoScroll && !isRunning) {
            autoScroll.play()
        }
    }
}

// Project Modal
const openProjectIndex = ref<number | null>(null)

</script>

<style scoped>
@keyframes move-border {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}

#skill_0 {
    --speed: 17s;
}

#skill_1 {
    --speed: 15s;
}

#skill_2 {
    --speed: 16s;
}

.moving-dot {
  offset-path: rect(0% 100% 100% 0% round 1.75rem);
  animation: move-border var(--speed) linear infinite;
}
</style>