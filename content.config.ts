import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import type { z as zod } from 'zod'

const createBaseSchema = () => z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty()
})

const createLinkSchema = () => z.object({
    label: z.string().optional(),
    to: z.string().nonempty(),
    icon: z.string().optional().editor({ input: 'icon' }),
    tooltip: z.string().optional()
})

const createButtonSchema = () => z.object({
    label: z.string().optional(),
    to: z.string().optional(),
    icon: z.string().optional().editor({ input: 'icon' }),
    tooltip: z.string().optional()
})

export const projectItemSchema = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    detailed_description: z.string().nonempty(),
    key_features: z.object({
        title: z.string().nonempty(),
        features: z.array(z.string().nonempty())
    }),
    github_button: createButtonSchema().optional(),
    demo_button: createButtonSchema().optional(),
    private_button: createButtonSchema().optional(),
    is_current_site: z.boolean().optional(),
    image: z.string().nonempty(),
    main_stack: z.array(z.string().nonempty()),
    stack: z.array(z.object({
        title: z.string().nonempty(),
        logo: z.string().nonempty()
    }))
})

export type ProjectItem = zod.infer<typeof projectItemSchema>

export const contactFormSchema = z.object({
    fullname: z.object({
        label: z.string().nonempty(),
        placeholder: z.string().nonempty(),
        alert: z.string().nonempty()
    }),
    email: z.object({
        label: z.string().nonempty(),
        placeholder: z.string().nonempty(),
        alert: z.string().nonempty()
    }),
    subject: z.object({
        label: z.string().nonempty(),
        placeholder: z.string().nonempty(),
        alert: z.string().nonempty()
    }),
    message: z.object({
        label: z.string().nonempty(),
        placeholder: z.string().nonempty(),
        alert: z.string().nonempty()
    }),
    submit: z.object({
        label: z.string().nonempty(),
        alert: z.string().nonempty(),
        success: z.string().nonempty()
    })
})

export type ContactForm = zod.infer<typeof contactFormSchema>

export default defineContentConfig({
    collections: {
        header: defineCollection({
            type: 'page',
            source: '**/header.yml',
            schema: z.object({
                links: z.array(createLinkSchema())
            })
        }),
        index: defineCollection({
            type: 'page',
            source: '**/index.yml',
            schema: z.object({
                seo: z.object({
                    title: z.string().nonempty(),
                    description: z.string().nonempty()
                }),
                hero: z.object({
                    headline: z.string().nonempty(),
                    title: z.string().nonempty(),
                    description: z.string().nonempty(),
                    button: createButtonSchema()
                }),
                about: z.object({
                    title: z.string().nonempty(),
                    skills: z.array(z.object({
                        title: z.string().nonempty(),
                        image: z.string().nonempty(),
                        items: z.array(z.object({
                            title: z.string().nonempty(),
                            description: z.string().nonempty(),
                            logo: z.string().nonempty()
                        }))
                    })),
                    stack: z.object({
                        title: z.string().nonempty(),
                        items: z.array(z.string()).min(1)
                    }),
                    copy_email: z.object({
                        title: z.string().nonempty(),
                        button_default: z.string().nonempty(),
                        button_success: z.string().nonempty(),
                    }),
                    tools: z.object({
                        title: z.string().nonempty(),
                        items: z.array(z.object({
                            title: z.string().nonempty(),
                            logo: z.string().nonempty()
                        }))
                    })
                }),
                projects: z.object({
                    title: z.string().nonempty(),
                    modal_title: z.string().nonempty(),
                    items: z.array(projectItemSchema)
                }),
                contact: z.object({
                    title: z.string().nonempty(),
                    subtitle: z.string().nonempty(),
                    description: z.string().nonempty(),
                    email_button: createButtonSchema(),
                    linkedin_button: createButtonSchema(),
                    github_button: createButtonSchema(),
                    form: contactFormSchema
                })
            })
        }),
        about_me: defineCollection({
            type: 'page',
            source: '**/about_me.md',
            schema: z.object({
                title: z.string().nonempty(),
            })
        }),
        footer: defineCollection({
            type: 'page',
            source: '**/footer.yml',
            schema: z.object({
                description: z.string().nonempty(),
                social_media_links: z.array(createLinkSchema()),
                nav_links_title: z.string().nonempty(),
                nav_links: z.array(createLinkSchema()),
                skills_title: z.string().nonempty(),
                skills: z.array(z.string()).min(1),
                contact: z.object({
                    title: z.string().nonempty(),
                    adress: z.string().nonempty(),
                    email: z.string().nonempty()
                }),
                copyright: z.string().nonempty()
            })
        })
    }
})