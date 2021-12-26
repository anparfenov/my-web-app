<template>
    <div>
        <form class="login-form" @submit.prevent="submit">
            <Input
                v-model="email"
                class="login-form__input"
                required
                :validation-message="t('invalidEmail')"
                label="email"
                type="email"
            />
            <Input
                v-model="password"
                class="login-form__input"
                required
                :pattern="passwordPattern"
                :validation-message="t('invalidPassword')"
                label="password"
                type="password"
            />
            <div class="login-form__row">
                <span>{{ t("iDoNotHaveAnAccount") }}</span><br>
                <router-link to="/signup">
                    {{ t("signup") }}
                </router-link>
            </div>
            <div class="login-form__row">
                <Button class="login-form__button">
                    Login
                </Button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import { logIn } from "../api/auth.js";

export default {
    name: "LoginView",
    components: {
        Input,
        Button,
    },
    setup(_, { store, router }) {
        const email = ref("");
        const password = ref("");
        // must include one number, lowercase char, uppercase char. Length of string 8-30 chars
        const passwordPattern = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}";

        async function submit() {
            try {
                await logIn(email.value, password.value);
                store.dispatch("setUser", { user: email });
                router.push({ name: "root" });
            } catch {
                // catch
            }
        }
        return { email, password, submit, passwordPattern, ...useI18n() };
    },
};
</script>

<style scoped>
.login-form {
    max-width: 26rem;
    margin: 0 auto;
}
.login-form__input:not(:first-of-type) {
    margin-top: 0.5rem;
}
.login-form__row {
    margin: 1rem auto 0 auto;
    text-align: center;
}
.login-form__button {
    width: 100%;
}
</style>
