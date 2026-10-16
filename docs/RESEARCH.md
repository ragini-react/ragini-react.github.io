# Research dossier

Compiled 16 October 2026 from public sources: live sites, Internet Archive captures, government records, Walkover's own publications and independent press. It records where the site's facts come from, which claims are attributed rather than verified, and what still needs confirmation from the Walkover team before launch.

The research for this rebuild was done fresh. Notes left in an earlier project folder were treated only as leads and re-checked.

Confidence levels: **High** = primary or official source. **Med** = single or second-hand account; it is attributed in the copy. **Not used** = could not verify.

---

## 1. The existing site (audit)

- **walkover.in** is a mix of three things:
  - `/` is a legacy Bootstrap page. Its footer prints a literal `<?php echo date("Y");?>`.
  - Five pages are served from DocStar: `/about`, `/about/culture-we-foster`, `/about/privacy-policy`, `/products`, `/careers` (also at `/career`).
  - `/happiness/` is a static newsletter archive.
- **SEO problems on the current site:**
  - The DocStar pages carry `noindex` and a canonical pointing to `app.docstar.io`.
  - `walkover.in/sitemap.xml` lists `new.walkover.in` URLs.
  - `www.walkover.in` has no DNS record, yet Keka links to it.
- **Stale or broken items:**
  - The homepage shows "Socket" and a dead `sokt.io` form script. Its contact modal is unreachable.
  - The 50 Agents "Explore" button has no link.
  - The footer "Privacy Policy" link opens TermsFeed *Terms and Conditions* from 2020.
  - The map link on DocStar pages points to the old address.
- **Preserved here:**
  - `/`, `/about/`, `/about/culture-we-foster/`, `/about/privacy-policy/`, `/products/`, `/careers/`.
  - `/career/` and `/walkover-home/` as static redirects.
  - `/happiness/` must stay on the server; see the README.
- **No page existed** for freedom, life, stories, recommends, games, ideas or future. These are new.

## 2. Company facts used on the site

| Fact | Source | Confidence |
|---|---|---|
| Legal name: Walkover Web Solutions Pvt Ltd. Address: 5th Floor, Wing B, LIC Tower, Scheme No. 54, Indore 452011 | walkover.in footer; msg91.com footer; Udyam certificate | High |
| Incorporated **18 June 2010** | Udyam Registration Certificate UDYAM-MP-23-0012025 (msg91.com/pdf/msme.pdf) | High (government record) |
| Founded by siblings Pushpendra, Ankita and Shubhendra Agrawal | Walkover Insights, 13 Nov 2019; Inc42, Oct 2016 | High |
| Began as Hostnsoft (hosting) in 2007 | walkover.in about pages archived 2011–14; hostnsoft.com archived Dec 2007 | High that it existed; the "founded 2007" claim is attributed |
| Founder home from Dubai in 2008; hosting with a team of five | Pushpendra Agrawal, MSG91 blog, 26 Mar 2019 (archived) | Med, attributed |
| Whozzat (2007) paid members per message and per invite | whozzat.com archived Oct 2007 | High |
| A 2006 college social network "to topple Orkut" failed | YourStory, Dec 2013 | Med, attributed; the link to Whozzat is not asserted |
| msg91.com live Feb 2009 ("Powered by Host N Soft", for students abroad); "91" is India's country code | msg91.com archived 2009 and 2011 | High |
| Yeshwant Club transactional SMS (founder) / unreliable vendor taken in-house (The Grit Stories) | founder's essay 2019; The Grit Stories, Oct 2022 | Med; both accounts are shown |
| TRAI capped promotional SMS at 100 per day per SIM, with transactional exempt (27 Sep 2011) | TRAI press release 49/2011 | High. The "to our advantage" reading is attributed to the founder |
| Pitched investors in 2011, none bought in, stayed bootstrapped | The Grit Stories, 2022 | Med, attributed |
| Save&Search beta (2012) | saveandsearch.com archived 2012; YourStory, May 2012 | High |
| Fourth anniversary, about 50 people, "Every Walker must be a great designer" (2014) | Walkover press release, PRWeb, 26 Jun 2014 | Med (company release) |
| Socket, "Google tag manager for APIs" (2016), grew into viaSocket | viasocket.com archived Apr 2016; Walkover Insights 2019/2021 | High |
| Giddh publicly released May 2016 | PR Newswire, 16 May 2016 | Med (company release) |
| MSG91 acquired ToSMS (Oct 2016) | Inc42, 7 Oct 2016 | High |
| MSG91 stall at MWC Barcelona 2019 | MSG91 blog, Mar 2019 (archived) | High |
| "150+ Spartans working remotely" (2020) | walkover.in archived Sep 2020 | High. Today's site says both 150+ and 200+, so no headcount is published |
| Walkover University: free six-week course (2021) | walkover.in/university archived Nov 2021 | High |
| Freedom = responsibility = accountability & ownership | Walkover YouTube, "Freedom + Responsibility at Walkover", 9 Jun 2021 | High |
| Name story: "Be it a success or learning, simply Walkover!" | Shubhendra Agrawal, Purshology interview, Feb 2021 | High |
| Ten values (English and Hindi), hiring motto "Passion First, Skill Second, Degree Last" | walkover.in/about/culture-we-foster; walkover.in/careers | High |
| 2019 value set: Happiness / Purpose / Thumb Rule | walkover.in archived 2019 | High |
| "300 - a must watch, Walkover recommends" | walkover.in archived Oct 2019 | High |
| ISO/IEC 27001:2022 for MSG91 (Jul 2024) | Certificate KDACI202407014, msg91.com/certificates | High |
| Happiness letters: 64 issues, Oct 2021 – Feb 2025 | walkover.in/happiness (counted) | High |

