export type RepoType = {
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