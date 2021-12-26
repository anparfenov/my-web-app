<template>
    <ul class="toast-list">
        <transition-group name="bounce">
            <li v-for="toast in toastList" :key="toast.id" class="toast-list__item">
                <my-toast
                    :id="toast.id"
                    :text="toast.text"
                    :type="toast.type"
                    :duration="toast.duration"
                    :action="toast.action"
                    @close="removeToast"
                />
            </li>
        </transition-group>
    </ul>
</template>

<script>
import { onUpdated } from "vue";
import { useStore } from "vuex";
import MyToast from "./Toast.vue";

export default {
    name: "ToastList",
    components: {
        MyToast,
    },
    props: {
        toastList: {
            type: Array,
            default: () => [],
        },
    },
    setup() {
        const store = useStore();
        function removeToast(id) {
            // don't forget about id
            store.dispatch("common/removeToast", { id });
        }
        return { removeToast };
    },
};
</script>

<style lang="postcss" scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.bounce-enter-active {
  animation-name: fadeInUp;
  animation-duration: 0.4s;
}

@keyframes fadeOutUp {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
}

.bounce-leave-active {
  animation-name: fadeOutUp;
  animation-duration: 0.4s;
}
.toast-list {
    position: fixed;
    top: 1rem;
    right: 1rem;
    list-style-type: none;
    z-index: 1000;

    &__item:not(:first-of-type) {
        margin-top: 0.5rem;
    }
}
</style>
