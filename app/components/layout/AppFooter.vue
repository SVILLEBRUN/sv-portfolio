<template>
    <UFooter>
        <div class="pt-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 tracking-wide pb-8">
                <div>
                    <div class="text-xl font-bold">Sébastien VILLEBRUN</div>
                    <div class="text-muted text-sm">{{ footer?.description }}</div>
                    <div class="flex gap-1">
                        <template v-for="(link, item_index) in footer?.social_media_links" :key="item_index">
                            <UButton 
                                :icon="link.icon" 
                                :to="link.to" 
                                target="_blank" 
                                variant="link" 
                                color="neutral" 
                                class="hover:text-primary" 
                                size="xl"
                            />
                        </template>
                    </div>
                </div>
    
                <div>
                    <div class="text-lg font-bold">{{ footer?.nav_links_title }}</div>
                    <div v-for="(nav_link, nav_link_index) in footer?.nav_links" :key="nav_link_index">
                        <UButton
                            :to="nav_link.to"
                            variant="link"
                            color="neutral"
                            class="hover:text-primary"
                        >
                            {{ nav_link.label }}
                        </UButton>
                    </div>
                </div>
        
                <div>
                    <div class="text-lg font-bold">{{ footer?.skills_title }}</div>
    
                    <div class="text-sm text-muted font-medium">
                        <div v-for="(skill, skillIndex) in footer?.skills" :key="skillIndex" class="py-1">{{ skill }}</div>
                    </div>
                </div>
    
                <div>
                    <div class="text-lg font-bold">{{ footer?.contact.title }}</div>
    
                    <div class="text-sm text-muted font-medium">
                        <a :href="'mailto:' + footer?.contact.email" class="hover:text-primary py-1">{{ footer?.contact.email }}</a>
                        <div class="py-1">{{ footer?.contact.adress }}</div>
                    </div>
                </div>
            </div>

            <div class="border-t border-default py-8 text-toned text-sm text-center">
                {{ footer?.copyright }}
            </div>
        </div>
    </UFooter>
</template>

<script setup lang="ts">
const { locale, defaultLocale } = useI18n()
const { data: footer } = await useAsyncData('footer-' + locale.value, async () => {
    let content = await queryCollection('footer')
        .path(`/${locale.value}/footer`)
        .first()
    if (!content && locale.value !== defaultLocale ) {
        content = await queryCollection('footer')
            .path('/fr/footer')
            .first()
    }
    return content
})

console.log(footer.value)

if(!footer.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>