<template>
    <span class="weather__title">
        {{ title }}
    </span>
    <span class="weather__value">
        {{ value }}{{ unit }}
    </span>
</template>

<script setup lang="ts">
    const props = defineProps({
        title: {
            type: String,
            required: true
        },

        value: {
            type: [String, Number],
            required: true
        },

        unit: {
            type: String,
            default: ''
        },
    })
</script>