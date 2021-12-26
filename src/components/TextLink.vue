<template>
    <router-link v-if="!external" class="text-link" v-bind="$attrs">
        <slot />
    </router-link>
    <a v-else class="text-link" :href="$attrs.to" v-bind="$attrs">
        <slot />
    </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "TextLink",
    props: {
        external: {
            type: Boolean,
            default: false
        }
    }
});
</script>

<style lang="postcss" scoped>
.text-link {
    color: var(--color-text);
    &:visited {
        color: inherit;
    }
    &:hover {
        color: var(--color-extra);
    }
 }
</style>
