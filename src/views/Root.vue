<template>
    <div class="root">
        TODO
    </div>
</template>

<script>
import RootRoutesList from "../components/RootRoutesList.vue";
import { routes } from "../router";

export default {
    name: "Root",
    components: {
        RootRoutesList,
    },
    data() {
        return {
            routes,
        };
    },
};
</script>

<style scoped>
.root {
    width: 100%;
}
</style>
