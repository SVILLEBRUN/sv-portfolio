import nodemailer from 'nodemailer'
import { createHash } from 'crypto'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const config = useRuntimeConfig()

    if (!config.mailUser || !config.mailPass || !config.mailTarget) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Unable to send message.',
        })
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.mailUser,
            pass: config.mailPass,
        },
    })

    try {
        if (!body.from || !body.subject || !body.text || !body.replyTo) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing required fields.',
            })
        }

        await transporter.sendMail({
            from: body.from,
            replyTo: body.replyTo,
            to: config.mailTarget,
            subject: body.subject,
            text: body.text,
        })

        const emailHash = createHash('sha256').update(body.replyTo).digest('hex').substring(0, 10)
        console.info(`[API/Contact] Email from ${emailHash} sent successfully !`)

        return { success: true }
    } catch (error) {
        console.error('[API/Contact] Failed to send email via Nodemailer:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Unable to send message.',
        })
    }
})