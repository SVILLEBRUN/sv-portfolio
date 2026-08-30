export default defineAppConfig({
    ui: {
        colors: {
            primary: 'indigo',
            secondary: 'purple',
        },
        header: {
            slots: {
                root: 'dark:bg-default/3 bg-white/80 backdrop-blur-md border-b border-default h-(--ui-header-height) fixed top-0 w-full z-50 transition-colors duration-500 ease-in-out'
            }
        },
        footer: {
            slots: {
                root: 'dark:bg-black/70 bg-white/80 border-t border-default h-(--ui-footer-height)'
            }
        }
    }
})