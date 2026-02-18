<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useMouseInElement } from '@vueuse/core'
import { useMotion, useMotionProperties, useSpring, type PermissiveMotionProperties } from '@vueuse/motion'

const target = ref(null)
const tooltipContainer = ref(null) // L'élément qui suit la souris
const tooltipContent = ref(null)   // L'élément qui gère l'anim d'entrée/sortie
const isMounted = ref(false)

const { elementX, elementWidth, isOutside } = useMouseInElement(target)

// 1. On initialise les propriétés de mouvement pour le conteneur (suivi souris)
const { motionProperties } = useMotionProperties(tooltipContainer, {
    x: 0,
    y: 0,
    rotate: 0,
})

// 2. On applique le ressort (Spring) sur ces propriétés
const { set } = useSpring(motionProperties as PermissiveMotionProperties, {
    stiffness: 200, // Plus c'est bas, plus c'est "organique"
    damping: 10,    // Contrôle le rebond
    mass: 2
})

// 3. Gestion de l'apparition (Scale/Opacity) via useMotion
const { variant } = useMotion(tooltipContent, {
    initial: { opacity: 0, y: 20, scale: 0.5 },
    enter: {
        opacity: 1, 
        y: -3, 
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

watch(elementX, (newX) => {
    if (isOutside.value) return
    const targetX = newX - elementWidth.value / 2

    set({
        x: targetX,
        rotate: targetX / 1.5
    })
})

watch(isOutside, (outside) => {
    if (!isMounted.value) return
    variant.value = outside ? 'leave' : 'enter'
    
    if (outside) {
        set({ x: 0, rotate: 0 })
    }
})

onMounted(() => {
    isMounted.value = true
    variant.value = 'leave'
})
</script>

<template>
    <div ref="target" class="relative inline-block">
        
        <div
            v-if="isMounted"
            ref="tooltipContainer"
            class="absolute left-1/2 bottom-full mb-2 z-50 pointer-events-none -translate-x-1/2"
        >
            <div ref="tooltipContent">
                <slot name="tooltip" />
            </div>
        </div>

        <slot />
    </div>
</template>