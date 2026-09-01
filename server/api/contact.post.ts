import nodemailer from 'nodemailer'

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

        console.log('Sending email with the following details:', {
            from: body.from,
            replyTo: body.replyTo,
            to: config.mailTarget,
            subject: body.subject,
            text: body.text,
        })

        await transporter.sendMail({
            from: body.from,
            replyTo: body.replyTo,
            to: config.mailTarget,
            subject: body.subject,
            text: body.text,
        })

        return { success: true }
    } catch (error) {
        console.error('SMTP sending error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Unable to send message.',
        })
    }
})