<template>
    <header class="header">
        <my-button
            ref="terminalButton"
            class="terminal-button"
            @click="toggleTerminal"
        >
            <TerminalIcon size="20" />
        </my-button>
        <my-navigation :routes="routes" />
        <!-- <button ref="langButton" class="button lang-button" @click="toggleLang"> -->
        <!--     <LanguageIcon size="20" /> -->
        <!-- </button> -->
    </header>
    <teleport to="#dropdown-list">
        <my-terminal
            v-if="showTerminal"
            :init-pos="terminalButtonBox"
            :init-path="initPath"
            @close="toggleTerminal"
        />
    </teleport>
        <!-- <teleport to="#dropdown-list"> -->
        <!--     <my-dropdown v-show="showLang" ref="langDropdown" data-shadow> -->
        <!--         <dropdown-list -->
        <!--             v-model="currentLanguage" -->
        <!--             :list="langlist" -->
        <!--             @close="toggleLang" -->
        <!--         /> -->
        <!--     </my-dropdown> -->
        <!-- </teleport> -->
</template>

<script lang="ts">
import {
    ref,
    watch,
    nextTick,
    onMounted,
    computed,
    PropType,
    Ref,
    defineComponent,
} from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, RouteRecord } from "vue-router";
import { TerminalIcon, FolderIcon } from "vue-tabler-icons";

import MyTerminal from "./Terminal.vue";
import MyDropdown from "./Dropdown.vue";
import MyNavigation from "./Navigation.vue";
import MyButton from "./Button.vue";

import { useDropdown } from "../use/dropdown";
import { langlist } from "../i18n";

export default defineComponent({
    name: "MyHeader",
    components: {
        MyButton,
        MyTerminal,
        MyNavigation,
        MyDropdown,
        TerminalIcon,
        FolderIcon,
    },
    props: {
        routes: {
            type: Array as PropType<Array<RouteRecord>>,
            default: () => [],
        },
    },
    setup() {
        const showNav = ref(false);
        const showLang = ref(false);

        const showTerminal = ref(false);
        const terminalButtonBox: Ref<DOMRect | null> = ref(null);
        const terminalButton: Ref<{ button: HTMLButtonElement } | null> =
            ref(null);

        const navButton: Ref<HTMLButtonElement | null> = ref(null);
        const langButton: Ref<HTMLButtonElement | null> = ref(null);

        const langDropdown: Ref<HTMLDivElement | null> = ref(null);

        const popperLang: Ref<DROPDOWN.UseDropdownReturn | null> = ref(null);

        const initPath = computed(() =>
            typeof window === "object" ? window.location.pathname : "/"
        );

        const route = useRoute();
        const path = computed(() => route.fullPath);

        let { locale } = useI18n();
        const currentLanguage = ref(locale.value);

        const visibleClass = "is-visible";

        onMounted(() => {
            // TODO: lang dropdown
            popperLang.value = useDropdown({
                button: langButton,
                buttonClass: visibleClass,
                dropdown: langDropdown,
            });
        });

        watch([currentLanguage], ([currentLanguage]) => {
            changeLocale(currentLanguage);
        });

        function toggleLang() {
            showLang.value = !showLang.value;
            langButton?.value?.classList.toggle(visibleClass);
            nextTick(() => {
                popperLang?.value?.update(langDropdown, showLang);
                popperLang?.value?.toggle();
            });
        }

        function toggleTerminal() {
            showTerminal.value = !showTerminal.value;
            terminalButtonBox.value =
                terminalButton?.value?.button.getBoundingClientRect() ?? null;
        }

        function changeLocale(currentLocale: string) {
            document.documentElement.setAttribute("lang", currentLocale);
            locale.value = currentLocale;
        }

        const isSsr = computed(() => import.meta.env.SSR);

        return {
            toggleTerminal,
            toggleLang,
            navButton,
            langButton,
            langDropdown,
            showNav,
            showLang,
            changeLocale,
            langlist,
            locale,
            currentLanguage,
            initPath,
            path,
            terminalButton,
            showTerminal,
            terminalButtonBox,
            isSsr
        };
    },
});
</script>

<style lang="postcss" scoped>
.header {
    display: flex;
    padding: 1rem;
    align-items: center;
    margin: 0 auto;
}

.header .button {
    color: var(--color-text);
    position: relative;
    background: linear-gradient(0deg, var(--color-text) 50%, transparent 0);
    background-position: 0 0;
    background-size: 100% 200%;
    text-transform: uppercase;
    font-family: var(--monospace);
    padding: 0.2rem;
    transition: color 0.16s linear, background 0.26s ease, transform 0.26s ease;
    display: flex;
    align-items: center;
    justify-content: center;

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

.terminal-button {
    margin-right: 1rem;
}

.is-visible {
    visibility: visible;
    opacity: 1;
}

@media not all and (hover: none) {
    .header .button {
        visibility: visible;
    }
}

.buttons-list {
    margin-left: 1rem;
}
</style>
