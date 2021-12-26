<template>
    <div ref="frame" class="window">
        <div
            ref="top"
            class="window__top"
            @mousedown="handleTopMouseDown"
        />
        <div
            ref="bottom"
            class="window__bottom"
            @mousedown="handleBottomMouseDown"
        />
        <div
            ref="left"
            class="window__left"
            @mousedown="handleLeftMouseDown"
        />
        <div
            ref="right"
            class="window__right"
            @mousedown="handleRightMouseDown"
        />
        <div ref="titlebar" class="window__titlebar" @mousedown="handleTitleBarMouseDown">
            <h2>{{ title }}</h2>
            <span class="window__controls">
                <button
                    class="window__button window__button--maximize"
                    aria-label="maximize"
                    @click="maximizeWindow"
                />
                <button
                    class="window__button window__button--close"
                    aria-label="close"
                    @click="closeWindow"
                />
            </span>
        </div>
        <div class="window__content">
            <slot />
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watchEffect } from "vue";
import { clamp } from "lodash";

import { getTranslateXY } from "../utils";

// TODO add angle resizing
export default {
    name: "MyWindow",
    props: {
        initPos: { type: Object, default: () => ({}) },
        title: { type: String, default: "" },
    },
    emits: ["close"],
    setup(props, { emit }) {
        // template refs
        const frame = ref(null);
        const titlebar = ref(null);
        const top = ref(null);
        const bottom = ref(null);
        const left = ref(null);
        const right = ref(null);

        const frameActiveClass = "window--active";
        const grabbingClass = "window__titlebar--grabbing";

        let handleTopMouseUp = null;
        let handleBottomMouseUp = null;
        let handleLeftMouseUp = null;
        let handleRightMouseUp = null;

        let handleTopMouseDown = ref(null);
        let handleBottomMouseDown = ref(null);
        let handleLeftMouseDown = ref(null);
        let handleRightMouseDown = ref(null);

        let handleTopMouseMove = null;
        let handleBottomMouseMove = null;
        let handleLeftMouseMove = null;
        let handleRightMouseMove = null;

        onMounted(() => {
            frame.value.style.top = startPosTop + "px";
            frame.value.style.left = startPosLeft + "px";
            frame.value.classList.add(frameActiveClass);

            handleTopMouseUp = handleResizeMouseUp("top");
            handleBottomMouseUp = handleResizeMouseUp("bottom");
            handleLeftMouseUp = handleResizeMouseUp("left");
            handleRightMouseUp = handleResizeMouseUp("right");


            handleTopMouseMove = handleResizeMouseMove("top");
            handleBottomMouseMove = handleResizeMouseMove("bottom");
            handleLeftMouseMove = handleResizeMouseMove("left");
            handleRightMouseMove = handleResizeMouseMove("right");
        });


        onBeforeUnmount(() => {
            window.removeEventListener("mousemove", handleTitleBarMouseMove);
            window.removeEventListener("mouseup", handleTitleBarMouseUp);
            frame.value.classList.remove(frameActiveClass);
        });

        function closeWindow() {
            emit("close");
        }

        let memWidth = "auto";
        let memHeight = "auto";
        let memPosX = 0;
        let memPosY = 0;
        function maximizeWindow() {
            frame.value.classList.toggle("window--max");

            if (frame.value.classList.contains("window--max")) {
                memWidth = frame.value.style.width;
                memHeight = frame.value.style.height;
                const BBox = frame.value.getBoundingClientRect();
                memPosX = BBox.x;
                memPosY = BBox.y;

                frame.value.style.width = "auto";
                frame.value.style.height = "auto";
                frame.value.style.transform = "none";
                frame.value.style.top = 0 + "px";
                frame.value.style.left = 0 + "px";
                frame.value.style.right = 0 + "px";
                frame.value.style.bottom = 0 + "px";

                startPosLeft = 0;
                startPosTop = 0;
            } else {
                frame.value.style.width = memWidth;
                frame.value.style.height = memHeight;
                frame.value.style.top = memPosY + "px";
                frame.value.style.left = memPosX + "px";
                startPosTop = memPosY;
                startPosLeft = memPosX;
                console.log("startPosLeft", startPosLeft, startPosTop);
            }
        }

        let titleBarX = 0;
        let titleBarY = 0;
        // eslint-disable-next-line
        let startPosTop = props.initPos.y; // init y pos of frame
        // init x pos of frame
        let startPosLeft =
            props.initPos.x + 24 * 16 > window.innerWidth ? 8 : props.initPos.x;
        function handleTitleBarMouseMove(e) {
            const x = e.pageX;
            const y = e.pageY;
            frame.value.style.transform = `translate(
                ${x - titleBarX - startPosLeft}px,
                ${y - titleBarY - startPosTop}px)`;
        }

        function handleTitleBarMouseDown(e) {
            if (
                e.target.tagName === "BUTTON" ||
                e.target.classList.contains("window__controls")
            ) {
                return;
            }

            const BBox = titlebar.value.getBoundingClientRect();
            titleBarX = e.clientX - BBox.x; // x pos inside titlebar
            titleBarY = e.clientY - BBox.y; // y pos inside titlebar
            titlebar.value.classList.add(grabbingClass);

            window.addEventListener("mousemove", handleTitleBarMouseMove);
            window.addEventListener("mouseup", handleTitleBarMouseUp);
        }

        function handleTitleBarMouseUp() {
            titlebar.value.classList.remove(grabbingClass);
            window.removeEventListener("mousemove", handleTitleBarMouseMove);
            window.removeEventListener("mouseup", handleTitleBarMouseUp);
        }

        let cursorX = 0; // cursor x start position
        let cursorY = 0; // cursor y start position
        let initWidth = 0; // initial width of frame
        let initHeight = 0; // initial height of frame

        function resize({pos, elem, event, startPosTop, startPosLeft}) {
            if (pos === "top") {
                const { translateX } = getTranslateXY(elem);
                frame.value.style.transform = `translate(
                    ${translateX}px,
                    ${event.pageY - startPosTop}px)`;
            } else if (pos === "left") {
                const { translateY } = getTranslateXY(elem);
                frame.value.style.transform = `translate(
                    ${event.pageX - startPosLeft}px,
                    ${translateY}px)`;
            }
        }

        const handleResizeMouseMove = (position) => (e) => {
            const deltaX = cursorX - e.clientX; // distance between cursor and window
            const deltaY = cursorY - e.clientY; // distance between cursor and window
            switch (position) {
                case "top":
                    frame.value.style.height = clamp(
                        +frame.value.offsetHeight + deltaY,
                        initHeight + deltaY,
                        initHeight + deltaY,
                    ) + "px";

                    resize({
                        pos: position,
                        elem: frame.value,
                        event: e,
                        startPosLeft,
                        startPosTop,
                    });
                    break;
                case "bottom":
                    frame.value.style.height = clamp(
                        +frame.value.offsetHeight - deltaY,
                        initHeight - deltaY,
                        initHeight - deltaY,
                    ) + "px";
                    break;
                case "left":
                    frame.value.style.width = clamp(
                        +frame.value.offsetWidth + deltaX,
                        initWidth + deltaX,
                        initWidth + deltaX,
                    ) + "px";
                    resize({
                        pos: position,
                        elem: frame.value,
                        event: e,
                        startPosLeft,
                        startPosTop,
                    });
                    break;
                case "right":
                    frame.value.style.width = clamp(
                        +frame.value.offsetWidth - deltaX,
                        initWidth - deltaX,
                        initWidth - deltaX,
                    ) + "px";
                    break;
                default:
                    throw new TypeError("HANDLE_RESIZE_MOUSE_MOVE: no such position");
            }

        };

        const handleResizeMouseDown = (position) => (e) => {
            initWidth = frame.value.offsetWidth;
            initHeight = frame.value.offsetHeight;
            cursorX = e.clientX;
            cursorY = e.clientY;
            switch (position) {
                case "top":
                    window.addEventListener("mousemove", handleTopMouseMove);
                    window.addEventListener("mouseup", handleTopMouseUp);
                    break;
                case "bottom":
                    window.addEventListener("mousemove", handleBottomMouseMove);
                    window.addEventListener("mouseup", handleBottomMouseUp);
                    break;
                case "left":
                    window.addEventListener("mousemove", handleLeftMouseMove);
                    window.addEventListener("mouseup", handleLeftMouseUp);
                    break;
                case "right":
                    window.addEventListener("mousemove", handleRightMouseMove);
                    window.addEventListener("mouseup", handleRightMouseUp);
                    break;
                default:
                    throw new TypeError("HANDLE_RESIZE_MOUSE_DOWN: no such position");
            }
        };

        watchEffect(() => {
            // does not work in onMounted hook
            handleTopMouseDown.value = handleResizeMouseDown("top");
            handleBottomMouseDown.value = handleResizeMouseDown("bottom");
            handleLeftMouseDown.value = handleResizeMouseDown("left");
            handleRightMouseDown.value = handleResizeMouseDown("right");
        });

        const handleResizeMouseUp = (position) => () => {
            switch (position) {
                case "top":
                    window.removeEventListener("mouseup", handleTopMouseUp);
                    window.removeEventListener("mousemove", handleTopMouseMove);
                    break;
                case "bottom":
                    window.removeEventListener("mouseup", handleBottomMouseUp);
                    window.removeEventListener("mousemove", handleBottomMouseMove);
                    break;
                case "left":
                    window.removeEventListener("mouseup", handleLeftMouseUp);
                    window.removeEventListener("mousemove", handleLeftMouseMove);
                    break;
                case "right":
                    window.removeEventListener("mouseup", handleRightMouseUp);
                    window.removeEventListener("mousemove", handleRightMouseMove);
                    break;
                default:
                    throw new TypeError("HANDLE_RESIZE_MOUSE_UP: no such position");
            }
        };

        return {
            frame,
            titlebar,
            closeWindow,
            maximizeWindow,
            handleTitleBarMouseDown,
            handleTopMouseDown: handleTopMouseDown.value,
            handleBottomMouseDown: handleBottomMouseDown.value,
            handleLeftMouseDown: handleLeftMouseDown.value,
            handleRightMouseDown: handleRightMouseDown.value,
            top,
            bottom,
            left,
            right,
        };
    },
};
</script>

