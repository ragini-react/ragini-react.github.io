import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { WriterScene } from "@/components/scenes/WriterScene";
import { PostList } from "@/components/blog/PostList";
import { posts, postTopics, formatDate } from "@/content/posts";
import { company } from "@/content/company";
import { pageMeta } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import s from "./blog.module.scss";

const DESCRIPTION =
  "The Walkover journal: articles by Walkers on culture, remote work, design and building APIs, published on Walkover Insights.";

export const metadata = pageMeta({ title: "Journal", description: DESCRIPTION, path: "/blog/" });

export default function BlogPage() {
  const latest = posts[0];
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: "Walkover Journal", description: DESCRIPTION, path: "/blog/", type: "CollectionPage" }),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: posts.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: { "@type": "BlogPosting", headline: p.title, url: p.href, datePublished: p.date, author: { "@type": "Person", name: p.author } },
            })),
          },
        ]}
      />
      <PageHero
        trail={[{ name: "Journal", path: "/blog/" }]}
        eyebrow="the journal"
        title={
          <>
            From a thought
            <br />
            to a page.
          </>
        }
        lede={
          <p>
            Walkers have written about remote work, inclusion, colour and building APIs on{" "}
            <a href={company.blog} rel="noopener">
              Walkover Insights
            </a>
            . Each article below opens there, in full.
          </p>
        }
      />
      <section className="section-tight sheet" aria-label="Illustration: from an idea to an article">
        <div className="wrap">
          <WriterScene article={{ title: latest.title, href: latest.href, meta: `${latest.author} · ${formatDate(latest.date)}` }} />
        </div>
      </section>
      <section className="section" aria-labelledby="articles">
        <div className="wrap">
          <h2 id="articles" className={s.head}>
            All articles
          </h2>
          <PostList posts={posts} topics={postTopics} />
          <p className={s.more}>
            Also worth a read: the{" "}
            <a href={company.happinessArchive} rel="noopener">
              Happiness letters archive
            </a>
            , Walkover’s Friday notes to its own team.
          </p>
        </div>
      </section>
    </>
  );
}
