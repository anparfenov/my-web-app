<template>
    <div class="cv">
        <div class="o-top-container">
            <h1 class="cv__name">{{ t("cvTitle") }}</h1>
            <custom-link
                type="underline"
                class="cv__download"
                to="/static/cv_ru_andrey_parfenov.pdf"
            >
                <file-download-icon class="cv__download-icon" size="20" />
                pdf
            </custom-link>
        </div>
        <p class="cv__profession">{{ t("profession") }}</p>
        <div class="cv__contacts">
            <ul class="contacts">
                <li
                    v-for="contact in contacts"
                    :key="contact.name"
                    class="contacts__item"
                >
                    <component :is="contact.icon" class="contacts__icon" />
                    <custom-link
                        type="underline"
                        class="contacts__link"
                        :external="true"
                        :to="contact.link"
                    >{{ contact.name }}
                    </custom-link>
                </li>
            </ul>
        </div>
        <section class="cv__skills o-section">
            <h2 class="cv__header">{{ t("skills") }}</h2>
            <ul class="skills cv-list u-mt-8">
                <li
                    v-for="skill in skills"
                    :key="skill.name"
                    class="skills__item cv-list__item"
                >
                    <h3>{{ skill.section }}</h3>
                    <div v-if="skill.text" v-html="skill.text"></div>
                    <ul v-else-if="skill.list" class="cv-inner-list">
                        <li
                            class="skills__item"
                            v-for="item in skill.list"
                            :key="item"
                        >
                            {{ item }}
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
        <section class="cv__experience o-section">
            <h2 class="cv__header">{{ t("jobExperience") }}</h2>
            <ul class="experience cv-list u-mt-8">
                <li
                    v-for="job in jobs"
                    :key="job"
                    class="experience__item cv-list__item"
                >
                    <h3
                        :class="getTitleClass(job.cssClass)"
                        class="cv-list__title"
                    >
                        {{ job.company }}
                    </h3>
                    <div class="date-wrapper">
                        <time class="c-time" :datetime="job.start">{{
                            formatDate(job.start)
                        }}</time
                        ><span>&nbsp;-&nbsp;</span>
                        <time class="c-time" :datetime="job.end">{{
                            formatDate(job.end, "end")
                        }}</time>
                    </div>
                    <ul class="job__description cv-inner-list">
                        <li v-for="desc in job.descriptionList" :key="desc">
                            {{ desc }}
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
        <section class="cv__education o-section">
            <h2 class="cv__header">{{ t("education") }}</h2>
            <ul class="education u-mt-8">
                <li
                    v-for="(uni, index) in education"
                    :key="index"
                    class="education__item cv-list__item--uni"
                >
                    <div class="o-first">
                        <picture>
                            <img
                                :src="getUniImageLink(uni.image)"
                                alt="university"
                                class="education__image"
                            />
                        </picture>
                    </div>
                    <div class="o-second">
                        <h3
                            :class="getTitleClass(uni.cssClass)"
                            class="cv-list__title"
                        >
                            {{ uni.university }}
                        </h3>
                        <div class="date-wrapper">
                            <time class="c-time" :datetime="uni.start">{{
                                formatDate(uni.start)
                            }}</time
                            ><span>&nbsp;-&nbsp;</span>
                            <time class="c-time" :datetime="uni.end">{{
                                formatDate(uni.end, "end")
                            }}</time>
                        </div>
                        <div>
                            <span>{{ uni.faculty }}</span
                            >,&nbsp;<span>{{ uni.program }}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import { isToday, format } from "date-fns";
import { FileDownloadIcon } from "vue-tabler-icons";
import CustomLink from "@/components/CustomLink.vue";

 // TODO i will use static folder for images
import { CMS_URL } from "@/config";

