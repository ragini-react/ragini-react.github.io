import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { PipPairs } from "@/components/games/PipPairs";
import { SketchPrompt } from "@/components/games/SketchPrompt";
import { pageMeta } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import s from "./games.module.scss";

const DESCRIPTION = "Two small games for a short break: Pip Pairs, a memory game with dice faces, and Sketch Prompt, a one-minute drawing challenge.";

export const metadata = pageMeta({ title: "Games", description: DESCRIPTION, path: "/games/" });

export default function GamesPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: "Games", description: DESCRIPTION, path: "/games/" })} />
      <PageHero
        trail={[{ name: "Games", path: "/games/" }]}
        eyebrow="games"
        title={
          <>
            A short break,
            <br />
            sketchbook style.
          </>
        }
        lede={<p>Two small games, made for this site. No accounts, no scores sent anywhere. Play one between meetings.</p>}
      />
      <section className="section-tight" aria-labelledby="pairs">
        <div className={`wrap ${s.game}`}>
          <div className={s.intro}>
            <p className="eyebrow">game one</p>
            <h2 id="pairs">Pip Pairs</h2>
            <p>Twelve cards, six pairs of die faces. Flip two at a time and find every pair in as few moves as you can. Works with a keyboard too.</p>
          </div>
          <PipPairs />
        </div>
      </section>
      <section className="section sheet" aria-labelledby="sketch">
        <div className={`wrap ${s.game}`}>
          <div className={s.intro}>
            <p className="eyebrow">game two</p>
            <h2 id="sketch">Sketch Prompt</h2>
            <p>Get a silly prompt, give yourself a minute, draw it. Keep it as a PNG if it turns out well, or clear it and try another.</p>
            <p className="muted">Needs a mouse, finger or stylus to draw.</p>
          </div>
          <SketchPrompt />
        </div>
      </section>
    </>
  );
}
