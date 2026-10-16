/**
 * Real photographs, all first-party: published by Walkover itself.
 * Reuse should still be confirmed with the people pictured (docs/RESEARCH.md).
 */
export interface Photo {
  srcSet: Array<[string, number]>;
  width: number;
  height: number;
  alt: string;
  caption: string;
  credit: string;
}

export const photos = {
  office: {
    srcSet: [
      ["/photos/team-office-800.jpg", 800],
      ["/photos/team-office-1400.jpg", 1400],
    ],
    width: 1400,
    height: 1050,
    alt: "About fifty Walkover team members posing together in an office with a red wall, many in kurtas and festive clothes, the front row kneeling.",
    caption: "The whole crew, dressed up for the day.",
    credit: "Photo published on msg91.com/about-us",
  },
  msg91: {
    srcSet: [
      ["/photos/team-msg91-760.jpg", 760],
      ["/photos/team-msg91-1366.jpg", 1366],
    ],
    width: 1366,
    height: 577,
    alt: "Around twenty people from the MSG91 team in matching black T-shirts, smiling in a café-style room with hanging lamps.",
    caption: "MSG91 folks in matching T-shirts.",
    credit: "Photo from Walkover’s careers portal",
  },
} satisfies Record<string, Photo>;
