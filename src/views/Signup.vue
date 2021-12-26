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
            <Input
                v-model="confirmPassword"
                class="login-form__input"
                required
                :pattern="passwordPattern"
                :validation-message="t('passwordsDoNotMatch')"
                label="confirm-password"
                type="password"
            />
            <div class="login-form__row">
                <span>{{ t("iHaveAlreadySignedUp") }}</span><br>
                <router-link to="/login">
                    {{ t("login") }}
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
import { signUp } from "../api/auth.js";
import { passwordPattern } from "../utils/index.js";

export default {
    name: "Login",
    components: {
        Input,
        Button,
    },
    setup(_, { store, router }) {
        const isSignUp = ref(false);
        const email = ref("");
        const password = ref("");
        const confirmPassword = ref("");
        const validationMessage = ref("");

        async function submit() {
            if (password.value === confirmPassword.value) {
                // TODO handle signup result
                try {
                    await signUp(email.value, password.value);
                    store.dispatch("setUser", { user: email });
                    router.push({ name: "root" });
                } catch {
                    // catch
                    // TODO add warning message
                }
            } else {
                validationMessage.value = "";
            }
        }
        return {
            submit,
            isSignUp,
            email,
            password,
            confirmPassword,
            passwordPattern,
            ...useI18n(),
        };
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
