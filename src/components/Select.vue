<template>
    <div class="select">
        <div ref="currentItemElement" class="select__item" @click="toggle">
            {{ currentItem }}
        </div>
        <teleport to="body">
            <ul v-if="show" ref="dropdown" class="select__list">
                <li
                    v-for="(item, index) in itemlist"
                    :key="index"
                    class="select__list-item"
                >
                    <button
                        :class="selectedClass(item)"
                        class="select__button"
                        data-item="item"
                        @click="selectItem"
                    >
                        {{ item }}
                    </button>
                </li>
            </ul>
        </teleport>
    </div>
</template>

<script>
import { ref, computed, watchEffect, nextTick } from "vue";
import { useDropdown } from "../use/dropdown.js";

export default {
    name: "MySelect",
    props: {
        list: { type: Array, default: () => [] },
        listFn: { type: Function, default: () => false },
    },
    emits: ["click"],
    setup(props) {
        const currentItemElement = ref(null);
        const dropdown = ref(null);
        const currentItem = ref(props.list[0]);
        const show = ref(false);

        const itemlist = computed(() => props.listFn() ? props.listFn(props.list) : props.list);

        let popper = ref(null);

        watchEffect(() => {
            popper.value = useDropdown({
                button: currentItemElement,
                dropdown,
            });
        });

        function selectedClass(item) {
            return item === currentItem.value ? "select__list-item--selected" : "";
        }

        function selectItem({ target }) {
            currentItem.value = target.dataset.item;
            toggle();
        }

        function toggle() {
            show.value = !show.value;
            nextTick(() => {
                popper.value.setDropdown(dropdown);
                popper.value.toggle(show);
            });
        }

        return {
            currentItemElement,
            dropdown,
            currentItem,
            show,
            selectedClass,
            selectItem,
            toggle,
            itemlist,
        };
    },
};
</script>

<style scoped>
.select__item {
    cursor: pointer;
}
.select__list {
    list-style-type: none;
    padding: 0;
}
.routes__route:not(:first-of-type) {
    margin-top: 0.5rem;
}
</style>
