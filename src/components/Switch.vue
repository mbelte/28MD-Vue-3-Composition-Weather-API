<template>
    <div class="switch-wrap">
        <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
        </label>
        {{ title }}
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        title: {
            type: String,
            required: true
        }
    })

</script>