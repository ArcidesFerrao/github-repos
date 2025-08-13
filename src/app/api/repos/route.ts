import { RepoType } from "@/types";
import { NextResponse } from "next/server";

let cachedRepos: RepoType[] | null = null;
let lastFetchTime = 0;

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function GET() {

    if (cachedRepos && (Date.now() - lastFetchTime < CACHE_DURATION)) {
        return NextResponse.json({ repos: cachedRepos });
    }

    const headers = {
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        "User-Agent" : "moz-repo-finder",
    }

    try {

        const response = await fetch("https://api.github.com/search/users?q=location:Mozambique&per_page=150", {
            headers,
            next: { revalidate: CACHE_DURATION * 60 }, 
        });
        
        const data = await response.json();
        
        if (!data || !data.items) {
            throw new Error("Could not fetch users");
        }

        const reposPromises = data.items.map((user: { repos_url: string; login: string }) => 
            fetch(user.repos_url, { headers })
                .then(res => res.json())
                .catch(err => {
                    console.error(`Failed to fetch repos for user ${user.login}:`, err);
                    return [];
                })
        )

    const reposData = await Promise.all(reposPromises);

    const allRepos = reposData.flat().filter((repo: RepoType) => repo.stargazers_count > 4);
    
    // let repos: RepoType[] = [];
    
    // for (const user of data.items) {
    //     const reposResponse = await fetch(user.repos_url + "?per_page=100", { headers });
    //     const userRepos = await reposResponse.json();
        
    //     if (Array.isArray(userRepos)) {
    //         repos = repos.concat(
    //             userRepos.map((repo: RepoType) => ({
    //                 ...repo,
    //                 login: repo.owner.login,
    //                 avatar: repo.owner.avatar_url,
    //             }))
    //         );
    //     } 
    // }
    
    // repos = repos.filter((repo) => repo.stargazers_count > 4); // Filter out repos with no stars
    // console.log(repos[0]);
    // console.log(repos.length);
    
    allRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    cachedRepos = allRepos;
    lastFetchTime = Date.now();
    return NextResponse.json({ allRepos });
} catch (error) {
        console.error("Failed to fetch repos:", error);
        return NextResponse.json({ error: "Failed to fetch repositories" }, { status: 500 });
    }
}