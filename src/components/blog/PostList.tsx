"use client";

import { useState } from "react";
import { formatDate, type Post, type PostTopic } from "@/content/posts";
import styles from "./PostList.module.scss";

/** Journal index with a working topic filter (aria-pressed toggle buttons). */
export function PostList({ posts, topics }: { posts: Post[]; topics: PostTopic[] }) {
  const [topic, setTopic] = useState<PostTopic | "All">("All");
  const shown = topic === "All" ? posts : posts.filter((p) => p.topic === topic);
  return (
    <div>
      <div className={styles.filters} role="group" aria-label="Filter articles by topic">
        {(["All", ...topics] as Array<PostTopic | "All">).map((t) => (
          <button key={t} type="button" className={styles.chip} aria-pressed={topic === t} onClick={() => setTopic(t)}>
            {t}
            <span className={styles.count}>{t === "All" ? posts.length : posts.filter((p) => p.topic === t).length}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        Showing {shown.length} {shown.length === 1 ? "article" : "articles"}
        {topic === "All" ? "" : ` about ${topic}`}.
      </p>
      <ul className={styles.list}>
        {shown.map((p) => (
          <li key={p.slug} className={styles.item}>
            <article>
              <p className={styles.meta}>
                <span className={styles.topic}>{p.topic}</span> · <time dateTime={p.date}>{formatDate(p.date)}</time>
              </p>
              <h3 className={styles.title}>
                <a href={p.href} rel="noopener">
                  {p.title}
                </a>
              </h3>
              <p className={styles.summary}>{p.summary}</p>
              <p className={styles.by}>by {p.author} · on Walkover Insights (Medium)</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
