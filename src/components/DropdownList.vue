<template>
    <div class="dropdown-list">
        <ul class="list">
            <li
                v-for="(item, index) in list"
                :key="index"
                :class="currentItemClass(item)"
                class="list__item"
            >
                <button :data-index="index" class="list__button" @click="click">
                    {{ item }}
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import { watchEffect } from "vue";

export default {
    name: "DropdownList",
    props: {
        list: { type: Array, default: () => [] },
        modelValue: { type: String, default: "" },
    },
    emits: ["update:modelValue", "close"],
    setup(props, { emit }) {
        let currentItem;
        watchEffect(() => {
            currentItem = props.modelValue;
        });
        function click({ target }) {
            currentItem = props.list[target.dataset.index];
            emit("update:modelValue", currentItem);
            emit("close");
        }
        function currentItemClass(item) {
            return item === currentItem ? "list__item--active" : "";
        }
        return {
            click,
            currentItem,
            currentItemClass,
        };
    },
};
</script>

<style scoped>
.dropdown-list {
    min-width: 10rem;
}
.list {
    list-style-type: none;
    padding: 0;
}
/* move class to index.css */
.list__item {
    background: var(--color-gray-200);
    color: var(--text-color);
    text-decoration: none;
    display: block;
    border-radius: 0.25rem;
    width: 100%;
    box-shadow: 0px 0px 8px 1px hsla(0, 0%, 30%, 0.2);
}
.list__item:not(:first-of-type) {
    margin-top: 0.5rem;
}
.list__item:hover {
    box-shadow: 0px 0px 8px 1px hsla(0, 0%, 30%, 0.6)
}
.list__item:focus {
    box-shadow: 0px 0px 8px 1px hsla(0, 0%, 30%, 0.6)
}
.list__item--active {
    border: 1px dashed var(--color-gray-200);
    background-color: var(--color-gray-700);
    color: var(--color-text-inv);
}

.list__button {
    color: inherit;
    padding: 0.3rem 0.5rem;
    width: 100%;
    height: 100%;
}
</style>
