<template>
    <nav class="navigation">
        <ul class="routes">
            <li
                v-for="route in simpleRoutes"
                :key="route.name"
                class="routes__route"
                @click.stop="handleClick"
            >
                <custom-link type="big" :to="route.path">
                    {{ t(route.name) }}
                </custom-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { useRoute, RouteRecord } from "vue-router";
import { useI18n } from "vue-i18n";
import CustomLink from "@/components/CustomLink.vue";

export default defineComponent({
    name: "MyNavigation",
    components: {
        CustomLink,
    },
    emits: ["goto"],
    props: {
        routes: {
            type: Array as PropType<Array<RouteRecord>>,
            default: () => [],
        },
    },
    setup(props, { emit }) {
        const route = useRoute();
        const i18n = useI18n();

        function handleClick() {
            emit("goto");
        }
        function isCurrentRoute(path: string) {
            return route.path === path;
        }
        const simpleRoutes = computed(() =>
            props.routes.filter(
                (route: RouteRecord) =>
                    route.path.search(/\/:/) === -1 &&
                    route.path !== "/" &&
                    route.path !== "/root"
            )
        );

        return {
            handleClick,
            isCurrentRoute,
            simpleRoutes,
            ...i18n,
        };
    },
});
</script>

<style lang="postcss" scoped>
.navigation {
    height: auto;
}
.routes {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-flow: row wrap;
}
.routes__route:not(:first-of-type) {
    margin-left: 1rem;
}
</style>
