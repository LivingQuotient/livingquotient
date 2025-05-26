import Link from "next/link";
import { getXataClient } from "@/lib/xata";
import { notFound } from "next/navigation";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { DocsSearch } from "@/components/search";
import { SiteFooter } from "@/components/site-footer";
import { LQScoreCircle } from "@/components/LQScoreCircle";
import { Card } from "@/components/ui/card";
import { SimpleProgress } from "@/components/ui/simple-progress";

const xata = getXataClient();

export const dynamicParams = true;

export async function generateStaticParams() {
  const cities = await xata.db.cities.getAll();
  return cities.map((city) => ({ slug: city.slug }));
}

export default async function CityPage({ params }: { params: { slug: string } }) {
  const city = await xata.db.cities.filter({ slug: params.slug }).getFirst();

  if (!city) return notFound();

  const subScores = [
    {
      emoji: "🏠",
      title: "Affordability & Accessibility",
      label: "Very Good",
      href: "#affordability-accessibility",
      meterValue: 82,
    },
    {
      emoji: "👨‍👩‍👧‍👦",
      title: "Family & Community",
      label: "Excellent",
      href: "#family-community",
      meterValue: 90,
    },
    {
      emoji: "💻",
      title: "Work & Flexibility",
      label: "Strong",
      href: "#work-flexibility",
      meterValue: 78,
    },
    {
      emoji: "🌱",
      title: "Health & Longevity",
      label: "Great",
      href: "#health-longevity",
      meterValue: 85,
    },
    {
      emoji: "✨",
      title: "Pace, Vibe, and Freedom",
      label: "Balanced",
      href: "#pace-vibe-freedom",
      meterValue: 75,
    },
    {
      emoji: "🚀",
      title: "Mobility & Access",
      label: "Excellent",
      href: "#mobility-access",
      meterValue: 88,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav items={docsConfig.mainNav} />
          <div className="flex flex-1 items-center space-x-4 sm:justify-end">
            <div className="flex-1 sm:grow-0">
              <DocsSearch />
            </div>
            <nav className="flex space-x-4">
              <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
                <Icons.gitHub className="h-7 w-7" />
                <span className="sr-only">GitHub</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <div className="container flex-1">
        <main className="relative py-6 md:block lg:grid lg:grid-cols-[minmax(0,900px)_300px] lg:gap-10 lg:py-10 xl:gap-20">
          <div className="mx-auto max-w-2xl md:max-w-3xl lg:max-w-4xl w-full px-4 md:px-8">
            <div className="mb-8">
              <h1 className="font-heading text-4xl lg:text-5xl mb-2">{city.name}</h1>
              <p className="text-xl text-muted-foreground">All about living in {city.name}</p>
            </div>
            <hr className="my-4" />
            <div className="w-full bg-gray-200 rounded-lg mb-8 aspect-[16/9] flex items-center justify-center">
              <span className="text-gray-400">Cover image placeholder (16:9)</span>
            </div>
            <section id="introduction" className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Introduction to Living in {city.name}</h2>
              <p className="text-muted-foreground">
                This is a placeholder introduction for living in {city.name}. Here you can describe what makes the city unique, what new residents should know, and any other relevant information about life in the city.
              </p>
            </section>
            <section id="lq-score" className="mb-8">
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                <LQScoreCircle score={72} />
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Living Quotient (LQ) Score</h2>
                  <p className="text-muted-foreground text-sm max-w-md">
                    The LQ Score is a measure of overall quality of life in this city, rated out of 100. It takes into account factors like safety, amenities, cost of living, and more. (This is a placeholder; the score will be pulled from Xata soon.)
                  </p>
                </div>
              </div>
            </section>
            <section className="mt-12 mb-16">
              <h2 className="text-2xl font-bold mb-4">Living Quotient Breakdown</h2>
              <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {subScores.map((score) => (
                  <a
                    href={score.href}
                    key={score.title}
                    className="block focus:outline-none focus:ring-2 focus:ring-primary rounded-xl transition hover:bg-muted"
                    style={{ scrollBehavior: "smooth" }}
                  >
                    <Card className="h-full flex flex-col items-start p-4">
                      <div className="font-semibold">{score.title}</div>
                      <div className="text-sm text-muted-foreground mb-2">{score.label}</div>
                      <SimpleProgress value={score.meterValue} className="w-full" />
                    </Card>
                  </a>
                ))}
              </div>
            </section>
            {/* BEGIN SUB-SCORE SECTIONS */}
            <section id="affordability-accessibility" className="mb-8 scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-2">🏠 Affordability & Accessibility</h2>
              <p className="text-muted-foreground mb-2">
                Discover how affordable and accessible life is in this city. We cover housing costs, transportation options, and the general cost of living to help you understand what to expect.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Average rent and home prices</li>
                <li>Public transportation availability</li>
                <li>Everyday expenses and affordability</li>
              </ul>
            </section>
            <section id="family-community" className="mb-8 scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-2">👨‍👩‍👧‍👦 Family & Community</h2>
              <p className="text-muted-foreground mb-2">
                Explore what makes this city great for families and building community. We highlight schools, parks, and opportunities for social connection.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Quality of schools and childcare</li>
                <li>Community events and organizations</li>
                <li>Family-friendly amenities</li>
              </ul>
            </section>
            <section id="work-flexibility" className="mb-8 scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-2">💻 Work & Flexibility</h2>
              <p className="text-muted-foreground mb-2">
                Learn about the work culture, job opportunities, and flexibility for remote or hybrid work in this city.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Major industries and employers</li>
                <li>Remote work infrastructure</li>
                <li>Work-life balance</li>
              </ul>
            </section>
            <section id="health-longevity" className="mb-8 scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-2">🌱 Health & Longevity</h2>
              <p className="text-muted-foreground mb-2">
                Find out about healthcare, wellness, and longevity in this city. We cover hospitals, fitness, and healthy living options.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Access to healthcare and hospitals</li>
                <li>Fitness centers and outdoor activities</li>
                <li>General health and wellness</li>
              </ul>
            </section>
            <section id="pace-vibe-freedom" className="mb-8 scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-2">✨ Pace, Vibe, and Freedom</h2>
              <p className="text-muted-foreground mb-2">
                Get a feel for the pace of life, the city's vibe, and the sense of personal freedom you can expect here.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>City atmosphere and culture</li>
                <li>Opportunities for self-expression</li>
                <li>Balance between work and leisure</li>
              </ul>
            </section>
            <section id="mobility-access" className="mb-8 scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-2">🚀 Mobility & Access</h2>
              <p className="text-muted-foreground mb-2">
                Understand how easy it is to get around and travel to and from this city, both locally and internationally.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Public transit and walkability</li>
                <li>Airport and travel connections</li>
                <li>Accessibility for all residents</li>
              </ul>
            </section>
            {/* END SUB-SCORE SECTIONS */}
            <p className="text-muted-foreground mb-6">
              Region: {city.region} <br />
        Country: {city.country} <br />
              Population: {city.population ? city.population.toLocaleString() : "Unknown"}
            </p>
          </div>
          <div className="hidden text-sm lg:block">
            <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
              <div className="space-y-4">
                <div className="font-medium">On this page</div>
                <ul className="m-0 list-none">
                  <li className="mt-0 pt-2">
                    <a href="#introduction" className="text-muted-foreground hover:text-foreground">Introduction</a>
                  </li>
                  <li className="mt-0 pt-2">
                    <a href="#lq-score" className="text-muted-foreground hover:text-foreground">LQ Score</a>
                  </li>
                  <li className="mt-0 pt-2">
                    <a href="#affordability-accessibility" className="text-muted-foreground hover:text-foreground">Affordability & Accessibility</a>
                  </li>
                  <li className="mt-0 pt-2">
                    <a href="#family-community" className="text-muted-foreground hover:text-foreground">Family & Community</a>
                  </li>
                  <li className="mt-0 pt-2">
                    <a href="#work-flexibility" className="text-muted-foreground hover:text-foreground">Work & Flexibility</a>
                  </li>
                  <li className="mt-0 pt-2">
                    <a href="#health-longevity" className="text-muted-foreground hover:text-foreground">Health & Longevity</a>
                  </li>
                  <li className="mt-0 pt-2">
                    <a href="#pace-vibe-freedom" className="text-muted-foreground hover:text-foreground">Pace, Vibe, and Freedom</a>
                  </li>
                  <li className="mt-0 pt-2">
                    <a href="#mobility-access" className="text-muted-foreground hover:text-foreground">Mobility & Access</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}