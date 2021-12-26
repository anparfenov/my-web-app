<template>
    <div class="shell">
        <my-header :routes="routes" />
        <main>
            <router-view v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </main>
        <my-footer />
    </div>
</template>

<script>
import { ref } from "vue";

import MyHeader from "@/components/Header.vue";
import MyFooter from "@/components/Footer.vue";
import RouterTransition from "./RouterTransition.vue";
import { routes } from "@/router";

// TODO make router-transition if page is loaded
export default {
    name: "MyShell",
    components: {
        MyHeader,
        MyFooter,
        RouterTransition,
    },
    setup() {
        const r = ref(routes);
        return {
            routes: r,
        };
    },
};
</script>

<style lang="postcss">
.shell {
    display: flex;
    flex-direction: column;
    width: 100%;
}
main {
    flex: 1;
}
.footer. header {
    flex-grow: 0;
}
main,
.header {
    width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
}
@media (min-width: 640px) {
    main,
    .header {
        max-width: 640px;
    }
}
@media (min-width: 768px) {
    main,
    .header {
        max-width: 768px;
    }
}
@media (min-width: 1024px) {
    main,
    .header {
        max-width: 1024px;
    }
}
@media (min-width: 1240px) {
    main,
    .header {
        max-width: 1240px;
    }
}

@media only screen and (min--moz-device-pixel-ratio: 2),
    only screen and (-o-min-device-pixel-ratio: 2/1),
    only screen and (-webkit-min-device-pixel-ratio: 2),
    only screen and (min-device-pixel-ratio: 2) {
    main,
    .header {
        max-width: 48rem;
    }
}

@custom-media --mobile-viewport (min-width: 30rem);
@custom-media --tablet-viewport (min-width: 48rem);
@custom-media --laptop-viewport (min-width: 70rem);
@custom-media --desktop-viewport (min-width: 90rem);

.lang__list {
    display: flex;
    flex-flow: column nowrap;
}
</style>
