<template>
    <div class="input">
        <div class="input__meta">
            <label :for="inputid" :class="visuallyhidden" class="input__label">
                {{ label }}
            </label>
            <span ref="validationMessageEl" class="input__validation">
                {{ validationMessage }}
            </span>
        </div>
        <input
            :id="inputid"
            :value="modelValue"
            v-bind="$attrs"
            class="input__element"
            @input="handleInput"
            @invalid="handleInvalid"
        >
    </div>
</template>

<script>
import { ref } from "vue";
import { nanoid } from "nanoid";
import { debounce } from "lodash";
import { useForm } from "../use/form.js";

export default {
    name: "MyInput",
    props: {
        label: { type: String, default: "" },
        validationMessage: { type: String, default: "" },
        modelValue: { type: String, default: "" },
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
        const validationMessageEl = ref(null);

        const { handleInvalid } = useForm({
            invalidClass: "input__element--invalid",
            validityMessageClass: "input__validation--visible",
        });

        /*
         * passes handleInvalid function and template ref
         * and returns function with event parameter
         */
        const delayedFn = (fn, el) => (e) => {
            fn(e, el);
        };

        const debouncedHandleInvalid = debounce(handleInvalid, 1000);

        function handleInput(e) {
            emit("update:modelValue", e.target.value);
            debouncedHandleInvalid(e, validationMessageEl);
        }

        return {
            handleInput,
            handleInvalid: delayedFn(handleInvalid, validationMessageEl),
            validationMessageEl,
        };
    },
    data() {
        return {
            inputid: nanoid(),
        };
    },
    computed: {
        visuallyhidden() {
            return this.label ? "" : "visuallyhidden";
        },
    },
};
</script>

<style scoped>
.input {
    display: flex;
    flex-flow: column;
}
.input__element {
    border-radius: 6px;
    border: 1px solid var(--color-border);
    padding: 0.3rem 0.5rem;
    font-size: 1rem;
}
.input__element:focus {
    border: 1px solid var(--color-drag);
}
.input__element:invalid {
    box-shadow: none;
    outline: none;
}
.input__element--invalid {
    box-shadow: 0px 1px 3px var(--color-error),
    0px -1px 3px var(--color-error) !important;
}
.input__meta {
    margin-bottom: 0.2rem;
    display: flex;
    justify-content: space-between;
}
.input__label {
    font-size: 0.875rem;
}
.input__validation {
    color: var(--color-error);
    font-size: 0.875rem;
    visibility: hidden;
}
.input__validation--visible {
    visibility: visible;
}
</style>
