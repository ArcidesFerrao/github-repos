import React from "react";

export default function AboutPage() {
  return (
    <article className="p-10 ">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            About This Project
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            This project is a simple web application that lists the most starred
            Mozambican GitHub repositories.
          </p>
        </div>

        {/* What is RepoExplorer */}
        <section className="rounded-md p-6 border-gray-600 border">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4 flex items-center gap-2">
            {/* <Github className="w-6 h-6" /> */}
            <span className="line-md--github-loop"></span>
            What is Repo Explorer?
          </h2>
          <p className="text-gray-200 leading-relaxed">
            Repo Explorer is a curated platform that showcases the most starred
            GitHub repositories across different programming languages. Our
            mission is to help developers discover trending projects, learn from
            popular codebases, and stay updated with the latest developments in
            the open-source community.
          </p>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-200 mb-6">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex  gap-4 p-4 border-gray-600 border rounded-lg hover:shadow-md transition-shadow">
              {/* <Star className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" /> */}
              <span className="line-md--star-filled"></span>
              <div>
                <h3 className="font-semibold text-gray-200 mb-2">
                  Star-Based Sorting
                </h3>
                <p className="text-gray-200 text-sm">
                  Sort repositories by their GitHub star count to discover the
                  most popular projects in the community.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border-gray-600 border rounded-lg hover:shadow-md transition-shadow">
              {/* <GitFork className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" /> */}
              <span className="fa--code-fork"></span>
              <div>
                <h3 className="font-semibold text-gray-200 mb-2">
                  Fork Analysis
                </h3>
                <p className="text-gray-200 text-sm">
                  View repositories sorted by fork count to find projects with
                  active community contributions.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border-gray-600 border rounded-lg hover:shadow-md transition-shadow">
              {/* <Clock className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" /> */}
              <span className="tabler--clock-filled"></span>
              <div>
                <h3 className="font-semibold text-gray-200 mb-2">
                  Recently Updated
                </h3>
                <p className="text-gray-200 text-sm">
                  Stay current with actively maintained projects by sorting
                  repositories by their last update date.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border-gray-600 border rounded-lg hover:shadow-md transition-shadow">
              {/* <Search className="w-8 h-8 text-purple-500 flex-shrink-0 mt-1" /> */}
              <span className="line-md--search-filled"></span>
              <div>
                <h3 className="font-semibent text-gray-200 mb-2">
                  Smart Search
                </h3>
                <p className="text-gray-200 text-sm">
                  Quickly find specific repositories using our real-time search
                  functionality across repository names.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border-gray-600 border rounded-lg hover:shadow-md transition-shadow">
              {/* <BarChart3 className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" /> */}
              <span className="tdesign--chart"></span>
              <div>
                <h3 className="font-semibold text-gray-200 mb-2">
                  Language Analytics
                </h3>
                <p className="text-gray-200 text-sm">
                  Explore programming language distribution and trends across
                  the most popular repositories.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border-gray-600 border rounded-lg hover:shadow-md transition-shadow">
              <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-bold">15</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-200 mb-2">
                  Paginated Browse
                </h3>
                <p className="text-gray-200 text-sm">
                  Browse through repositories with clean pagination (15 per
                  page) for an optimal viewing experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className=" rounded-lg p-6 border-gray-600 border">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">
            How It Works
          </h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                1
              </div>
              <p className="text-gray-200">
                We continuously fetch data from GitHub&apos;s API to maintain an
                up-to-date collection of repositories.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                2
              </div>
              <p className="text-gray-200">
                Our algorithms analyze repository metrics including stars,
                forks, and last update timestamps.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                3
              </div>
              <p className="text-gray-200">
                The data is presented through an intuitive interface with
                real-time search and multiple sorting options.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                4
              </div>
              <p className="text-gray-200">
                Language analytics provide insights into technology trends and
                popularity across the developer community.
              </p>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">
            Perfect For
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4  rounded-lg border-gray-600 border">
              <div className="text-2xl mb-2">👨‍💻</div>
              <h3 className="font-semibold text-gray-200 mb-2">Developers</h3>
              <p className="text-gray-200 text-sm">
                Discover new tools, libraries, and frameworks to enhance your
                projects.
              </p>
            </div>
            <div className="text-center p-4  rounded-lg border-gray-600 border">
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="font-semibold text-gray-200 mb-2">Students</h3>
              <p className="text-gray-200 text-sm">
                Learn from high-quality codebases and contribute to open-source
                projects.
              </p>
            </div>
            <div className="text-center p-4  rounded-lg border-gray-600 border">
              <div className="text-2xl mb-2">🏢</div>
              <h3 className="font-semibold text-gray-200 mb-2">Tech Teams</h3>
              <p className="text-gray-200 text-sm">
                Research popular solutions and evaluate technologies for your
                next project.
              </p>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">
            Built With
          </h2>
          <div className="rounded-lg p-6 border-gray-600 border">
            <div className="grid md:grid-cols-2 gap-4 text-sm ">
              <div>
                <h4 className="font-semibold text-gray-200 mb-2">Frontend</h4>
                <ul className="text-gray-200 space-y-1">
                  <li>• Next.js with React</li>
                  <li>• TypeScript for type safety</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Lucide React for icons</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-200 mb-2">Features</h4>
                <ul className="text-gray-200 space-y-1">
                  <li>• Server-side rendering</li>
                  <li>• Real-time search</li>
                  <li>• Responsive design</li>
                  <li>• GitHub API integration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
