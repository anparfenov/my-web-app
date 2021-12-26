<template>
    <router-link class="big-link" v-bind="$attrs">
        <slot />
    </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "BigLink",
});
</script>

<style lang="postcss" scoped>
</style>
