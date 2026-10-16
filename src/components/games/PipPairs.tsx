"use client";

import { useCallback, useRef, useState } from "react";
import styles from "./PipPairs.module.scss";

interface Card {
  id: number;
  face: number;
  open: boolean;
  done: boolean;
}

const PIPS: Record<number, Array<[number, number]>> = {
  1: [[2, 2]],
  2: [[1, 1], [3, 3]],
  3: [[1, 1], [2, 2], [3, 3]],
  4: [[1, 1], [1, 3], [3, 1], [3, 3]],
  5: [[1, 1], [1, 3], [2, 2], [3, 1], [3, 3]],
  6: [[1, 1], [1, 3], [2, 1], [2, 3], [3, 1], [3, 3]],
};

function deal(): Card[] {
  const faces = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
  for (let i = faces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [faces[i], faces[j]] = [faces[j], faces[i]];
  }
  return faces.map((face, id) => ({ id, face, open: false, done: false }));
}

/** Pip Pairs: a memory game. Find the six pairs of die faces. */
export function PipPairs() {
  const [cards, setCards] = useState<Card[]>(() => Array.from({ length: 12 }, (_, id) => ({ id, face: (id % 6) + 1, open: false, done: false })));
  const [moves, setMoves] = useState(0);
  const [msg, setMsg] = useState("Find the six pairs. Flip two cards at a time.");
  const busy = useRef(false);
  // The server renders an unshuffled, face-down deck; the real deal happens on
  // the first flip, so server and client markup always match.
  const [dealt, setDealt] = useState(false);

  const won = cards.every((c) => c.done);

  const flip = useCallback(
    (id: number) => {
      if (busy.current) return;
      let deck = cards;
      if (!dealt) {
        deck = deal();
        setDealt(true);
      }
      const card = deck.find((c) => c.id === id)!;
      if (card.open || card.done) return;
      const opened = deck.filter((c) => c.open && !c.done);
      const next = deck.map((c) => (c.id === id ? { ...c, open: true } : c));
      setCards(next);
      if (opened.length === 0) {
        setMsg(`Flipped a ${card.face}. Now find its pair.`);
        return;
      }
      const first = opened[0];
      setMoves((m) => m + 1);
      if (first.face === card.face) {
        const matched = next.map((c) => (c.face === card.face ? { ...c, done: true } : c));
        setCards(matched);
        const left = matched.filter((c) => !c.done).length / 2;
        setMsg(left ? `A pair of ${card.face}s! ${left} pair${left > 1 ? "s" : ""} to go.` : "All six pairs found. Nicely walked over!");
      } else {
        setMsg(`A ${first.face} and a ${card.face}. Not a pair; they’ll flip back.`);
        busy.current = true;
        window.setTimeout(() => {
          setCards((cs) => cs.map((c) => (c.done ? c : { ...c, open: false })));
          busy.current = false;
        }, 900);
      }
    },
    [cards, dealt],
  );

  const restart = () => {
    setCards(deal());
    setDealt(true);
    setMoves(0);
    setMsg("New deck. Find the six pairs.");
  };

  return (
    <div className={styles.game}>
      <div className={styles.bar}>
        <p>
          Moves: <b>{moves}</b>
        </p>
        <button type="button" className="btn btn-paper" onClick={restart}>
          Shuffle again
        </button>
      </div>
      <ul className={styles.grid} aria-label="Pip Pairs cards">
        {cards.map((c, i) => (
          <li key={c.id}>
            <button
              type="button"
              className={styles.card}
              data-open={c.open || c.done || undefined}
              data-done={c.done || undefined}
              onClick={() => flip(c.id)}
              aria-label={c.open || c.done ? `Card ${i + 1}: ${c.face}${c.done ? ", matched" : ""}` : `Card ${i + 1}: face down`}
              aria-disabled={c.done || undefined}
            >
              <span className={styles.inner} aria-hidden="true">
                <span className={styles.back}>?</span>
                <span className={styles.front}>
                  {PIPS[c.face].map(([r, col], k) => (
                    <i key={k} style={{ gridArea: `${r} / ${col}` }} />
                  ))}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className={styles.msg} role="status" aria-live="polite">
        {won ? `All six pairs in ${moves} moves. Nicely walked over!` : msg}
      </p>
    </div>
  );
}
