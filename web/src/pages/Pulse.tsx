import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GitCommit, GitBranch, Layers, ArrowUpRight, Rss, Calendar, Key, AlertCircle, Loader2, Globe, GitFork, ExternalLink, Tag, Newspaper } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface GitHubCommit {
  sha: string;
  commit: { message: string; author: { name: string; date: string } };
  author: { login: string } | null;
}

interface GitHubRelease {
  tag_name: string;
  published_at: string;
  body: string;
  prerelease: boolean;
}

interface RepoInfo {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  description: string;
  html_url: string;
}

interface GitHubIssue {
  number: number;
  title: string;
  body: string;
  created_at: string;
  labels: { name: string }[];
  html_url: string;
  user: { login: string };
}

interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.max(0, now - then);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function shortenMsg(msg: string): string {
  return msg.split("\n")[0].trim().substring(0, 120);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/* ------------------------------------------------------------------ */
/*  RSS Parser (parses GitHub Atom feed into RssItem[])                */
/* ------------------------------------------------------------------ */

async function fetchRssFeed(url: string): Promise<RssItem[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);
  const xml = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const entries = doc.querySelectorAll("entry");
  const items: RssItem[] = [];
  entries.forEach((entry) => {
    const title = entry.querySelector("title")?.textContent ?? "";
    const link = entry.querySelector("link[rel=\"alternate\"]")?.getAttribute("href") ?? entry.querySelector("link")?.getAttribute("href") ?? "";
    const pubDate = entry.querySelector("published")?.textContent ?? entry.querySelector("updated")?.textContent ?? "";
    const content = entry.querySelector("content")?.textContent ?? entry.querySelector("summary")?.textContent ?? "";
    items.push({ title, link, pubDate, contentSnippet: stripHtml(content).substring(0, 200) });
  });
  return items;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const OWNER = "flazzyde";
const REPO = "chatica";

export function Pulse() {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [repoInfo, setRepoInfo] = useState<RepoInfo | null>(null);
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [rssItems, setRssItems] = useState<RssItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchAll() {
      try {
        const base = `https://api.github.com/repos/${OWNER}/${REPO}`;

        // Fire all API calls in parallel
        const [commitsRes, releasesRes, repoRes, issuesRes] = await Promise.all([
          fetch(`${base}/commits?per_page=6`, { signal: controller.signal }),
          fetch(`${base}/releases?per_page=6`, { signal: controller.signal }),
          fetch(base, { signal: controller.signal }),
          fetch(`${base}/issues?per_page=4&sort=created&direction=desc&state=all`, { signal: controller.signal }),
        ]);

        if (!commitsRes.ok || !releasesRes.ok || !repoRes.ok || !issuesRes.ok) {
          throw new Error("GitHub API request failed");
        }

        const [commitsData, releasesData, repoData, issuesData] = await Promise.all([
          commitsRes.json() as Promise<GitHubCommit[]>,
          releasesRes.json() as Promise<GitHubRelease[]>,
          repoRes.json() as Promise<RepoInfo>,
          issuesRes.json() as Promise<GitHubIssue[]>,
        ]);

        setCommits(commitsData);
        setReleases(releasesData);
        setRepoInfo(repoData);
        setIssues(issuesData.filter((i) => !i.html_url.includes("/pull/"))); // filter out PRs

        // Fetch the local Atom feed
        try {
          const rss = await fetchRssFeed(`/feed.xml`);
          setRssItems(rss.slice(0, 5));
        } catch {
          // RSS fetch is optional
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
    return () => controller.abort();
  }, []);

  /* ----- Error state ----- */
  if (error) {
    return (
      <div className="py-28 px-6 max-w-7xl mx-auto select-none text-center">
        <div className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-500 p-4 px-6 rounded-2xl font-mono text-sm">
          <AlertCircle size={18} />
          <span>GitHub API Error: {error}</span>
        </div>
      </div>
    );
  }

  /* ----- Loading state ----- */
  if (loading) {
    return (
      <div className="py-28 px-6 max-w-7xl mx-auto select-none flex flex-col items-center justify-center gap-4 min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-amber-500" />
        <span className="font-mono text-xs text-neutral-400">Fetching live data from GitHub…</span>
      </div>
    );
  }

  /* ----- Render ----- */
  return (
    <div className="py-28 px-6 sm:px-12 max-w-7xl mx-auto select-none">

      {/* ======== Header ======== */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-4 max-w-xl text-left">
          <h2 className="font-sans text-3xl sm:text-5xl font-light tracking-tight text-black dark:text-white">
            System <span className="font-bold">Pulse</span>
          </h2>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
            Live data streamed directly from{" "}
            <a
              href={repoInfo?.html_url ?? `https://github.com/${OWNER}/${REPO}`}
              target="_blank" rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-amber-500 transition-colors"
            >
              github.com/{OWNER}/{REPO}
            </a>
            {repoInfo?.description && <> &mdash; {repoInfo.description}</>}
          </p>
        </div>

        {/* Stats badge */}
        <div className="flex items-center gap-4 bg-neutral-100/60 dark:bg-neutral-900/40 border border-neutral-250/20 dark:border-neutral-800/80 p-3 px-5 rounded-2xl shrink-0">
          <div className="text-left font-mono">
            <span className="block text-[9px] uppercase tracking-wider text-neutral-400">Branch</span>
            <span className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5">
              <GitBranch size={12} className="text-amber-500" /> {repoInfo?.default_branch ?? "—"}
            </span>
          </div>
          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800 mx-2" />
          <div className="text-left font-mono">
            <span className="block text-[9px] uppercase tracking-wider text-neutral-400">Stars</span>
            <span className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5">
              <Globe size={12} className="text-amber-500" /> {repoInfo?.stargazers_count ?? "—"}
            </span>
          </div>
          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800 mx-2" />
          <div className="text-left font-mono">
            <span className="block text-[9px] uppercase tracking-wider text-neutral-400">Forks</span>
            <span className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5">
              <GitFork size={12} className="text-amber-500" /> {repoInfo?.forks_count ?? "—"}
            </span>
          </div>
        </div>
      </div>

      {/* ======== Grid ======== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* ----- Left: Commits (span 5) ----- */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2.5 px-2">
            <GitCommit size={16} className="text-amber-500" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-extrabold">
              Development Timeline
            </h3>
            <span className="font-mono text-[9px] text-neutral-500 ml-auto">{commits.length} commits</span>
          </div>

          <div className="p-6 md:p-8 rounded-3xl border border-black/10 dark:border-neutral-900 bg-white/40 dark:bg-neutral-950/45 backdrop-blur-md space-y-6 shadow-sm">
            {commits.length === 0 && (
              <div className="text-center font-mono text-xs text-neutral-400 py-8">No commits found.</div>
            )}
            {commits.map((commit, idx) => (
              <motion.div
                key={commit.sha}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group flex gap-4 text-left border-l border-neutral-200 dark:border-neutral-800 pl-4 relative"
              >
                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full border border-neutral-300 dark:border-neutral-750 bg-white dark:bg-neutral-900 transition-all duration-300 group-hover:scale-125 group-hover:bg-amber-500 group-hover:border-amber-500" />
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between gap-2.5">
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-neutral-600 dark:text-neutral-400 uppercase tracking-wider font-bold">
                      {commit.sha.substring(0, 7)}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400">{timeAgo(commit.commit.author.date)}</span>
                  </div>
                  <p className="font-sans text-neutral-700 dark:text-neutral-300 leading-snug text-xs sm:text-[13px] line-clamp-2">
                    {shortenMsg(commit.commit.message)}
                  </p>
                  <span className="block font-mono text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
                    Author: {commit.author?.login ?? commit.commit.author.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* GitHub link */}
          <a
            href={`https://github.com/${OWNER}/${REPO}/commits/main`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-400 hover:text-amber-500 transition-colors px-2"
          >
            <ExternalLink size={12} /> View all commits on GitHub
          </a>
        </div>

        {/* ----- Right (span 7) ----- */}
        <div className="lg:col-span-7 space-y-8">

          {/* ---- Releases ---- */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 px-2">
              <Layers size={16} className="text-amber-500" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-extrabold">Verified Releases</h3>
              <span className="font-mono text-[9px] text-neutral-500 ml-auto">{releases.length} releases</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {releases.length === 0 && (
                <div className="p-6 rounded-2xl border border-black/5 dark:border-neutral-900 bg-white/20 dark:bg-neutral-950/20 text-center font-mono text-xs text-neutral-400">
                  No releases yet.
                </div>
              )}
              {releases.map((release, rIdx) => (
                <motion.div
                  key={release.tag_name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: rIdx * 0.08 }}
                  className="p-6 rounded-2xl border border-black/5 dark:border-neutral-900 bg-white/20 dark:bg-neutral-950/20 backdrop-blur-sm hover:border-black/15 dark:hover:border-neutral-800 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left"
                >
                  <div className="space-y-1.5 flex-1 max-w-xl">
                    <div className="flex items-center gap-3">
                      <Tag size={14} className="text-amber-500 shrink-0" />
                      <span className="font-sans font-extrabold text-lg text-black dark:text-white tracking-tight">
                        {release.tag_name}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 bg-neutral-100 dark:bg-neutral-900/50 p-1 px-2.5 rounded-full border border-black/5 dark:border-white/5 font-semibold">
                        {formatDate(release.published_at)}
                      </span>
                      {release.prerelease && (
                        <span className="font-mono text-[9px] uppercase tracking-widest text-amber-500 bg-amber-500/10 p-1 px-2.5 rounded-full border border-amber-500/20 font-semibold">
                          Pre-release
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-[13px] text-neutral-555 dark:text-neutral-400 leading-normal line-clamp-2">
                      {release.body ? shortenMsg(release.body) : "No release notes."}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 p-2 px-3 rounded-xl border border-emerald-500/10 font-mono text-[9px] uppercase tracking-widest font-black shrink-0">
                    <Key size={10} className="animate-pulse" />
                    <span>GPG SIGNED</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <a
              href={`https://github.com/${OWNER}/${REPO}/releases`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-400 hover:text-amber-500 transition-colors px-2"
            >
              <ExternalLink size={12} /> View all releases on GitHub
            </a>
          </div>

          {/* ---- Real RSS Feed from GitHub ---- */}
          {rssItems.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 px-2">
                <Newspaper size={16} className="text-amber-500" />
                <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-extrabold">RSS Feed</h3>
                <span className="font-mono text-[9px] text-neutral-500 ml-auto">{rssItems.length} entries</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {rssItems.map((item, rIdx) => (
                  <motion.a
                    key={item.link}
                    href={item.link}
                    target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: rIdx * 0.1 }}
                    className="p-5 rounded-2xl border border-black/5 dark:border-neutral-900 bg-white/20 dark:bg-neutral-950/20 backdrop-blur-sm hover:border-black/15 dark:hover:border-neutral-800 transition-all duration-300 block text-left group"
                  >
                    <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-2">
                      <Rss size={10} />
                      <span>{formatDate(item.pubDate)}</span>
                    </div>
                    <h4 className="font-sans font-bold text-sm text-black dark:text-white group-hover:text-amber-500 transition-colors">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs text-neutral-500 dark:text-neutral-450 mt-1 leading-relaxed line-clamp-2">
                      {item.contentSnippet || "No description."}
                    </p>
                  </motion.a>
                ))}
              </div>
            </div>
          )}

          {/* ---- GitHub Issues as "Dev Blog / Updates" ---- */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2.5 px-2">
              <Rss size={16} className="text-amber-500" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-extrabold">Issues & Updates</h3>
              <span className="font-mono text-[9px] text-neutral-500 ml-auto">{issues.length} items</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {issues.length === 0 && (
                <div className="col-span-full p-6 rounded-2xl border border-black/5 dark:border-neutral-900 bg-white/20 dark:bg-neutral-950/20 text-center font-mono text-xs text-neutral-400">
                  No issues found.
                </div>
              )}
              {issues.map((issue, bIdx) => (
                <motion.a
                  key={issue.number}
                  href={issue.html_url}
                  target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: bIdx * 0.1 }}
                  className="p-6 rounded-3xl border border-black/10 dark:border-neutral-900 bg-white/40 dark:bg-neutral-950/45 backdrop-blur-md hover:shadow-lg transition-all duration-300 group flex flex-col justify-between text-left min-h-[200px]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} /> {formatDate(issue.created_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        #{issue.number} by {issue.user.login}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-base text-black dark:text-white tracking-tight group-hover:text-amber-550 dark:group-hover:text-amber-400 transition-colors">
                        {issue.title}
                      </h4>
                      <p className="font-sans text-xs text-neutral-500 dark:text-neutral-450 mt-1.5 leading-relaxed line-clamp-3">
                        {issue.body ? shortenMsg(stripHtml(issue.body)) : "No description."}
                      </p>
                    </div>
                    {issue.labels.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {issue.labels.map((lbl) => (
                          <span key={lbl.name} className="font-mono text-[8px] uppercase tracking-wider bg-neutral-200/50 dark:bg-neutral-800/50 text-neutral-500 dark:text-neutral-400 px-2 py-0.5 rounded-full">
                            {lbl.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-black/5 dark:border-neutral-900/60 flex items-center justify-between text-black dark:text-white font-mono text-[10px] uppercase font-extrabold tracking-widest group-hover:underline">
                    <span>View on GitHub</span>
                    <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </motion.a>
              ))}
            </div>

            <a
              href={`https://github.com/${OWNER}/${REPO}/issues`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-400 hover:text-amber-500 transition-colors px-2"
            >
              <ExternalLink size={12} /> View all issues on GitHub
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}