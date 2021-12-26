<template>
    <div class="tooltip">
        <slot />
        <div
            class="arrow"
            data-popper-arrow
        />
    </div>
</template>

<script>
export default {
    name: "MyTooltip",
};
</script>

<style scoped>

</style>

