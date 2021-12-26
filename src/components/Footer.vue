<template>
    <footer role="contentinfo" class="footer">
        <div class="footer__wrapper">
            <div class="footer__item footer__tech">
                {{ t("builtWith") }}
                <custom-link
                    type="underline"
                    to="https://v3.vuejs.org/"
                    :external="true"
                >
                    vue 3 + vite
                </custom-link>
            </div>
            <div class="footer__item footer__author">
                © {{ currentYear }} {{ t("myName") }}
            </div>
            <div class="footer__item footer__source">
                <span class="footer__source-text">{{ t("sourceCode") }}</span>
                <a
                    aria-label="github"
                    class="footer__icon"
                    href="https://github.com/moody-person/my-site"
                >
                    <BrandGithubIcon />
                </a>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BrandGithubIcon } from "vue-tabler-icons";
import { useI18n } from "vue-i18n";
import CustomLink from "@/components/CustomLink.vue";

export default defineComponent({
    name: "MyFooter",
    components: {
        CustomLink,
        BrandGithubIcon,
    },
    setup() {
       const date = new Date();

        return {
            ...useI18n(),
            currentYear: date.getFullYear(),
        }
    }
});
</script>

<style lang="postcss" scoped>
.footer {
    width: 100%;
    margin: 2rem auto 0 auto;
    flex-grow: 0;
    padding: 1rem 0.5rem;
    border-top: 1px solid var(--color-text);

    @media (min-width: 48rem) {
        padding: 0 1rem;
    }

    @media (min-width: 70rem) {
        padding: 0;
    }

    &__item:not(:first-of-type) {
        margin-top: 0.5rem;
        margin-left: 1rem;
        @media (min-width: 30rem) {
            margin-top: 0rem;
        }
    }

    &__wrapper {
        max-width: var(--max-footer-width);
        margin: 0 auto;
        padding: 0.25rem 0.5rem;
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        @media (min-width: 30rem) {
            flex-direction: row;
        }
    }
    &__author {
        margin: 0 0.5rem;
        @media (min-width: 30rem) {
            margin: 0;
        }
    }
    &__icon {
        margin-left: 0.5rem;
        color: var(--color-text);
        &:visited {
            color: var(--color-text);
        }
    }
    &__source {
        display: flex;
        align-items: center;
    }
}
</style>
