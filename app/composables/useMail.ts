export function useMail() {
    return {
        async send(payload: { from: string; replyTo: string; subject: string; text: string }) {
            return await $fetch('/api/contact', {
                method: 'POST',
                body: payload,
            })
        }
    }
}