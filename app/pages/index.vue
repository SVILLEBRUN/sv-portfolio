<template>
    <template v-if="page && about_me">
        <Hero :page />

        <div class="container border-x border-default" id="about">
            <div class="text-3xl md:text-5xl font-bold mt-12 md:mt-30 text-center">{{ page.about.title }}</div>
            <!-- About.skills -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                <div v-for="(skill, skill_index) in page.about.skills" 
                    :key="skill_index" 
                    class="relative  group rounded-4xl p-px hover:z-50"
                >
                    <div :id="'skill_'+skill_index" class="absolute inset-0 z-0 overflow-hidden rounded-4xl">
                        <div class="moving-dot rounded-4xl absolute h-20 w-20 opacity-80 bg-[radial-gradient(var(--ui-primary)_40%,transparent_60%)] z-0"></div>
                    </div>

                    <div class="relative flex z-10 h-full w-full items-center rounded-4xl border border-default p-2 bg-default">
                        <NuxtImg :src="skill.image" :alt="skill.title" height="80" format="webp" quality="80" class="hidden lg:block"/>
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
            <div class="mt-20 md:mt-30 grid grid-cols-1 md:grid-cols-5 gap-4">
                <div class="md:col-span-3 border border-default rounded-2xl py-4 px-8 md:py-10 md:px-16 text-sm/6">
                    <ContentRenderer :value="about_me" class="text-sm" :prose="true" />
                </div>
                <div class="md:col-span-2 flex flex-col h-full gap-4">
                    <div class="flex-1 border border-default rounded-2xl py-4 px-4 md:py-10 md:px-8">
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
                    <div class="flex-1 border border-default rounded-2xl py-4 px-4 md:py-10 md:px-8">
                        <div class="md:text-2xl text-xl font-bold">{{ page.about.copy_email.title }}</div>
                        <div class="flex items-center justify-center h-full">
                            <EmailButton 
                                :email="'sebastien.villebrun@gmail.com'" 
                                :default-text="page.about.copy_email.button_default"
                                :success-text="page.about.copy_email.button_success"
                           />
                        </div>
                    </div>
                </div>
            </div>

            <!-- about.tools -->
            <div>
                <div class="md:text-2xl text-xl font-bold mb-12 mt-12 md:mt-30 text-center">{{ page.about.tools.title }}</div>
                <UCarousel 
                    ref="carouselRef"
                    @mouseleave="restartCarousel"
                    v-slot="{ item }" 
                    :items="page.about.tools.items"
                    loop 
                    :auto-scroll="{ speed: -1 }"
                    wheel-gestures
                    :ui="{ item: 'basis-auto' }"
                    class="mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
                >
                    <div class="flex items-center justify-center px-4 py-2 w-fit">
                        <NuxtImg :src="item.logo" :alt="item.title" format="webp" quality="40" class="h-10 md:h14"/>
                        <div class="ml-2 font-bold text-sm md:text-base">{{ item.title }}</div>
                    </div>
                </UCarousel>
            </div>

            <!-- about.projects -->
        </div>
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

const { data: about_me } = await useAsyncData('about_me-' + locale.value, async () => {
    let content = await queryCollection('about_me')
        .path(`/${locale.value}/about_me`)
        .first()
    if (!content && locale.value !== defaultLocale ) {
        content = await queryCollection('about_me')
            .path(`/${defaultLocale}/about_me`)
            .first()
    }
    return content
})

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