
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Search } from "lucide-react";
import { blogCategories, blogPosts } from "@/lib/blog";

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;

      const searchText =
        `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();

      return matchesCategory && searchText.includes(search.toLowerCase());
    });
  }, [search, activeCategory]);

  return (
    <main className="min-h-screen bg-[#081522] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-24 md:py-32">
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-teal-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Insights & Resources
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Ideas that move your business{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">
              forward.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
            Explore insights, practical guidance and the latest thinking
            around technology, cybersecurity and smarter business operations.
          </p>
        </div>
      </section>

      {/* Blog listing */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                Our latest articles
              </p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                Explore our blog
              </h2>
            </div>

            <div className="relative w-full lg:max-w-sm">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-xl border border-white/10 bg-[#101f2e] py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-10 flex flex-wrap gap-3">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                  activeCategory === category
                    ? "border-cyan-400 bg-cyan-400 text-[#081522]"
                    : "border-white/10 bg-[#101f2e] text-slate-300 hover:border-cyan-400 hover:text-cyan-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Cards */}
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#101f2e] transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-5 top-5 rounded-full border border-cyan-300/20 bg-[#081522]/90 px-4 py-2 text-xs font-semibold text-cyan-300">
                        {post.category}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-2">
                        <CalendarDays size={14} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock3 size={14} />
                        {post.readTime}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-bold leading-snug transition group-hover:text-cyan-300">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="mt-4 text-sm leading-7 text-slate-400">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition hover:gap-3"
                    >
                      Read article <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#101f2e] px-6 py-16 text-center">
              <h3 className="text-xl font-semibold">No articles found</h3>
              <p className="mt-2 text-slate-400">
                Try another search term or category.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-5 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-[#102b3a] to-[#102b32] px-8 py-14 text-center md:px-16">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to move forward?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            Let&apos;s discuss how the right technology can support your
            business goals.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 px-7 py-3.5 font-semibold text-[#081522] transition hover:scale-105"
          >
            Talk to our team <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