<style scoped>
.window {
    --border-size: 2px;
    --titlebar-height: 2rem;

    position: fixed;
    background-color: var(--color-terminal-black);
    color: var(--color-main);
    width: 24rem;
    height: 15rem;
    min-height: 5rem;
    border-radius: 6px;
    display: none;
    border: 1px solid var(--border-color);
    grid-template-columns: var(--border-size) 1fr var(--border-size);
    grid-template-rows: var(--border-size) var(--titlebar-height) 1fr var(--border-size);
    grid-template-areas:
    "top top top"
    "left titlebar right"
    "left content right"
    "bottom bottom bottom";
}
.window--active {
    display: grid;
}
.window--max {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    max-width: 100vw;
}

.window__top {
    grid-area: top;
    cursor: ns-resize;
}
.window__bottom {
    grid-area: bottom;
    cursor: ns-resize;
}
.window__left {
    grid-area: left;
    cursor: ew-resize;
}
.window__right {
    grid-area: right;
    cursor: ew-resize;
}

.window__titlebar {
    height: var(--titlebar-height);
    width: 100%;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border: 1px dashed var(--color-border);
    cursor: grab;
    text-align: right;
    grid-area: titlebar;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}
.window__titlebar--grabbing {
    cursor: grabbing;
    background: var(--color-drag);
    color: var(--color-text-inv);
}
.window__titlebar--grabbing .window__button {
    border: 1px solid var(--color-main);
}
.window__controls {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-right: 0.25rem;
    cursor: auto;
}
.window__button {
    width: 1rem;
    height: 1rem;
    padding: 0;
    border-radius: 100%;
    vertical-align: middle;
    border: 1px solid transparent;
}
.window__button:not(:first-of-type) {
    margin-left: 0.25rem;
}
.window__button--close {
    background-color: var(--color-error);
}
.window__button--maximize {
    background-color: var(--color-accent);
}
.window__content {
    height: calc(100% - var(--titlebar-height));
    overflow: auto;
    padding: 0.25rem 0.5rem;
    cursor: auto;
    grid-area: content;
}
</style>
