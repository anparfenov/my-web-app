<template>
    <my-shell />
    <!-- <toast-list :toast-list="tl" /> -->
</template>

<script>
import MyShell from "./components/Shell.vue";
 // import ToastList from "./components/ToastList.vue";

export default {
    name: "App",
    components: {
        MyShell,
    },
};
</script>
