<template>
    <div class="home-wrapper">
        <div class="home">
            <div class="home__content">
                <h1 class="home__title">{{ t("myName") }}</h1>
                <p class="home__text">
                    {{ t("siteDescription") }}
                </p>
            </div>
        </div>
        <div class="home__routes">
            <routes-list :routes="routes" />
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import { routes } from "@/router";
import RoutesList from "../components/RoutesList.vue";

export default {
    name: "HomeView",
    components: {
        RoutesList,
    },
    setup() {
        const r = ref(routes);

        return {
            ...useI18n(),
            routes: r,
        };
    },
};
</script>

<style lang="postcss" scoped>
.home {
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--color-light-55);

    &__content {
        background: var(--gradient-header);
        padding: 1rem;
        border-radius: 0.25rem;
    }

    &__title {
        margin-bottom: 0.5rem;
    }
    &__routes {
        margin-top: 1rem;
    }
}
</style>
