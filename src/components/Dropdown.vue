<template>
    <div ref="dropdown" :class="customClass" class="dropdown">
        <slot />
        <div
            class="arrow"
            data-popper-arrow
        />
    </div>
</template>

<script>
export default {
    name: "MyDropdown",
    props: {
        customClass: {
            type: String,
            default: "",
        },
    },
};
</script>

<style scoped>
.dropdown {
    background: var(--color-gray-300);
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    position: relative;
    z-index: 10;
}

.arrow,
.arrow:before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: -1;
}

.arrow:before {
    content: '';
    transform: rotate(45deg);
    background: var(--color-scnd);
}
.dropdown[data-popper-placement^='top'][data-shadow] {
    box-shadow: 0 -4px 6px -2px var(--color-shadow-15),
        0 -10px 15px -3px var(--color-shadow-15);
}
.dropdown[data-popper-placement^='bottom'][data-shadow] {
    box-shadow: 0 10px 15px -3px var(--color-shadow-15),
        0 4px 6px -2px var(--color-shadow-15);
}
.dropdown[data-popper-placement^='right'][data-shadow] {
    box-shadow: 0 10px 15px -3px var(--color-shadow-15),
        4px 0px 6px -2px var(--color-shadow-15);
}
.dropdown[data-popper-placement^='left'][data-shadow] {
    box-shadow: 0 10px 15px -3px var(--color-shadow-15),
        -4px 4px 6px -2px var(--color-shadow-15)
}
.dropdown[data-popper-placement^='top'] > .arrow {
    bottom: -4px;
}

.dropdown[data-popper-placement^='bottom'] > .arrow {
    top: -4px;
}

.dropdown[data-popper-placement^='left'] > .arrow {
    right: -4px;
}

.dropdown[data-popper-placement^='right'] > .arrow {
    left: -4px;
}
</style>
