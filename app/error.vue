<template>
    <div>
        <AppHeader />
            <UMain>
                <UContainer>
                    <UPage>
                        <UError :error="displayError" />
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
    404: { statusMessage: 'Not Found', message: 'The page you are looking for does not exist.' },
    500: { statusMessage: 'Server Error', message: 'The server is experiencing a temporary issue, please try again later.' },
    503: { statusMessage: 'Service Unavailable', message: 'The site is currently under maintenance, please try again later.' }
}

const displayError = computed(() => {
    const config = ERROR_MAP[props.error.statusCode as number] || DEFAULT_ERROR
    return {
        statusCode: props.error.statusCode,
        ...config
    }
})

useSeoMeta({
    title: () => `${displayError.value.statusCode} - ${displayError.value.statusMessage}`,
    description: () => displayError.value.message
})
</script>