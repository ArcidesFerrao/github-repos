import { NextResponse } from "next/server";


export async function GET() {
    const headers = {
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        "User-Agent" : "moz-repo-finder",
    }

    const response = await fetch("https://api.github.com/search/users?q=location:Mozambique&per_page=100", {
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
    };

    type Repo = {
        id: number;
        name: string;
        full_name: string;
        html_url: string;
        description: string | null;
        stargazers_count: number;
        login: string; // Added to include user name
        avatar: string; // Added to include user avatar
        forks: number; // Added to include forks count
        language?: string; // Optional language field
    };
    let repos: Repo[] = [];
    for (const user of data.items) {
        const reposResponse = await fetch(user.repos_url + "?per_page=100", { headers });
        const userRepos = await reposResponse.json();
        repos = repos.concat(userRepos.map((repo: RepoType ) => ({
            ...repo,
            login: repo.owner.login, // Include user name in each repo object
            avatar: repo.owner.avatar_url, 
            forks: repo.forks_count,
            language: repo.language,

        })));    
        
    }
    repos = repos.filter((repo) => repo.stargazers_count > 4); // Filter out repos with no stars
    // console.log(repos[0]);
    // console.log(repos.length);
    const languageCount: Record<string, number> = {};

    repos.forEach((repo) => {
        if (repo.language) {
            languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
        }
    }); 
    const topLanguages = Object.entries(languageCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([language, count]) => ({ language, count }));
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

    return NextResponse.json({ repos, topLanguages });
}