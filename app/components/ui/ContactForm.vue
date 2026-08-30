<template>
    <UCard class="rounded-3xl p-3">
        <UForm :schema="schema" :state="state" class="space-y-8" @submit="onSubmit">
            <UAlert
                v-if="hasDraftToRestore"
                color="success"
                variant="subtle"
                icon="i-lucide-file-text"
                :ui="{
                    icon: 'size-4 sm:size-8',
                }"
                close
                @update:open="dismissDraft"
                class="items-center gap-4 sm:gap-8"
            >   
                <template #title>
                    <div class="flex items-center justify-between gap-2 sm:gap-4">
                        <div class="hidden sm:block">{{ text_content.draft.label }}</div>
                        <div class="block sm:hidden">{{ text_content.draft.short_label }}</div>
                        <UButton size="sm" color="success" variant="soft" @click="restoreDraft">
                            {{ text_content.draft.restore }}
                        </UButton> 
                    </div>
                </template>
            </UAlert>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UFormField :label="text_content.fullname.label" name="fullname" class="text-base">
                    <template #label>
                        <div class="flex items-center gap-2 mb-1">
                            <UIcon name="i-lucide-user" class="size-5" />
                            <span>{{ text_content.fullname.label }}</span>
                        </div>
                    </template>
                    <UInput 
                        v-model="state.fullname" 
                        :placeholder="text_content.fullname.placeholder" 
                        class="w-full"
                        size="xl"
                        :ui="{ base: 'py-3' }"
                    />
                </UFormField>

                <UFormField :label="text_content.email.label" name="email" class="text-base">
                    <template #label>
                        <div class="flex items-center gap-2 mb-1">
                            <UIcon name="i-lucide-mail" class="size-5" />
                            <span>{{ text_content.email.label }}</span>
                        </div>
                    </template>
                    <UInput
                        v-model="state.email" 
                        type="email" 
                        :placeholder="text_content.email.placeholder" 
                        class="w-full"
                        size="xl"
                        trailing-icon="i-lucide-at-sign"
                        :ui="{ base: 'py-3' }"
                    />
                </UFormField>
            </div>

            <UFormField :label="text_content.subject.label" name="subject" class="text-base">
                <template #label>
                    <div class="flex items-center gap-2 mb-1">
                        <UIcon name="i-lucide-pencil-line" class="size-5" />
                        <span>{{ text_content.subject.label }}</span>
                    </div>
                </template>
                <UInput 
                    v-model="state.subject" 
                    :placeholder="text_content.subject.placeholder" 
                    class="w-full"
                    size="xl"
                    :ui="{ base: 'py-3' }"
                />
            </UFormField>

            <UFormField :label="text_content.message.label" name="message" class="text-base">
                <template #label>
                    <div class="flex items-center gap-2 mb-1">
                        <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="size-5" />
                        <span>{{ text_content.message.label }}</span>
                    </div>
                </template>
                <UTextarea 
                    v-model="state.message" 
                    :placeholder="text_content.message.placeholder"
                    :rows="5"
                    class="w-full"
                    size="xl"
                    :ui="{ base: 'py-3' }"
                />
            </UFormField>

            <UButton 
                type="submit" 
                block
                size="xl"
                color="primary"
                icon="i-heroicons-paper-airplane"
                :loading="isSubmitting"
                class="rounded-full py-3 cursor-pointer"
            >
                {{ text_content.submit.label }}
            </UButton>

        </UForm>
    </UCard>
</template>

<script setup lang="ts">
import type { ContactForm } from '@@/content.config'
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'


const props = defineProps<{
    text_content: ContactForm
}>()

const state = reactive({
    fullname: '',
    email: '',
    subject: '',
    message: ''
})

// Draft management
const hasDraftToRestore = ref(false)
const savedDraft = ref<{ subject?: string; message?: string } | null>(null)

onMounted(() => {
    const rawData = localStorage.getItem('contact_form_draft')
    if (!rawData) return

    try {
        const parsed = JSON.parse(rawData)

        // 1. Always restore fullname and email
        if (parsed.fullname) state.fullname = parsed.fullname
        if (parsed.email) state.email = parsed.email

        // 2. Restore draft if subject or message is present
        if (parsed.subject || parsed.message) {
            savedDraft.value = {
                subject: parsed.subject || '',
                message: parsed.message || ''
            }
            hasDraftToRestore.value = true
        }
    } catch (e) {
        console.error('Erreur lors de la récupération du brouillon', e)
    }
})

function restoreDraft() {
    if (savedDraft.value) {
        state.subject = savedDraft.value.subject || ''
        state.message = savedDraft.value.message || ''
        hasDraftToRestore.value = false
    }
}

function dismissDraft() {
    hasDraftToRestore.value = false
}

const schema = z.object({
    fullname: z.string().min(1, props.text_content.fullname.alert),
    email: z.string().email(props.text_content.email.alert),
    subject: z.string().min(1, props.text_content.subject.alert),
    message: z.string().min(1, props.text_content.message.alert)
})

type FormSchema = z.output<typeof schema>


const toast = useToast()
const isSubmitting = ref(false)
const mail = useMail()

async function onSubmit(event: FormSubmitEvent<FormSchema>) {
    isSubmitting.value = true
    try {
        const full_message = event.data.message + '\n\n' + 'De : ' + event.data.fullname + ' - ' + event.data.email
        await mail.send({
            from: 'Portfolio App - ' + event.data.fullname + ' <' + event.data.email + '>',
            subject: event.data.subject,
            text: full_message
        })

        toast.add({
            title: props.text_content.submit.success,
            color: 'success',
            icon: 'i-lucide-mail'
        })

        localStorage.setItem('contact_form_draft', JSON.stringify({
            fullname: event.data.fullname,
            email: event.data.email
        }))
        
        Object.assign(state, { subject: '', message: '' })
    } catch (error) {
        localStorage.setItem('contact_form_draft', JSON.stringify(event.data))

        toast.add({
            title: props.text_content.submit.alert,
            color: 'error',
            icon: 'i-lucide-alert-triangle'
        })

    } finally {
        isSubmitting.value = false
    }
}
</script>