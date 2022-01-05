import { BrandGithubIcon, BrandGitlabIcon, BrandTelegramIcon, AtIcon } from "vue-tabler-icons";
import { shallowRef } from "vue";
import { getI18n } from "@/i18n";

const t = getI18n().global.t;

export const contacts = [
    {
        icon: shallowRef(BrandTelegramIcon),
        link: "https://t.me/rawkangaroo",
        name: "telegram",
    },
    {
        icon: shallowRef(AtIcon),
        link: "mailto:asleeppiano@outlook.com",
        name: "asleeppiano@outlook.com",
    },
];

export const socials: Array<APP.Social> = [
    {
        name: "github",
        href: "https://github.com/fourtyone11",
        icon: shallowRef(BrandGithubIcon),
    },
    {
        name: "gitlab",
        href: "https://gitlab.com/asleeppiano",
        icon: shallowRef(BrandGitlabIcon),
    },
];

export const skills = [
    {
        section: t('programmingLanguages'),
        text: `<code class="c-lang c-lang--js">javascript</code> (nodejs, browser), <code class="c-lang c-lang--html">html</code>, <code class="c-lang c-lang--css">css</code>`,
    },
    {
        section: t("frameworks"),
        text: `<code class="c-lang c-lang--vue">vue</code> (использую на текущей работе), <code class="c-lang c-lang--svelte">svelte</code>, <code class="c-lang c-lang--react">react</code>`,
    },
    {
        section: t("rest"),
        list: [
            "git, sql, docker",
            "c, c++, java (использовал в универе)",
            "racket (использую для sicp)",
        ],
    },
];

export const jobs = [
    {
        company: "Кошелек",
        cssClass: "koshelek",
        start: new Date("2020-09-14"),
        // TODO translate description
        descriptionList: [
            "Разработка vue компонентов",
            "Работа с ssr, микросервисной архитектурой",
            "Написание юнит тестов для vue компонентов",
            "Сделал новый раздел на сайте, редактор статей",
        ],
    },
    {
        company: "Розарио",
        cssClass: "rozario",
        start: new Date("2019-11-01"),
        end: new Date("2020-07-01"),
        descriptionList: [
            "Разработка компонентов на svelte",
            "Написание тестов unit/e2e",
            "Разработал почти все компоненты",
            "Валидация форм",
        ],
    },
    {
        company: "Фриланс",
        cssClass: "freelance",
        start: new Date("2019-06-01"),
        end: new Date("2019-11-01"),
        descriptionList: [
            "разработал блог для интернет магазина (react)",
            "верстка html/css, скрипты на js, react.",
        ],
    },
    {
        company: "Севентест",
        cssClass: "seventest",
        start: new Date("2017-08-01"),
        end: new Date("2020-01-01"),
        descriptionList: ["разработка системы мониторинга сетей на с++"],
    },
];

export const education = [
    {
        university: "СПБГУТ",
        cssClass: "bonch",
        image: "",
        start: new Date("2014-09-01"),
        end: new Date("2014-06-29"),
        faculty: "ИКСС",
        program: "Программная инженерия",
    },
];
