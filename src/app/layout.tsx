import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, Kalam } from "next/font/google";
import SiteHeader from "@/components/layout/SiteHeader";
import DiceIntro from "@/components/intro/DiceIntro";
import SiteFooter from "@/components/layout/SiteFooter";
import MotionRuntime from "@/components/motion/MotionRuntime";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { NOINDEX, SITE_URL } from "@/lib/seo";
import { BASE_PATH } from "@/lib/paths";
import "@/styles/globals.scss";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--ff-display",
  display: "swap",
  weight: ["500", "700", "800"],
});
const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--ff-body",
  display: "swap",
});
const hand = Kalam({
  subsets: ["latin"],
  variable: "--ff-hand",
  display: "swap",
  weight: ["400", "700"],
  // Annotations only: never the largest paint, so don't compete with it.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Walkover: We Are Walkers",
    template: "%s · Walkover",
  },
  description:
    "Walkover is the Indore software company behind MSG91, viaSocket, Giddh and more: products for business messaging, automation, AI and accounting.",
  applicationName: "Walkover",
  robots: NOINDEX ? { index: false, follow: false } : { index: true, follow: true },
  icons: {
    icon: [{ url: `${BASE_PATH}/favicon.svg`, type: "image/svg+xml" }],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f2e8" },
    { media: "(prefers-color-scheme: dark)", color: "#161411" },
  ],
  colorScheme: "light dark",
};

// Runs before first paint: marks JS as available (so reveal styles apply
// without a flash) and decides whether the homepage intro plays this session.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var b=${JSON.stringify(
  BASE_PATH,
)};var p=location.pathname;if((p===b+'/'||p===b||p===b+'/index.html')&&!sessionStorage.getItem('wk-intro-seen')&&location.search.indexOf('nointro')<0){d.setAttribute('data-intro','');setTimeout(function(){d.removeAttribute('data-intro')},12000)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable} ${hand.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {/* Outside every inert region; only activates on the homepage (see bootScript). */}
        <DiceIntro />
        <SiteHeader />
        <main id="main" tabIndex={-1} data-intro-inert>
          {children}
        </main>
        <SiteFooter />
        <MotionRuntime />
      </body>
    </html>
  );
}
