<template>
    <router-link v-if="!external" :class="klass" v-bind="$attrs">
        <slot />
    </router-link>
    <a v-else :class="klass" :href="$attrs.to" v-bind="$attrs">
        <slot />
    </a>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from "vue";

export default defineComponent({
    name: "CustomLink",
    props: {
        type: {
            type: String as PropType<LINK.LinkStyle>,
            default: 'text'
        },
        external: {
            type: Boolean as PropType<boolean>,
            default: false,
        }
    },
    setup(props) {
        let klass = ref(`${props.type}-link`);

        return { klass }
    }
});
</script>

<style lang="postcss" scoped>
.text-link {
    color: var(--color-text);
    text-decoration: underline;
    &:visited {
        color: inherit;
    }
    &:hover {
        color: var(--color-extra);
    }
}

.big-link {
    font-size: var(--text-base);
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

.big-link.router-link-exact-active,
.big-link.router-link-active {
    color: var(--color-text-inv);
    position: relative;
    background: var(--color-text);
    background-position: 0 0;
    background-size: 100% 200%;
    text-transform: uppercase;
    font-family: var(--monospace);
    padding: 0.2rem;
    transition: color 0.16s linear, background 0.26s ease, transform 0.26s ease;

    &:visited {
        color: var(--color-text-inv);
    }
}

.underline-link {
    color: var(--color-extra);
    position: relative;
    &:visited {
        color: var(--color-extra);
    }
    &:after {
        content: "";
        position: absolute;
        left: 0;
        display: inline-block;
        height: 1em;
        width: 100%;
        border-bottom: 1px solid;
        margin-top: 10px;
        opacity: 0;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
        -webkit-transform: scale(0, 1);
        transform: scale(0, 1);
    }
    &:hover {
        &:after {
            opacity: 1;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
}
</style>
