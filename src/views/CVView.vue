<template>
    <div>
        <my-cv
            v-if="jobs && skills"
            :education="education"
            :jobs="jobs"
            :skills="skills"
            :socials="socials"
            :contacts="contacts"
        />
        <div v-else>no cv</div>
    </div>
</template>

<script>
import { ref } from "vue";

import MyCv from "@/components/CV.vue";
 import { socials, skills, contacts, education, jobs } from '@/config';

export default {
    name: "CVView",
    components: {
        MyCv,
    },
    setup() {
        const educationRef = ref(education);
        const jobsRef = ref(jobs);
        const skillsRef = ref(skills);
        const socialsRef = ref(socials);
        const contactsRef = ref(contacts);

        return {
            education: educationRef,
            jobs: jobsRef,
            skills: skillsRef,
            socials: socialsRef,
            contacts: contactsRef
        };
    },
};
</script>

<style scoped>

</style>

