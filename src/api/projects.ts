import { HttpClient } from '@/api/http';
import { projects } from '@/config/projects';
import { isRight } from 'fp-ts/Either';

const GITHUB_API_URL = 'https://api.github.com';
const client = new HttpClient('axios');

function isGithubRepo(repo: PROJECTS.GithubRepo | unknown): repo is PROJECTS.GithubRepo {
    return (repo as PROJECTS.GithubRepo).stargazers_count !== undefined;
}

function createTech(languages: any): Array<PROJECTS.Tech> {
    return Object.keys(languages).map((lang) => ({
        name: lang.toLowerCase()
    }))
}

function adaptGithubRepo(repo: PROJECTS.GithubRepo) {
    return {
        id: repo.id,
        name: repo.name,
        tech: createTech(repo.languages),
        description: repo.description,
        forks: repo.forks,
        stars: repo.stargazers_count
    }
}

function adaptToRepoStructure(repos: Array<PROJECTS.GithubRepo>): Array<PROJECTS.RepoStructure> {
    return repos.map((repo) => {
        if (isGithubRepo(repo)) {
            return adaptGithubRepo(repo)
        }
        return repo;
    });
}

export async function fetchGithubProjects(): Promise<Array<PROJECTS.RepoStructure>> {
    console.log('fetchAllProjects');
    const repos = await client.url(`${GITHUB_API_URL}/users/moody-person/repos`).read<PROJECTS.GithubRepo[]>();

    if (isRight(repos)) {
        console.log('repos', repos);
        const filteredRepos = repos.right.filter((repo) => projects.some((project) => repo.name === project.name && project.host === 'github'))
        const langPromises = [];
        for (let repo of filteredRepos) {
            const langPromise = client.url(repo.languages_url).read<PROJECTS.GithubRepo[]>();
            langPromises.push(langPromise);
        }
        const languages = await Promise.all(langPromises);
        const res = filteredRepos.map((repo, i) => ({ ...repo, languages: isRight(languages[i]) ? languages[i].right : [] }));
        console.log('projects', res);
        return adaptToRepoStructure(res);
    }

    return [];
}
