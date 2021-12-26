import { createI18n as _createI18n } from "vue-i18n";

export const langlist = ["ru", "en"];

let instance: any = null;

export function getI18n() {
    if (!instance) {
        instance = createI18n();
    }
    return instance;
}

function createI18n() {
    return _createI18n({
        locale: langlist[0],
        messages: {
            // TODO english translation
            en: {
                welcomeToMyWebsite: "Добро пожаловать на мой сайт",
                myName: "Андрей Парфенов",
                profession: "Разработчик интерфейсов",
                aboutMeTitle: "Обо мне",
                aboutMeText: "Пишу на html, css, javascript, typescript, vuejs",
                blog: "Блог",
                youAreHere: "Вы находитесь здесь",
                emptyHerePleaseReturnLater: "Пусто, возвращайся позже",
                cvTitle: "Андрей Парфенов",
                skills: "Навыки",
                programmingLanguages: "Языки программирования",
                frameworks: "Фреймворки",
                rest: "Остальное",
                contacts: "Контакты",
                education: "Образование",
                jobExperience: "Опыт работы",
                siteDescription: "Привет, это мой сайт",
                home: "главная",
                about: "обо мне",
                cv: "резюме",
                projects: "проекты",
                builtWith: "Сделано с помощью",
                sourceCode: "исходники",
            },
            ru: {
                welcomeToMyWebsite: "Добро пожаловать на мой сайт",
                myName: "Андрей Парфенов",
                profession: "Разработчик интерфейсов",
                aboutMeTitle: "Обо мне",
                aboutMeText: "Пишу на html, css, javascript, typescript, vuejs",
                blog: "Блог",
                youAreHere: "Вы находитесь здесь",
                emptyHerePleaseReturnLater: "Пусто, возвращайся позже",
                cvTitle: "Андрей Парфенов",
                skills: "Навыки",
                programmingLanguages: "Языки программирования",
                frameworks: "Фреймворки",
                rest: "Остальное",
                contacts: "Контакты",
                education: "Образование",
                jobExperience: "Опыт работы",
                siteDescription: "Привет, это мой сайт",
                home: "главная",
                about: "обо мне",
                cv: "резюме",
                projects: "проекты",
                builtWith: "Сделано с помощью",
                sourceCode: "исходники",
            },
        },
    });
}
