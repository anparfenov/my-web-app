<template>
    <button
        ref="button"
        class="user-counter__button"
        @mouseenter="showDropdown"
        @mouseleave="hideDropdown"
        @click="sendUserData"
    >
        Я был здесь!
    </button>
    <teleport to="#body">
        <my-dropdown v-show="show" ref="dropdown" customClass="u-max-w-200">
            Вы можете дать мне знать заходил ли кто на сайт, нажав на эту кнопку.
            Она отправит мне ваш ip адрес, чтобы я мог различать разных людей.
        </my-dropdown>
    </teleport>
</template>

<script>
import { onMounted, ref, nextTick } from "vue";
import { useStore } from "vuex";
import { useDropdown } from "../use/dropdown.js";
import MyDropdown from "./Dropdown.vue";
import { pushUserClick } from "../api/counter.js";

export default {
    name: "UserCounterButton",
    components: {
        MyDropdown,
    },
    setup() {
        const button = ref(null);
        const dropdown = ref(null);
        const popperButton = ref(null);
        const show = ref(false);

        const store = useStore();

        onMounted(() => {
            popperButton.value = useDropdown({
                button: button,
                dropdown: dropdown,
            });
        });
        function showDropdown() {
            show.value = true;
            nextTick(() => {
                popperButton.value.update(dropdown, show);
                popperButton.value.show();
            });
        }
        function hideDropdown() {
            show.value = false;
            nextTick(() => {
                popperButton.value.update(dropdown, show);
                popperButton.value.hide();
            });
        }
        async function sendUserData() {
            await pushUserClick();
            const toast = {
                type: "success",
                text: "Your click is counted. Thank you!",
            };
            store.dispatch("common/addToast", { toast });
        }
        return {
            button,
            dropdown,
            show,
            showDropdown,
            hideDropdown,
            sendUserData,
        };
    },
};
</script>

<style lang="postcss" scoped>
.user-counter {
    &__button {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        border-radius: 0.25rem;
        width: 6rem;
        height: 3rem;
        border: 1px solid transparent;
        background: var(--color-scnd);
        &:hover {
            border: 1px dashed var(--color-border);
        }
    }
}
</style>

<style>
.u-max-w-200 {
    max-width: 200px;
}
</style>

