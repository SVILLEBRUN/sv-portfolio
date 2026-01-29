export default defineAppConfig({
    ui: {
        colors: {
            primary: 'indigo',
            secondary: 'purple',
        },
        header: {
            slots: {
                root: 'bg-default/75 backdrop-blur border-b border-default h-(--ui-header-height) fixed top-0 w-full z-50 transition-colors duration-500 ease-in-out'
            }
        }
    }
})