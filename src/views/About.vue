<template>
    <div class="about">
        <h1 class="about__title">
            {{ t("aboutMeTitle") }}
        </h1>
        <section class="about__meta">
            <p class="about__profession">{{ t("profession") }}</p>
            <p>{{ t("aboutMeText") }}</p>
        </section>
        <section class="about__links">
            <my-socials :socials="socials" />
            <custom-link type="text" :to="{ name: 'cv' }" class="about__link">
                {{ t("cv") }}
            </custom-link>
            <custom-link type="text" :external="true" class="about__link" :to="dotfilesLink" target="_blank">
                dotfiles
            </custom-link>
        </section>
    </div>
</template>

<script>
 import { ref } from "vue";
import { useI18n } from "vue-i18n";
import MySocials from "@/components/Socials.vue";
import { socials } from "../config/index";
 import CustomLink from "@/components/CustomLink.vue";

export default {
    name: "AboutView",
    components: { MySocials, CustomLink },
    setup() {
        const socialsRef = ref(socials);

        return {
            ...useI18n(),
            socials: socialsRef,
            dotfilesLink: "https://gitea.andreyparfenov.com/person/dotfiles",
        };
    },
};
</script>

<style lang="postcss" scoped>
.about {
    width: 100%;
    &__activities {
        margin-top: 1rem;
    }
    &__profession {
        font-weight: 700;
        margin-bottom: 0.25rem;
    }
    &__title {
        margin: 0.5rem 0;
    }
    &__links {
        border-top: 1px solid var(--color-border);
        margin-top: 1rem;
        padding-top: 1rem;
        display: flex;
    }
    &__link {
        margin-left: 1rem;
    }
}
.activities {
    &__list {
        padding-left: 1.5rem;
        list-style-type: circle;
    }
}
</style>
