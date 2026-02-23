<template>
    <div class="relative w-full">
        <button @click="copyEmail" class="relative inline-flex h-12 w-full  overflow-hidden rounded-lg p-px focus:outline-none z-10">
            <span class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--ui-secondary)_0%,var(--ui-primary)_50%,var(--ui-secondary)_100%)]">
    
            </span>
            <span class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg px-7 text-sm font-medium text-default backdrop-blur-3xl gap-2 bg-default">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <rect width="336" height="336" x="128" y="128" fill="none" stroke-linejoin="round" stroke-width="32" rx="57" ry="57"></rect>
                    <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="m383.5 128 .5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"></path>
                </svg>
                <template v-if="isEmailCopied">
                    <slot name="success">{{ successText }}</slot>
                </template>
                <template v-else>
                    <slot name="default">{{ defaultText }}</slot>
                </template>
            </span>
        </button>
        <DotLottieVue v-if="isEmailCopied" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" style="height: 500px; width: 500px" autoplay loop src="https://lottie.host/2b246bfa-63e9-4c47-8fd4-a624cb7a2120/5ty8nNAPLc.lottie" />
    </div>
</template>

<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const props = defineProps<{
    email: string
    defaultText?: string
    successText?: string
}>()



const isEmailCopied = ref(false)

const copyEmail = async () => {
    try {
        await navigator.clipboard.writeText(props.email)
        isEmailCopied.value = true

        setTimeout(() => {
            isEmailCopied.value = false
        }, 10000)
        
    } catch (error) {
        console.error('Error copying email:', error)
    }
}

</script>