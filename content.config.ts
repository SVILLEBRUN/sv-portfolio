import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const createBaseSchema = () => z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty()
})

const createLinkSchema = () => z.object({
    label: z.string().nonempty(),
    to: z.string().nonempty(),
    icon: z.string().optional().editor({ input: 'icon' }),
})

const createButtonSchema = () => z.object({
    label: z.string().nonempty(),
    to: z.string().optional(),
    icon: z.string().optional().editor({ input: 'icon' }),
})

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
                            logo: z.string().optional().editor({ input: 'icon' })
                        }))
                    })),
                }),
                // projects: 
                // contact: 
            })
        })
    }
})