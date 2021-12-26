import {
    createRouter,
    createWebHistory,
    createMemoryHistory,
    RouteRecordRaw
} from "vue-router";

import { useHeadStore } from '@/stores/head';

export const routes: Array<RouteRecordRaw> = [
    { path: "/", redirect: { name: "home" }, meta: { title: "home" } },
    {
        path: "/root",
        name: "root",
        component: () => import("../views/Root.vue"),
        meta: { title: "root" },
    },
    {
        path: "/home",
        name: "home",
        component: () => import("../views/Home.vue"),
        meta: { title: "home" },
    },
    {
        path: "/about",
        name: "about",
        component: () => import("../views/About.vue"),
        meta: { title: "about" },
    },
    {
        path: "/about/cv",
        name: "cv",
        component: () => import("../views/CVView.vue"),
        meta: { title: "cv" },
    },
    {
        path: "/projects",
        name: "projects",
        component: () => import("../views/Projects.vue"),
        meta: { title: "projects" },
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("../views/NotFound.vue"),
        meta: { title: "404" },
    },
    {
        path: "/blog",
        name: "blog",
        component: () => import("../views/Blog.vue"),
        meta: { title: "404" },
    },
    {
        path: "/blog/:slug+",
        name: "blogpost",
        component: () => import("../views/BlogPost.vue"),
        meta: { title: ":slug" },
    },
];

export const router = createRouter({
    history: import.meta.env.SSR
        ? createMemoryHistory()
        : createWebHistory(),
    routes,
});

router.beforeEach((guard) => {
    const headStore = useHeadStore();
    headStore.updateHeadElement(guard.fullPath);
});

export function getRouter() {
    return router;
}
