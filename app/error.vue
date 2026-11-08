<template>
    <div>
        <AppHeader />
            <UMain>
                <UContainer>
                    <UPage>
                        <UError :error="displayError" :clear="{ label: errorContent?.back_home ?? 'Back to home' }" />
                    </UPage>
                </UContainer>
            </UMain>
        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: {
        type: Object as PropType<NuxtError>,
        required: true
    }
})

const DEFAULT_ERROR = {
    statusMessage: 'Error',
    message: 'An unexpected error occurred, please try again later.'
}

const ERROR_MAP: Record<number, typeof DEFAULT_ERROR> = {
    403: { statusMessage: 'Forbidden', message: 'You do not have the necessary permissions.' },
    404: { statusMessage: 'Page Not Found', message: 'The page you are looking for does not exist.' },
    500: { statusMessage: 'Server Error', message: 'The server is experiencing a temporary issue, please try again later.' },
    503: { statusMessage: 'Service Unavailable', message: 'The site is currently under maintenance, please try again later.' }
}

const { locale, defaultLocale } = useI18n()

// The error page must never crash itself: any content failure falls back to the English texts above
const { data: errorContent } = await useAsyncData(
    () => `error-${locale.value}`,
    async () => {
        try {
            let content = await queryCollection('error')
                .path(`/${locale.value}/error`)
                .first()
            if (!content && locale.value !== defaultLocale) {
                content = await queryCollection('error')
                    .path(`/${defaultLocale}/error`)
                    .first()
            }
            return content
        } catch (e) {
            console.error('Failed to load the error page content', e)
            return null
        }
    },
    { watch: [locale] }
)

const displayError = computed(() => {
    const fromCode = errorContent.value?.codes.find(item => item.code === props.error.statusCode)
    const config = fromCode ?? errorContent.value?.default
    return {
        statusCode: props.error.statusCode,
        ...(config
            ? { statusMessage: config.status_message, message: config.message }
            : ERROR_MAP[props.error.statusCode as number] || DEFAULT_ERROR)
    }
})

useSeoMeta({
    title: () => `${displayError.value.statusCode} - ${displayError.value.statusMessage}`,
    description: () => displayError.value.message
})
</script>