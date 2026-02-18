<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useMouseInElement } from '@vueuse/core'
import { useMotion } from '@vueuse/motion'

const target = ref(null)
const tooltip = ref(null)
const isMounted = ref(false)

const { elementX, elementWidth, isOutside } = useMouseInElement(target)

const xRotation = computed(() => isOutside.value ? 0 : (elementX.value - elementWidth.value / 2) / 1.5)
const xTranslate = computed(() => isOutside.value ? 0 : (elementX.value - elementWidth.value / 2))

const { variant } = useMotion(tooltip, {
    initial: { opacity: 0, y: 20, scale: 0.5 },
    enter: {
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { type: 'spring', stiffness: 200, damping: 10, mass: 2 }
    },
    leave: {
        opacity: 0, 
        y: 20, 
        scale: 0.5,
        transition: { duration: 300 }
    }
})

onMounted(() => {
    isMounted.value = true
    variant.value = 'leave'
})

watch(isOutside, (outside) => {
    if (!isMounted.value) return
    variant.value = outside ? 'leave' : 'enter'
})
</script>

<template>
    <div ref="target" class="relative inline-block">
        
        <div
            v-if="isMounted"
            class="absolute z-50 pointer-events-none"
            :style="{
                top: '0',
                left: '50%',
                transform: `translate(calc(-50% + ${xTranslate}px), calc(-100% - 10px)) rotate(${xRotation}deg)`,
                transformOrigin: 'bottom center'
            }"
        >
            <div ref="tooltip">
                <slot name="tooltip" />
            </div>
        </div>

        <slot />
    </div>
</template>