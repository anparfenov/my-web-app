<template>
    <div class="projects">
        <ul v-if="projects" class="projects-list">
            <li v-for="project in projects" :key="project.name" class="projects-list__item">
                <my-project :project="project"/>
            </li>
        </ul>
        <div v-else-if="error">
            sorry, no projects yet
        </div>
        <div v-else>
            ...Loading
        </div>
    </div>
</template>

<script>
 import { computed } from 'vue';
 import { useProjectsStore } from "@/stores/projects";
 import MyProject from "../components/Project.vue";

export default {
    name: "ProjectsView",
    components: {
        MyProject,
    },
    setup() {
        const projectsStore = useProjectsStore();
        const projects = computed(() => projectsStore.projects);
        const error = computed(() => projectsStore.error);

        if (!projects.value) {
            projectsStore.trySetProjectsFromStorage();
        }

        return {
            projects,
            error
        };
    },
};
</script>

<style scoped>
.projects-list__item:not(:first-of-type) {
    margin-top: 1rem;
}
</style>