export default {
    name: "MyCv",
    components: {
        CustomLink,
        FileDownloadIcon,
    },
    props: {
        education: {
            type: Array,
            default: () => [],
        },
        jobs: {
            type: Array,
            default: () => [],
        },
        skills: {
            type: Array,
            default: () => [],
        },
        socials: {
            type: Array,
            default: () => [],
        },
        contacts: {
            type: Array,
            default: () => [],
        },
    },
    setup() {
        function getUniImageLink(image: string) {
            return `${CMS_URL}/assets/${image}`;
        }

        function formatDate(date = new Date(), type = "start") {
            if (type === "end" && isToday(new Date(date))) {
                return "Настоящее время";
            }
            return format(new Date(date), "dd/MM/yyyy");
        }

        function getTitleClass(cssClass: string) {
            if (cssClass) {
                const cssClassPrefix = "cv-list__title";
                return `${cssClassPrefix}--${cssClass}`;
            }
            return "";
        }

        return {
            ...useI18n(),
            formatDate,
            getUniImageLink,
            getTitleClass,
        };
    },
};
</script>

<style lang="postcss" scoped>
.cv {
    &__download-icon {
        vertical-align: middle;
    }
    &__header {
        margin-bottom: 0.5rem;
    }
    &__profession {
        margin-bottom: 0.5rem;
        font-size: var(--text-lg);
    }
    &__contacts {
        .contacts {
            display: flex;
            &__item {
                display: flex;
                align-items: center;
            }
            &__item:not(:first-of-type) {
                margin-left: 1rem;
            }
            &__icon {
                width: 1.25rem;
                width: 1.25rem;
                margin-right: 0.25rem;
            }
        }
    }
    &__experience {
        .experience {
            &__item:not(:first-of-type) {
                margin-top: 0.5rem;
            }
            &__date {
                font-size: var(--text-sm);
            }
        }
        .job {
            &__description {
                color: black;
                ul {
                    list-style-type: disc;
                }
            }
        }
    }
    &__link {
        color: var(--color-extra);
        position: relative;
        &:visited {
            color: var(--color-super-extra);
        }
        &:after {
            content: "";
            position: absolute;
            left: 0;
            display: inline-block;
            height: 1em;
            width: 100%;
            border-bottom: 1px solid;
            margin-top: 10px;
            opacity: 0;
            -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
            transition: opacity 0.35s, transform 0.35s;
            -webkit-transform: scale(0, 1);
            transform: scale(0, 1);
        }
        &:hover {
            &:after {
                opacity: 1;
                -webkit-transform: scale(1);
                transform: scale(1);
            }
        }
    }
    &__education {
        .education {
            &__item {
                display: flex;
            }
            &__image {
                border-radius: 0.25rem;
                max-width: 18rem;
                font-size: 0;
            }
            &__date {
                font-size: var(--text-sm);
            }
        }
    }
}
.o-top-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.o-section {
    margin-top: 1rem;
}
.cv-list {
    padding-left: 1.5rem;
    list-style-type: circle;
    &__title {
        margin-bottom: 0.5rem;
        &--koshelek {
            color: hsl(221, 98%, 49%);
        }
        &--rozario {
            color: hsl(349, 100%, 62%);
        }
        &--seventest {
            color: #ab250c;
        }
        &--spbgut,
        &--bonch {
            color: hsl(28, 91%, 54%);
        }
    }
    &__item {
        margin-bottom: 0.5rem;
        &--uni {
            &:hover .cv-list__title {
                text-decoration: underline;
            }
        }
        &:hover {
            list-style-type: disc;
        }
    }
}

 .cv-inner-list {
     padding-left: 1rem;
     list-style-type: '- ';
 }

.u-mt-8 {
    margin-top: 0.5rem;
}
.o-first {
    margin-right: 1rem;
}

.c-time {
    font-family: var(--monospace);
}
.date-wrapper {
    margin-bottom: 0.25rem;
}
</style>

<style lang="postcss">
.c-lang {
    font-family: var(--sans-serif);
    padding: 0.1rem 0.2rem;
    border-radius: 0.25rem;
    word-break: normal;

    &--js {
        background: #f7df1e;
    }
    &--html {
        background: #dd4a24;
        color: white;
    }
    &--css {
        background: #196fb4;
        color: white;
    }
    &--vue {
        background: #41b883;
        color: white;
    }
    &--svelte {
        background: #f73c00;
        color: white;
    }
    &--react {
        background: #61dafb;
        color: black;
    }
}
</style>
