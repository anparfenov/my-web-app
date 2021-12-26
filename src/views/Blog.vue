<template>
    <div class="blog">
        <h1 class="blog__title">{{ t('blog') }}</h1>
        <blog-list v-if="blogList && blogList.length > 0" :blog-list="blogList" />
        <div v-else-if="blogList && blogList.length === 0">
            Нет статей
        </div>
        <div v-else-if="error">
            {{ error }}
        </div>
        <div v-else>
            ...Loading
        </div>
    </div>
</template>

<script>
import { defineComponent, computed, onServerPrefetch } from "vue";
import { useI18n } from "vue-i18n";
import { useBlogStore } from "@/stores/blog";
import BlogList from "@/components/BlogList.vue";

export default defineComponent({
    name: "BlogView",
    components: {
        BlogList,
    },
    setup() {
        const blogStore = useBlogStore();

        const blogList = computed(() => blogStore.blogList);
        const error = computed(() => blogStore.error);

        onServerPrefetch(() => {
            return blogStore.fetchAllBlogPosts();
        })

        if (!blogList.value) {
            blogStore.fetchAllBlogPosts()
        }

        return { blogList, error, ...useI18n() };
    },
});
</script>

<style lang="postcss" scoped>
 .blog {
     padding: 0 1rem;
     &__title {
         margin-bottom: 1rem;
     }
 }
</style>
