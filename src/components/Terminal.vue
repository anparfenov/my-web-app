<template>
    <my-window :init-pos="initPos" @close="closeWindow">
        <div ref="terminal" class="terminal">
            <div v-for="(line, index) in lines" :key="index" class="terminal__line">
                <div class="terminal__path">
                    {{ line.path }}
                </div>
                <div class="u-flex-center">
                    <span class="terminal__prompt">&#10093;</span>
                    <input
                        v-if="lines.length - 1 === index"
                        v-model="input"
                        type="text"
                        class="terminal__input"
                        aria-label="current input"
                        @keydown.enter="handleEnter"
                    >
                    <input
                        v-else
                        type="text"
                        :value="line.value"
                        aria-label="previous input"
                        disabled
                        class="terminal__input"
                    >
                </div>
                <div v-if="line.output.length > 0" class="terminal__output">
                    <div
                        v-for="(out, oIndex) in line.output"
                        :key="oIndex"
                        :class="isErrorClass(out)"
                    >
                        {{ out.error ? out.error : out.res }}
                    </div>
                </div>
            </div>
        </div>
    </my-window>
</template>

<script>
import { ref, nextTick, onMounted, onBeforeUnmount, onUpdated } from "vue";
import { useRoute, useRouter } from "vue-router";

import { parse, evaluate, deps as commandDeps } from "../terminal/command";

import MyWindow from "./Window.vue";

export default {
    name: "MyTerminal",
    components: {
        MyWindow,
    },
    props: {
        initPath: { type: String, default: "/" },
        initPos: { type: Object, default: () => ({}) },
    },
    emits: ["close"],
    setup(props, { emit }) {
        const currentPath = ref(props.initPath);
        const input = ref("");
        const terminal = ref(null);
        let lines = ref([{ path: props.initPath, value: "", output: [] }]);

        const route = useRoute();
        const router = useRouter();
        commandDeps.router = router;

        onMounted(() => {
            console.log('mounted');
            // i have to, because route path doesn't change on router back()
            window.addEventListener("popstate", handlePopState);

            nextTick(() => {
                focusCurrentInput();
            });
        });

        onUpdated(() => { console.log('lines', lines) })

        onBeforeUnmount(() => {
            window.removeEventListener("popstate", handlePopState);
        });

        function closeWindow() {
            emit("close");
        }

        function isErrorClass(obj) {
            if (obj.error) {
                return "terminal__result terminal__result--error";
            }
            return "terminal__result";
        }

        function handlePopState() {
            lines.value[lines.value.length - 1].path = window.location.pathname;
        }

        function focusCurrentInput() {
            const input = terminal.value.querySelector('input:not([disabled=""])');
            console.log("input", input);
            if (input) {
                input.focus();
            }
        }

        async function handleEnter() {
            let output = "";
            try {
                const tokens = parse(input.value);
                if (tokens.length > 0) {
                    output = await evaluate(tokens, { exit: closeWindow });
                }
            } catch (e) {
                output = [{ error: e.message }];
            }

            const valueCopy = JSON.parse(JSON.stringify(input.value));
            const last = lines.value.length - 1;
            lines.value[last].value = valueCopy;
            lines.value[last].output = output;

            lines.value.push({ path: route.path, value: "", output: [] });
            input.value = "";

            if (output.length > 0 && output[0].clear) {
                lines.value = [{ path: route.path, value: "", output: [] }];
            }
            if (output.length > 0 && output[0].exit) {
                closeWindow();
                return;
            }

            nextTick(() => {
                focusCurrentInput();
            });
        }

        return {
            handleEnter,
            lines,
            currentPath,
            input,
            isErrorClass,
            terminal,
            closeWindow,
        };
    },
};
</script>

<style>
.terminal {
    font-family: var(--monospace);
}
.terminal__path {
    color: var(--extra-color);
}

.terminal__line:last-of-type {
    padding-bottom: 0.5rem;
}
.terminal__input {
    font-family: inherit;
    font-size: 1rem;
    background-color: var(--color-terminal-black);
    color: var(--color-main);
    padding: 0.25rem 0.5rem;
    outline: none;
    box-shadow: none;
    width: 100%;
    border: 1px solid var(--color-terminal-black);
    border-radius: 6px;
}

.terminal__input:focus {
    border: 1px solid var(--color-light);
}

.terminal__prompt {
    color: var(--color-terminal-green);
}

.terminal__output {
    margin-top: 0.25rem;
    margin-bottom: 1rem;
}

.terminal__result--error {
    color: var(--color-error);
}

.u-flex-center {
    display: flex;
    align-items: center;
}
</style>
