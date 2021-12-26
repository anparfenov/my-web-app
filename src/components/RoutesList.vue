<template>
    <ul class="routes">
        <li v-for="route in filteredRoutes" :key="route.name" class="routes__route">
            <span v-if="route.name === 'home'" :data-name="route.name" class="routes__text">
                <div class="names-container">
                    <div class="name-list">
                        <span v-for="(item, index) in items" :key="index" class="name-list__item">
                            {{ route.name }}
                        </span>
                    </div>
                    <span class="main-name">{{ route.name }}</span>
                </div>
                <span class="current-pointer">&nbsp;&#8592; {{ t("youAreHere") }}</span>
            </span>
            <router-link
                v-else
                class="routes__link routes__text"
                :to="route.path"
                :data-name="route.name"
            >
                <div class="names-container">
                    <div class="name-list">
                        <span v-for="(item, index) in items" :key="index" class="name-list__item">
                            {{ route.name }}
                        </span>
                    </div>
                    <span class="main-name">{{ route.name }}</span>
                </div>
                <span class="pointer">&nbsp;&#8592; go</span>
            </router-link>
        </li>
    </ul>
</template>

<script>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

export default {
    name: "RoutesList",
    props: {
        routes: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        function isCorrectRoute(route) {
            if (route.path) {
                return route.path.search(/\/:/) === -1 && route.path !== "/" && route.path !== "/root";
            }
            return true
        }

        const filteredRoutes = computed(() => props.routes.filter(route => isCorrectRoute(route)));

        return { ...useI18n(), filteredRoutes };
    },
    data() {
        return {
            items: (new Array(6)).fill(""),
        };
    },
};
</script>

<style lang="postcss" scoped>
.routes {
    list-style-type: none;
}
.routes__link {
    cursor: pointer;
    color: transparent;
}
.routes__link:visited {
    color: transparent;
}
.pointer {
    color: transparent;
    -webkit-text-stroke: 1px hsla(0, 0%, 30%);
    visibility: hidden;
}
.current-pointer {
    color: var(--color-text);
}
.routes__text {
    position: relative;
    display: inline-block;
    font-size: 3rem;
}
.routes__text:hover .pointer {
    visibility: visible;
}
.routes__root {
    -webkit-text-stroke: 1px hsla(0, 0%, 30%);
    color: transparent;
}
.route__container {
    display: inline-block;
    position: relative;
}
.names-container {
    display: inline-flex;
    position: relative;
}
.name-list {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
}
.name-list__item {
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.5s ease;
}
.main-name {
    visibility: visible;
    -webkit-text-stroke: 1px hsla(0, 0%, 30%);
    font-size: 3rem;
}
.routes__text:hover .name-list {
    visibility: visible;
}
.routes__text:hover .name-list__item:nth-of-type(1) {
    color: hsla(0, 0%, 80%);
    -webkit-text-stroke: 1px hsla(0, 0%, 80%);
}
.routes__text:hover .name-list__item:nth-of-type(2) {
    transform: translate3d(4px, 2px, 0);
    transition-delay: 0.5s;
    color: hsla(0, 0%, 75%);
    -webkit-text-stroke: 1px hsla(0, 0%, 75%);
}
.routes__text:hover .name-list__item:nth-of-type(3) {
    transform: translate3d(6px, 3px, 0);
    transition-delay: 0.4s;
    color: hsla(0, 0%, 70%);
    -webkit-text-stroke: 1px hsla(0, 0%, 70%);
}
.routes__text:hover .name-list__item:nth-of-type(4) {
    transform: translate3d(8px, 4px, 0);
    transition-delay: 0.3s;
    color: hsla(0, 0%, 65%);
    -webkit-text-stroke: 1px hsla(0, 0%, 65%);
}
.routes__text:hover .name-list__item:nth-of-type(5) {
    transform: translate3d(10px, 5px, 0);
    transition-delay: 0.2s;
    color: hsla(0, 0%, 60%);
    -webkit-text-stroke: 1px hsla(0, 0%, 60%);
}
.routes__text:hover .name-list__item:nth-of-type(6) {
    transform: translate3d(12px, 6px, 0);
    transition-delay: 0.1s;
    color: hsla(0, 0%, 30%);
    -webkit-text-stroke: 1px hsla(0, 0%, 30%);
}
.routes__text:hover .name-list__item--main {
    visibility: hidden;
}
</style>

