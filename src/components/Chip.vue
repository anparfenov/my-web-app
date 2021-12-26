<template>
    <div v-if="!link" class="chip">
        {{ text }}
    </div>
    <router-link v-else-if="link && !native" class="chip" :to="link">
        {{ text }}
    </router-link>
    <a v-else :href="link" class="chip">
        {{ text }}
    </a>
</template>

<script>
export default {
    name: "MyChip",
    props: {
        text: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            default: "",
        },
        native: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style scoped>
.chip {
    padding: 0.3rem 0.5rem;
    background: var(--color-text);
    color: var(--color-text-inv);
    border-radius: 0.5rem;
}
</style>

