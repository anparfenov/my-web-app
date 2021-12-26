<template>
    <ul class="path">
        <li
            v-for="(item, index) in pathList"
            :key="index"
            :class="isNotFirst(index)"
            class="path__item"
        >
            <router-link :to="item.pathname" class="path__link">
                {{ item.name }}
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: "MyPath",
    props: {
        path: {
            type: String,
            default: "/",
        },
    },
    computed: {
        pathList() {
            if (this.path === "") {
                return [];
            }
            if (this.path === "/") {
                return [{name: "/", pathname: "/root"}];
            }

            let newpath = this.path.split("/").map((path, i, arr) => {
                if (i === 0) {
                    return {
                        pathname: "/root",
                        name: "/",
                    };
                }
                let slash = "/";
                if (!arr[i - 1]) {
                    slash = "";
                }
                return {
                    pathname: slash + arr[i-1] + "/" + path,
                    name: path,
                };
            });

            return newpath;
        },
    },
    methods: {
        isNotFirst(index) {
            if (index > 1) {
                return "path__item--slash";
            }
        },
    },
};
</script>

<style scoped>
.path {
    display: flex;
    align-items: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
}
.path__item:not(:first-of-type) {
    padding-right: 0.5rem;
}
.path__item--slash:before {
    content: "/";
    padding-right: 0.5rem;
}
.path__link {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    color: var(--color-text);
    padding: 0.25rem 0.4rem;
}
.path__item:visited {
    color: var(--color-text);
}
.path__link:hover {
    color: var(--color-accent);
}
</style>
