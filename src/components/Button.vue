<template>
    <button ref="button" v-bind="$attrs" class="button" @click="click">
        <slot />
    </button>
</template>

<script>
import { ref } from "vue";

export default {
    name: "MyButton",
    emits: ["click"],
    setup(_, { emit }) {
        const button = ref(null);
        function click(e) {
            emit("click", e);
        }
        return { click, button };
    },
};
</script>

<style lang="postcss" scoped>
.button {
    font-size: var(--text-lg);
    color: var(--color-text);
    position: relative;
    background: linear-gradient(0deg, var(--color-text) 50%, transparent 0);
    background-position: 0 0;
    background-size: 100% 200%;
    text-transform: uppercase;
    font-family: var(--monospace);
    padding: 0.2rem;
    transition: color 0.16s linear, background 0.26s ease, transform 0.26s ease;

    &:visited {
        color: var(--color-text);
    }

    &:hover {
        background-position: 0 100%;
        color: var(--color-text-inv);
    }

    &:after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
    }
}
</style>
