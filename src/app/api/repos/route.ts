import { NextResponse } from "next/server";


export async function GET() {
    const headers = {
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        "User-Agent" : "moz-repo-finder",
    }

    const response = await fetch("https://api.github.com/search/users?q=location:Mozambique&per_page=150", {
        headers,
    });

    const data = await response.json();

    type RepoType = {
        id: number;
        name: string;
        full_name: string;
        html_url: string;
        description: string | null;
        stargazers_count: number;
        owner: {
            login: string; // User name
            avatar_url: string; // User avatar URL
        };
        forks_count: number; // Forks count
        language?: string; // Optional language field
        languages_url: string; // Optional URL to fetch languages

    };

    let repos: RepoType[] = [];

    for (const user of data.items) {
        const reposResponse = await fetch(user.repos_url + "?per_page=100", { headers });
        const userRepos = await reposResponse.json();

        if (Array.isArray(userRepos)) {
            repos = repos.concat(
                userRepos.map((repo: RepoType) => ({
                    ...repo,
                    login: repo.owner.login,
                    avatar: repo.owner.avatar_url,
                }))
            );
        } 
    }
    
    repos = repos.filter((repo) => repo.stargazers_count > 4); // Filter out repos with no stars
    // console.log(repos[0]);
    // console.log(repos.length);
    
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

    return NextResponse.json({ repos });
}