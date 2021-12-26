export type Social = {
    name: string;
    href: string;
    icon: any;
};

type Project = {
    id: number;
    name: string;
    description: string;
    repo: {
        name: string;
        icon: unknown;
    };
    tech: {
        name: string;
        link: string;
    }
}

type Translation<T> = {
    en: T,
    ru: T
}

type Error = {
    status: string;
}

export as namespace APP;