**Deliberately not used:**

- Revenue and ARR figures. They come from a single source and are not like-for-like.
- "40+ products" and "5000+ enterprises".
- Unverified awards: the 2026 CX Summit award and GITEX 2023.
- NASSCOM and IAMAI membership. It is self-claimed only.
- Staff quotes. These need the staff members' consent.
- The Fortune 500 client's name.

## 3. Products

Eight products are presented: the seven listed on walkover.in/products, plus Embarko. Colours were read from each product's logo files and live CSS on 16 Oct 2026. The source of every value is recorded in `src/content/products.ts`.

| Product | Link to Walkover | Primary | Accent / surface | Notes |
|---|---|---|---|---|
| MSG91 | msg91.com footer: Walkover Web Solutions Pvt Ltd | #1E75BA | #1258A3 / #E2F0FF | Claims shown with attribution |
| viaSocket | viasocket.com footer: Walkover Web Solutions | #A8200D (mark) | amber #D97706 / #FAFAF9 | New homepage is monochrome. The logo file reads "SOCKET" and is used as served |
| Giddh | giddh.com footer: Walkover **Technologies** Pvt Ltd, same address | #1B1F6D (logo #1A237E) | #4B55C2 / #F5F6FF | Entity name differs; confirm |
| GTWY AI | "Built by Walkover" | #14181F | amber #F5B93B / #F3F4F6 | Runs agent features in viaSocket and MSG91 |
| 50 Agents | "A product by Walkover" | #5B21B5 | #9810FA / #FBFAFD | walkover.in calls it a notetaker; the live site says no-code agents. The live site was followed |
| DocStar | "A product by Walkover" | #0F0F0F | #3B82F6 / #F9FAFB | Several walkover.in pages are built with it |
| Things of Brand | Listed on walkover.in; Walkover assets hosted there | #5928E5 | #DE80FF / derived #F4F0FF | No legal entity on the site; its FAQ copy is mismatched, so none was quoted |
| Embarko (beta) | Terms: operated by **SuperHeroes Inc.** at Walkover's address; contact @walkover.in | #171A1E | #1A1916 / #F5F4F0 | **Not listed on walkover.in.** Shown with that relationship stated plainly. Confirm |

Dark-mode values (`primaryOnDark`, `surfaceDark`) are **derived** lighter tints made for legibility. They are labelled as not official in the code.

**History only, never shown as products:**

