<template>
    <div class="post grid">
        <div class="grid__title">
            <router-link class="post__link" :to="currentPost.url">
                <h2 class="post__title">
                    {{ currentPost.title }}
                </h2>
            </router-link>
        </div>
        <time class="grid__date" :datetime="currentPost.date">
            {{ currentPost.date }}
        </time>
        <div class="post__tag-list grid__tags">
            <custom-link
                v-for="tag in currentPost.tags"
                type="big"
                :key="tag.name"
                :to="makeTagsUrl(tag)"
            >
                {{ tag }}
            </custom-link>
        </div>
        <figure v-if="currentPost.image" class="post__figure grid__image">
            <picture class="post__picture">
                <a :href="currentPost.url">
                    <img
                        class="post__image"
                        :src="currentPost.img"
                        alt="blogpost thumbnail"
                    />
                </a>
                <figcaption v-if="currentPost.imgAuthor" class="c-picture__caption">
                    Photo by
                    <a :href="currentPost.imgAuthor.link">{{ currentPost.imgAuthor.name }}</a>
                </figcaption>
            </picture>
        </figure>
    </div>
</template>

<script lang="ts">
 import { format } from 'date-fns';
import { defineComponent, PropType } from "vue";
import { makeBlogUrl, makeTagsUrl } from "@/utils";
 import CustomLink from '@/components/CustomLink.vue';

export default defineComponent({
    name: "BlogPost",
    components: {
        CustomLink
    },
    props: {
        post: {
            type: Object as PropType<BLOG.FrontMatter>,
        },
    },
    setup(props) {
        const currentPost = {
            ...props.post,
            url: makeBlogUrl(props?.post?.slug ?? ''),
            date: format(new Date(props?.post?.date ?? ''), 'yyyy-MM-dd'),
            tags: props?.post?.tags?.map((tag) => ({
                name: tag,
                url: makeTagsUrl(tag),
            })),
        };
        return { currentPost };
    },
});
</script>

<style lang="postcss">
.post {
    padding: 1rem;
    margin: 0 auto;
    border-radius: 0.5rem;
    font-size: var(--text-lg);
    border: 1px solid var(--color-border);
    transition: box-shadow 0.5s ease;
    /* box-shadow: 2px 2px 10px var(--color-gray-100), 2px -2px 10px var(--color-gray-100); */

    &:not(:first-of-type) {
        margin-top: 1rem;
    }

    &:hover {
        box-shadow: 8px 8px 0px var(--color-gray-300),
            -8px -8px 0px var(--color-accent);
    }
    &__title {
        color: var(--color-text);
        &:hover {
            color: var(--color-extra);
        }
    }

    &__date {
        font-family: var(--monospace);
        font-size: var(--text-sm);
        display: block;
    }

    &__link {
        font-weight: 800;
        margin-bottom: 0.25rem;
        display: block;
        color: var(--color-text);
        &:visited {
            color: var(--color-text);
        }
    }

    &__figure {
        height: 10rem;
        margin-left: 0.25rem;
    }

    &__tag {
        font-size: var(--text-sm);
        &--active {
            cursor: default;
            background: var(--color-text);
            color: var(--color-text-inv);
            &:visited {
                background: var(--color-text);
                color: var(--color-text-inv);
            }
        }
    }
}
.grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
        "title title"
        "date tags";

    &--image {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 2fr 1fr;
        grid-template-areas:
            "title image"
            "date image"
            "tags image";
    }

    &__tags {
        grid-area: tags;
        align-self: flex-end;
        justify-self: flex-end;
    }

    &--image &__tags {
        grid-area: tags;
        align-self: flex-end;
    }

    &__title {
        grid-area: title;
    }

    &__date {
        align-self: flex-end;
        grid-area: date;
    }

    &--image &__date {
        grid-area: date;
    }

    &__image {
        grid-area: image;
    }
}
</style>
