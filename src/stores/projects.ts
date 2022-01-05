import { defineStore } from "pinia";
import * as projectsApi from '@/api/projects';

const STORAGE_ID = 'andreypafenov.com_projects_storage_item';

export const useProjectsStore = defineStore('projects', {
    state: (): PROJECTS.ProjectsState => {
        return {
            projects: null,
            error: null
        };
    },
    actions: {
        async fetchAllProjects() {
            try {
                this.projects = await projectsApi.fetchGithubProjects();
                this.cacheProjectsToStorage();
                this.error = null;
            } catch (e: any) {
                this.error = e;
            }
        },
        cacheProjectsToStorage() {
            try {
                const now = new Date();
                now.setDate(now.getDate() + 1);
                const projectsMeta = { projects: this.projects, _ttl: now.getTime() };
                localStorage.setItem(STORAGE_ID, JSON.stringify(projectsMeta));
                this.error = null;
            } catch (e: any) {
                this.error = e;
            }
        },
        trySetProjectsFromStorage() {
            try {
                const json = localStorage.getItem(STORAGE_ID);
                if (json) {
                    const projectsMeta = JSON.parse(json);
                    const ttl = new Date(projectsMeta._ttl);
                    if (ttl.getTime() > Date.now()) {
                        this.projects = projectsMeta.projects;
                        this.error = null;
                    } else {
                        this.removeProjectsFromStorage();
                        this.fetchAllProjects();
                    }
                } else {
                    this.fetchAllProjects();
                }
            } catch (e: any) {
                this.error = e;
            }
        },
        removeProjectsFromStorage() {
            localStorage.removeItem(STORAGE_ID);
        }
    },
});
