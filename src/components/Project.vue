<template>
    <div class="project project-grid">
        <div class="u-flex project-grid__title">
            <a :href="project.html_url" target="_blank">
                <h2 class="project__title">{{ project.name }}</h2>
            </a>
            <a
                v-if="project.url"
                :href="project.url"
                target="_blank"
                class="project__repo"
            >
            </a>
        </div>
        <p
            v-if="project.description"
            class="project__description project-grid__description"
        >
            {{ project.description }}
        </p>
        <div class="teck-stack project-grid--tech">
            <h3 class="tech-stack__title">Tech stack</h3>
            <ul class="tech-list">
                <li v-for="tech in project.tech" :key="tech.name" class="tech-list__item">
                    <my-chip :text="tech.name" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
 import { PropType } from "vue";
 import MyChip from "./Chip.vue";

export default {
    name: "MyProject",
    components: {
        MyChip,
    },
    props: {
        project: {
            type: Object as PropType<SERVER.GithubRepo>,
            default: () => {}
        }
    },
    setup(props) {
        return {
            project: props.project
        }
    },
};
</script>

<style scoped>
.project {
    --aspect-ratio: 16 * 9;
    max-width: 40rem;
    margin: 0 auto;
}
.project-grid {
    display: grid;
    column-gap: 1rem;
    grid-template-areas:
        "title"
        "description"
        "tech";
}
.project-grid__picture {
    grid-area: picture;
}
.project-grid__title {
    grid-area: title;
}
.project-grid__description {
    grid-area: description;
}
.project-grid__tech {
    grid-area: tech;
}
.project__picture {
    position: relative;
    background-color: var(--color-gray-100);
    border-radius: 0.5rem;
    display: block;
    height: auto;
}
.project__picture:before {
    content: "";
    display: block;
    width: 100%;
    padding-top: calc(100% / var(--aspect-ratio));
}
.project__image {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    object-fit: cover;
    font-size: 0;
}
.project__description {
    margin-bottom: 0.5rem;
    color: var(--color-gray-900);
}
.project__repo {
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
}
.project__repo:hover {
    color: var(--color-accent);
}
.project__title:hover {
    color: var(--color-extra);
}
.tech-stack__title {
    margin-bottom: 0.5rem;
}
.tech-list {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    margin-right: -1rem;
    margin-bottom: -0.5rem;
}
.tech-list__item {
    flex: 0 0 auto;
    margin-right: 1rem;
    margin-bottom: 0.5rem;
}
.u-flex {
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;
}
a {
    color: inherit;
}
a:visited {
    color: inherit;
}
</style>

