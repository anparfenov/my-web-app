<template>
    <ul class="socials">
        <li v-for="social in socials" :key="social.name" class="socials__item">
            <custom-link
                target="_blank"
                style="text"
                :external="true"
                :aria-label="social.name"
                :to="social.href"
            >
                <component :is="social.icon" />
            </custom-link>
        </li>
    </ul>
</template>

<script>
import CustomLink from "@/components/CustomLink.vue";

export default {
    name: "MySocials",
    components: {
        CustomLink,
    },
    props: {
        socials: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style scoped>
.socials {
    list-style-type: none;
    display: flex;
    padding: 0;
}
.socials__item:not(:first-of-type) {
    margin-left: 0.5rem;
}
</style>
