import { RepoType } from "@/types";
import { NextResponse } from "next/server";

let cachedRepos: RepoType[] | null = null;
let lastFetchTime = 0;

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get("sort") || "stars";

    if (cachedRepos && (Date.now() - lastFetchTime < CACHE_DURATION)) {
        return NextResponse.json({ repos: sortRepos(cachedRepos, sortBy) });
    }

    const headers = {
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        "User-Agent" : "moz-repo-finder",
    }

    try {
        const response = await fetch("https://api.github.com/search/users?q=location:Mozambique&per_page=200", {
            headers,
            next: { revalidate: CACHE_DURATION * 60 }, 
        });
        
        const data = await response.json();
        
        if (!data || !data.items) {
            throw new Error("Could not fetch users");
        }

        const reposPromises = data.items.map((user: { repos_url: string; login: string }) => 
            fetch(user.repos_url + "?per_page=200", { headers })
                .then(res => res.json())
                .catch(err => {
                    console.error(`Failed to fetch repos for user ${user.login}:`, err);
                    return [];
                })
        )

        const reposData = await Promise.all(reposPromises);

        const allRepos = reposData.flat().filter((repo: RepoType) => repo.stargazers_count > 4);
    
        if (allRepos.length === 0) {
            return NextResponse.json({ repos: [] });
        }
        
        allRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        cachedRepos = allRepos;
        lastFetchTime = Date.now();

        return NextResponse.json({ repos: allRepos });

    } catch (error) {
            console.error("Failed to fetch repos:", error);
            
            return NextResponse.json({ repos: [], error: "Failed to fetch repositories" }, { status: 500 });
    }
}


function sortRepos(repos: RepoType[], sortBy: string) {
    if ( sortBy === "forks") {
        return repos.sort((a, b) => b.forks_count - a.forks_count);
    }

    if (sortBy === "updated") {
        return repos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    }

    return repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
}