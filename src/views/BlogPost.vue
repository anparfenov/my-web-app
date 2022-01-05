<template>
    <div v-if="post && post.frontMatter" class="blogpost">
        <header class="blogpost__header">
            <h1 class="blogpost__title">{{ post.frontMatter.title }}</h1>
            <time class="blogpost__time" :datetime="post.frontMatter.date">{{ formattedTime }}</time>
        </header>
        <div v-html="post.content" class="blogpost__content" />
    </div>
    <div v-else>
        loading...
    </div>
</template>

<script lang="ts">
import { computed, onServerPrefetch } from "vue";
 import { useBlogStore } from "@/stores/blog";
import { useRoute } from "vue-router";
import { format } from "date-fns";

export default {
    name: "BlogPostView",
    setup() {
        const blogStore = useBlogStore();
        const route = useRoute();

        const post = computed(() => blogStore.blogPost);

        const formattedTime = computed(() => {
            return format(new Date(post.value?.frontMatter.date ?? ''), "yyyy-MM-dd");
        });

        onServerPrefetch(() => {
            return blogStore.fetchBlogPost(route.params.slug as string);
        })

        // if blog didn't fetched on server side
        if (!post.value) {
            blogStore.fetchBlogPost(route.params.slug as string);
        }

        return {
            post,
            formattedTime,
        };
    },
};
</script>

<style lang="postcss" scoped>
.blogpost {
    margin: 0 auto;
    max-width: var(--max-blog-width);
    &__header {
        padding: 2rem;
        margin: 0 auto;
        background: var(--gradient-header);
        color: var(--color-text-inv);
        border-radius: 0.25rem;
    }
    &__content {
        margin-top: 1rem;
    }
    &__title {
        color: var(--color-text);
    }
    &__time {
        color: var(--color-text);
        font-family: var(--monospace);
        font-size: var(--text-sm);
    }
}
</style>

<style lang="postcss">
.blogpost {
    &__content {
        padding: 0.25rem;
        /* border: 1px solid var(--color-light-55); */
        a {
            color: var(--color-extra);
            &:visited {
                color: var(--color-wrap);
            }
        }
        strong {
            font-weight: 800;
        }
    }
}
</style>
