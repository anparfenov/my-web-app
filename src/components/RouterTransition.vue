<template>
    <transition name="slide-out">
        <slot />
    </transition>
</template>

<script>
export default {
    name: "RouterTransition",
};
</script>

<style scoped>
.slide-out-enter-active {
    width: 100%;
    position: fixed;
    animation: slide-in 0.5s ease;
}
.slide-out-leave-active {
    width: 100%;
    position: fixed;
    animation: slide-out 0.5s ease;
}
@keyframes slide-in {
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(0);
    }
}
@keyframes slide-out {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}
</style>
