<template>
    <ul class="routes">
        <li v-for="route in routes" :key="route.name" class="routes__route">
            <router-link
                v-if="isCorrectPath(route.path)"
                class="routes__link"
                :to="route.path"
                :data-name="route.name"
            >
                {{ route.name }}
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: "RootRoutesList",
    props: {
        routes: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            items: (new Array(6)).fill(""),
        };
    },
    methods: {
        isCorrectPath(path) {
            return path.search(/\/:/) === -1 &&
                   path !== "/" &&
                   path !== "/root";
        },
    },
};
</script>

<style lang="postcss" scoped>
.routes {
    &__link {
        font-size: var(--text-xl);
        color: var(--color-text);
        position:relative;
        background: linear-gradient(0deg, var(--color-text) 50%,transparent 0);
        background-position: 0 0;
        background-size: 100% 200%;
        text-transform: uppercase;
        font-family: var(--monospace);
        padding: 0.2rem;
        transition: color .16s linear,background .26s ease,transform .26s ease;

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
}
</style>

