# Moz GitHub Repos Explorer

A simple Next.js project that fetches and displays repositories from Mozambican GitHub users, highlighting the most popular repositories and the programming languages used.

## Overview

This project is a single-page application that:

1. Fetches the **top 100 Mozambican GitHub users**.
2. Retrieves **all repositories** for each user.
3. Sorts repositories by **stargazers count** (most popular first).
4. Displays a **list of repositories** with details such as name, description, author, stars, and more.
5. In a separate component, fetches and calculates the **languages used across all repositories**, sorted by the number of bytes used (most prevalent first).

## Tech Stack

- **Next.js** with the App Router
- **TypeScript**
- **Tailwind CSS**
- **GitHub API** (using personal access token authorization)
- **React Context** for search and pagination state

## Features

- Displays repositories with essential details:
  - Name
  - Description
  - Author username
  - Author avatar
  - Stars count
  - Repository link
  - Forks count
- Shows the **top languages** used in the fetched repositories, sorted by usage.
- Supports **searching repositories** by name.
- **Pagination**: Display 15 repositories per page.
- Smooth scrolling to top when changing pages.
- Fully responsive layout.

## Usage

1. Clone the repository:

```bash
git clone <your-repo-url>
```

2. Install dependencies:

```bash
npm install
```

3. Add your GitHub token to a `.env.local` file:

```
NEXT_PUBLIC_GITHUB_TOKEN=your_personal_access_token
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure

```
/app
  global.css
  layout.tsx
  page.tsx
  /api
    /repos
      route.ts                # API route fetching users, repos, and sorting
  /components
    Card.tsx              # RepoCard component
    Languages.tsx         # Top languages component
    Nav.tsx               # Page Navigator
    SearchBar.tsx         # Search input component
/context
  SearchContext.tsx       # Context for search & pagination state
/types
  index.ts                # TypeScript types
```

## Notes

- The project uses **token authorization** to avoid low GitHub API rate limits. Make sure your token has `public_repo` access.
- Language data is fetched separately in a component to avoid rate limits and improve initial page load speed.
- Repositories are filtered to show only those with **more than 4 stars** to highlight popular projects.

## Future Improvements

- Add **server-side caching** to reduce GitHub API requests.
- Add **sorting and filtering options** (e.g., stars, forks, recent updates).
- Support **pagination** in API fetch to handle more users or repos.
- Add **light mode** using Tailwind CSS.

---

This project is a great starting point to explore GitHub APIs, React context, and Next.js + TypeScript + Tailwind CSS integration.