- HostnSoft, Whozzat, UtterU, Save&Search, Socket (which became viaSocket), DotSALE, SPACE, Bingage, Muneem, Human Fuel & half kg, Handpicked.life, Feedio and UserTable.
- Sources: Walkover Insights (Nov 2019, Dec 2021), Product Hunt, and the GitHub repositories.

**Could not verify, so not used:** Workspace91, Dotsale's current status, DelightPi, KISS, Socket Cron, SheetasDB and HTTP Dump as products, and Coderoom.

## 4. Journal, careers, newsletter

- **Journal:** the 10 posts in the Walkover Insights RSS feed (medium.com/walkover-insights). Medium blocks automated link checks (403), but every URL comes from the official feed. The summaries are original and describe only the articles' content.
- **Careers:** the public Keka feed `walkover.keka.com/careers/api/jobs/default/active` sends `Access-Control-Allow-Origin: *`. Roles are snapshotted at build time and re-checked live in the browser. JobPosting JSON-LD is emitted only for roles with a stated location (7 of 8 today).
- **Newsletter:** the Happiness letter was an internal Google Group list. A Mailchimp form for public sign-ups exists in the old homepage's HTML, commented out. The site supports it but does not enable it by default.

## 5. Assets and rights

| Asset | Source | Status |
|---|---|---|
| Walkover logo, icon | walkover.in, stuff.walkover.in (official brand library) | Official; used unaltered (on a light sticker in dark mode) |
| Product logos | Each product's own site / Things of Brand CDN | Official; used unaltered |
| Team photo (office, ~50 people) | msg91.com/about-us | First-party. **Confirm consent** of the people pictured |
| MSG91 team photo | Walkover's Keka careers portal banner | First-party. **Confirm consent** |
| All illustrations, characters, scenes, the 3D die, the OG card | Made for this site | Original |

Not used:

- Medium, LinkedIn and press photos (third-party authors).
- Staff headshots.
- Archived résumé files (personal data).
- MWC 2019 photos. Ask the founder for originals.

## 6. Open questions for the Walkover team

1. Should **Embarko** appear as a Walkover product, and with which relationship wording?
2. **Giddh's legal entity:** Walkover Technologies Pvt Ltd or Walkover Web Solutions Pvt Ltd?
3. **Current titles** of the founders at group level (they differ across MSG91, Giddh and viaSocket pages).
4. **Headcount**: the live site says both 150+ and 200+.
5. **Newsletter:** is the Mailchimp list active? Which service should the Happiness sign-up use? Should letters resume?
6. **Contact form endpoint** (for example a viaSocket webhook flow), with server-side validation and rate limiting.
7. **Consent** for the two team photographs; any approved newer photos.
8. **Privacy notice:** legal review of `/about/privacy-policy/`.
9. **Whozzat:** is it the 2006 "topple Orkut" network? Who built it?
10. **The Yeshwant Club** story: can the club be named?
11. **viaSocket's start year:** 2016 (Socket domain) or about 2018 ("eight years ago" on viasocket.com/about)?
12. **Remote vs Indore:** every open role is in Indore. What should the site say about remote work today?

## 7. Main sources

- **Government:**
  - Udyam certificate: msg91.com/pdf/msme.pdf
  - TRAI press releases 49/2011 and 53/2011
- **Walkover:**
  - walkover.in (live and archived 2010–2021)
  - walkover.in/happiness
  - stuff.walkover.in
  - Walkover Insights (Medium)
  - Walkover YouTube
  - github.com/Walkover-Web-Solution and github.com/MSG91
  - walkover.keka.com/careers
- **Products:** msg91.com, viasocket.com, giddh.com, gtwy.ai, 50agents.com, docstar.io, thingsofbrand.com, embarko.ai, muneem.co
- **Press and interviews:**
  - YourStory (2012, 2013)
  - Inc42 (2016)
  - The Grit Stories / SaaSBOOMi (2022)
  - Purshology (2021)
  - PRWeb (2014) and PR Newswire (2015, 2016) company releases
- **Founder:** Pushpendra Agrawal, "A Journey from SMS to Communication Megacorp" (MSG91 blog / LinkedIn, Mar 2019)
