<template>
    <transition name="bounce">
        <div class="toast" :class="toastClass" @click="handleToastClick">
            <button v-if="enableCloseButton" class="toast__close-button" @click="close">
                &#10005;
            </button>
            {{ text }}
        </div>
    </transition>
</template>

<script>
import { nanoid } from "nanoid";

export default {
    name: "MyToast",
    props: {
        type: {
            type: String,
            default: "error",
        },
        text: {
            type: String,
            default: "",
        },
        duration: {
            type: Number,
            default: 3000,
        },
        action: {
            type: [Function, Promise],
            default: () => {},
        },
        id: {
            type: String,
            default: nanoid(),
            required: true,
        },
        enableCloseButton: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["close"],
    data() {
        return {
            animationDuration: 1000,
            timeoutId: undefined,
        };
    },
    computed: {
        toastClass() {
            return `toast--${this.type}`;
        },
    },
    mounted() {
        this.timeoutId = setTimeout(() => {
            this.$emit("close", this.id);
        }, this.duration + this.animationDuration);
    },
    beforeUnmount() {
        clearTimeout(this.timeoutId);
    },
    methods: {
        close(e) {
            e.stopPropagation();
            clearTimeout(this.timeoutId);
            this.$emit("close", this.id);
        },
        handleToastClick(e) {
            if (this.type.endsWith("-action")) {
                this.action(this.id);
            } else {
                this.close(e);
            }
        },
    },
};
</script>

<style lang="postcss" scoped>
@keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0) scaleY(3);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0) scaleY(0.9);
  }

  75% {
    transform: translate3d(0, -10px, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, 5px, 0) scaleY(0.985);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

.bounce-enter-active {
  animation-name: bounceInDown;
}

@keyframes fadeOutDown {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
}

.bounce-leave-active {
  animation-name: fadeOutDown;
}
.toast {
    position: relative;
    cursor: pointer;
    text-align: center;
    padding: 0.5rem 0.7rem;
    border-radius: 0.25rem;

    &__close-button {
        position: absolute;
        right: 0.25rem;
        top: 0.25rem;
        cursor: pointer;
        background: transparent;
        border: none;
        color: var(--text-main);
        font-size: 1.2rem;
        &:hover {
            opacity: 0.8;
        }
    }

    &--error {
        background-color: var(--color-error);
        color: var(--color-text-inv);
    }

    &--success {
        background-color: var(--color-extra);
        color: var(--color-text-inv);
    }

    &--success-action {
        cursor: pointer;
        background-color: var(--color-extra);
        color: var(--color-text-inv);
    }
}
</style>
