export type GithubRepo = {
    id: number;
    name: string;
    description: string;
    forks: number;
    stargazers_count: number;
    url: string;
    html_url: string;
    languages_url: string;
    languages?: Array<string>; // use it for downloaded lanugages
};

export type Tech = {
    name: string;
    url?: string;
};

export type RepoStructure = {
    id: number;
    name: string;
    tech: Array<Tech>;
    description: string;
    forks: number;
    stars: number;
};

export type ProjectsState = {
    projects: Array<RepoStructure> | null;
    error: Error | null;
};

export as namespace PROJECTS;
