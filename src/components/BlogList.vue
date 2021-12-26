<template>
    <ul class="blog-list">
        <li class="blog-list__item" v-for="post in blogList" :key="post.frontMatter.slug">
            <blog-post :post="post.frontMatter" />
        </li>
    </ul>
</template>

<script>
 import { defineComponent } from 'vue';
 import BlogPost from "@/components/BlogPost.vue";

 export default defineComponent({
     name: "BlogList",
     components: {
         BlogPost
     },
     props: {
         blogList: {
             type: Object,
             default: null,
         },
     },
});
</script>

<style lang="postcss" scoped>
 .blog-list {
     &__item:not(:first-of-type) {
         margin-top: 1rem;
     }
 }
</style>
