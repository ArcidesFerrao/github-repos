import { NextRequest } from "next/server";

type Repo = {
  id: number;
  languages_url: string; // URL to fetch languages
};


export async function GET(request: NextRequest) {
    const languageUrl = request.nextUrl.searchParams.get("url");
    if (!languageUrl) {
        return new Response("Missing 'url' query parameter", { status: 400 });
    }

    const headers = {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "User-Agent" : "moz-repo-finder",
        Accept: "application/vnd.github+json"
    }

    try {
        const response = await fetch(languageUrl, { headers, next: { revalidate: 60 * 60 * 24 } } );
        if (!response.ok) {
            throw new Error(`GitHub API responded with status ${response.status}`);
        };
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error("Failed to fetch languages:", error);
        return new Response("Failed to fetch languages", { status: 500 });
    }
}


export async function POST(request: NextRequest) {
    const { repos }: { repos: Repo[]} = await request.json();

    if (!repos || !repos.length) {
        return new Response(JSON.stringify({ languages: [] }));
    }

    const headers = {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "User-Agent" : "moz-repo-finder",
        Accept: "application/vnd.github+json"
    };
    const languageCount: Record<string, number> = {};

    await Promise.all(
        repos.map(async (repo) => {
          try {
            const response = await fetch(
              repo.languages_url, {headers}
            );
            const data = await response.json();

            for (const [lang, bytes] of Object.entries(data)) {
              languageCount[lang] =
                (languageCount[lang] || 0) + (bytes as number);
            }
          } catch (error) {
            console.error(
              `Failed to fetch languages for repo ${repo.id}:`,
              error
            );
          }
        })
      );

      const sortedLanguages = Object.entries(languageCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([language, bytes]) => ({ language, bytes }));

        return new Response(JSON.stringify({ languages: sortedLanguages }), { status: 200 });
}


export const revalidate = 60 * 60 * 24; // 24 hours