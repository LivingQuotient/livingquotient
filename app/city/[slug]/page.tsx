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
import { Progress } from "@/components/ui/progress";

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
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
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
            {/* Placeholder for cover image */}
            <div className="w-full bg-gray-200 rounded-lg mb-8 aspect-[16/9] flex items-center justify-center">
              <span className="text-gray-400">Cover image placeholder (16:9)</span>
            </div>
            {/* Introduction Section */}
            <section id="introduction" className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Introduction to Living in {city.name}</h2>
              <p className="text-muted-foreground">
                This is a placeholder introduction for living in {city.name}. Here you can describe what makes the city unique, what new residents should know, and any other relevant information about life in the city.
              </p>
            </section>
            {/* LQ Score Section */}
            <section id="lq-score" className="mb-8">
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                {/* Animated Circular Progress Graph */}
                <LQScoreCircle score={72} />
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Living Quotient (LQ) Score</h2>
                  <p className="text-muted-foreground text-sm max-w-md">
                    The LQ Score is a measure of overall quality of life in this city, rated out of 100. It takes into account factors like safety, amenities, cost of living, and more. (This is a placeholder; the score will be pulled from Xata soon.)
                  </p>
                </div>
              </div>
            </section>
            {/* LQ Sub-score Preview Grid */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Living Quotient Breakdown</h2>
              <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {subScores.map(score => (
                  <a
                    href={score.href}
                    key={score.title}
                    className="block focus:outline-none focus:ring-2 focus:ring-primary rounded-xl transition hover:bg-muted"
                    style={{ scrollBehavior: "smooth" }}
                  >
                    <Card className="h-full flex flex-col items-start p-4">
                      <div className="text-2xl mb-2">{score.emoji}</div>
                      <div className="font-semibold">{score.title}</div>
                      <div className="text-sm text-muted-foreground mb-2">{score.label}</div>
                      <Progress value={score.meterValue} className="w-full h-2 mt-auto" />
                    </Card>
                  </a>
                ))}
              </div>
            </section>

            {/* Detailed LQ Category Sections */}
            <section id="affordability-accessibility" className="mt-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">🏠 Affordability & Accessibility</h2>
              <p className="text-muted-foreground mb-6">Affordability & Accessibility in this city encompasses the overall cost of living, housing affordability, and access to essential goods and services. This section will provide a comprehensive overview of how affordable and accessible life is for residents, including insights into rent, utilities, childcare, and tax burden. Data and analysis will be dynamically sourced from Xata to ensure up-to-date, actionable information for newcomers and locals alike.</p>
              <div className="space-y-8">
                <div>
                  <h3 id="cost-of-living" className="text-xl font-semibold mb-2 scroll-mt-24">📉 Cost of Living</h3>
                  <p className="text-muted-foreground">A summary of the cost of living in this city. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="housing-affordability" className="text-xl font-semibold mb-2 scroll-mt-24">🏡 Housing Affordability</h3>
                  <p className="text-muted-foreground">A summary of housing affordability. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="rent-ratio" className="text-xl font-semibold mb-2 scroll-mt-24">🏘️ Rent-to-Income Ratio</h3>
                  <p className="text-muted-foreground">A summary of rent-to-income ratio. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="utilities" className="text-xl font-semibold mb-2 scroll-mt-24">💡 Utilities & Basic Goods</h3>
                  <p className="text-muted-foreground">A summary of utilities and basic goods. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="childcare-costs" className="text-xl font-semibold mb-2 scroll-mt-24">👶 Childcare Costs</h3>
                  <p className="text-muted-foreground">A summary of childcare costs. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="tax-burden" className="text-xl font-semibold mb-2 scroll-mt-24">💰 Tax Burden</h3>
                  <p className="text-muted-foreground">A summary of tax burden. (Placeholder text.)</p>
                </div>
              </div>
            </section>

            <section id="family-community" className="mt-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">👨‍👩‍👧‍👦 Family & Community</h2>
              <p className="text-muted-foreground mb-6">Family & Community explores the quality of life for families, the strength of local communities, and the availability of supportive services. Here, you'll find details on school quality, safety, walkability, and opportunities for community engagement. This overview will help you understand how welcoming and connected the city feels for people of all backgrounds.</p>
              <div className="space-y-8">
                <div>
                  <h3 id="school-quality" className="text-xl font-semibold mb-2 scroll-mt-24">🏫 School Quality</h3>
                  <p className="text-muted-foreground">A summary of school quality. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="family-friendly" className="text-xl font-semibold mb-2 scroll-mt-24">👨‍👩‍👧 Family Friendliness</h3>
                  <p className="text-muted-foreground">A summary of family friendliness. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="safety" className="text-xl font-semibold mb-2 scroll-mt-24">🚓 Safety/Crime Rate</h3>
                  <p className="text-muted-foreground">A summary of safety and crime rate. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="community" className="text-xl font-semibold mb-2 scroll-mt-24">🤝 Community Engagement</h3>
                  <p className="text-muted-foreground">A summary of community engagement. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="walkability" className="text-xl font-semibold mb-2 scroll-mt-24">🚶 Walkability</h3>
                  <p className="text-muted-foreground">A summary of walkability. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="public-services" className="text-xl font-semibold mb-2 scroll-mt-24">🏛️ Public Services Access</h3>
                  <p className="text-muted-foreground">A summary of public services access. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="spirituality" className="text-xl font-semibold mb-2 scroll-mt-24">⛪ Spiritual Access</h3>
                  <p className="text-muted-foreground">A summary of spiritual access. (Placeholder text.)</p>
                </div>
              </div>
            </section>

            <section id="work-flexibility" className="mt-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">💻 Work & Flexibility</h2>
              <p className="text-muted-foreground mb-6">Work & Flexibility covers the city's readiness for remote work, job market resilience, and the daily realities of commuting. This section will highlight internet speed, remote work infrastructure, and employment opportunities, as well as how easy it is to get to work or work from home. Future updates will draw on real data to help you assess your career and lifestyle options here.</p>
              <div className="space-y-8">
                <div>
                  <h3 id="internet-speed" className="text-xl font-semibold mb-2 scroll-mt-24">🌐 Internet Speed (Mbps)</h3>
                  <p className="text-muted-foreground">A summary of internet speed. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="remote-readiness" className="text-xl font-semibold mb-2 scroll-mt-24">🖥️ Remote Work Readiness</h3>
                  <p className="text-muted-foreground">A summary of remote work readiness. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="commute" className="text-xl font-semibold mb-2 scroll-mt-24">🚗 Commute Time</h3>
                  <p className="text-muted-foreground">A summary of commute time. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="job-market" className="text-xl font-semibold mb-2 scroll-mt-24">📈 Job Market Resilience</h3>
                  <p className="text-muted-foreground">A summary of job market resilience. (Placeholder text.)</p>
                </div>
              </div>
            </section>

            <section id="health-longevity" className="mt-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">🌱 Health & Longevity</h2>
              <p className="text-muted-foreground mb-6">Health & Longevity summarizes the factors that contribute to a long, healthy life in this city. You'll learn about air and water quality, healthcare access, life expectancy, and mental wellbeing. This section will be regularly updated with the latest health data and resources to help you make informed decisions about your wellbeing.</p>
              <div className="space-y-8">
                <div>
                  <h3 id="air-quality" className="text-xl font-semibold mb-2 scroll-mt-24">🌬️ Air Quality</h3>
                  <p className="text-muted-foreground">A summary of air quality. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="water-quality" className="text-xl font-semibold mb-2 scroll-mt-24">🚿 Water Quality</h3>
                  <p className="text-muted-foreground">A summary of water quality. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="healthcare" className="text-xl font-semibold mb-2 scroll-mt-24">🏥 Healthcare Access</h3>
                  <p className="text-muted-foreground">A summary of healthcare access. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="life-expectancy" className="text-xl font-semibold mb-2 scroll-mt-24">⏳ Life Expectancy</h3>
                  <p className="text-muted-foreground">A summary of life expectancy. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="mental-health" className="text-xl font-semibold mb-2 scroll-mt-24">😊 Mental Health & Wellbeing</h3>
                  <p className="text-muted-foreground">A summary of mental health and wellbeing. (Placeholder text.)</p>
                </div>
              </div>
            </section>

            <section id="pace-vibe-freedom" className="mt-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">✨ Pace, Vibe, and Freedom</h2>
              <p className="text-muted-foreground mb-6">Pace, Vibe, and Freedom describes the unique atmosphere of the city, including its pace of life, political climate, and sense of personal freedom. Whether you're seeking a relaxed environment or a vibrant, fast-paced lifestyle, this section will help you understand the city's overall vibe and what makes it special. Insights will be drawn from both data and local perspectives.</p>
              <div className="space-y-8">
                <div>
                  <h3 id="pace-of-life" className="text-xl font-semibold mb-2 scroll-mt-24">🐢 Pace of Life</h3>
                  <p className="text-muted-foreground">A summary of pace of life. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="freedom" className="text-xl font-semibold mb-2 scroll-mt-24">🗳️ Political Climate / Personal Freedom</h3>
                  <p className="text-muted-foreground">A summary of political climate and personal freedom. (Placeholder text.)</p>
                </div>
              </div>
            </section>

            <section id="mobility-access" className="mt-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">🚀 Mobility & Access</h2>
              <p className="text-muted-foreground mb-6">Mobility & Access evaluates how easy it is to get around the city and connect to the wider region. This overview will cover airport access, public transportation, regional transit, and options for commuting by car, bike, or public transit. You'll also find information on EV charging and how well the city is connected to major metro areas, making it easier to plan your daily life and travels.</p>
              <div className="space-y-8">
                <div>
                  <h3 id="airport-access" className="text-xl font-semibold mb-2 scroll-mt-24">✈️ Airport Access</h3>
                  <p className="text-muted-foreground">A summary of airport access. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="regional-transit" className="text-xl font-semibold mb-2 scroll-mt-24">🚆 Regional Transit Connectivity</h3>
                  <p className="text-muted-foreground">A summary of regional transit connectivity. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="public-transportation" className="text-xl font-semibold mb-2 scroll-mt-24">🚌 Public Transportation Score</h3>
                  <p className="text-muted-foreground">A summary of public transportation score. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="commute-versatility" className="text-xl font-semibold mb-2 scroll-mt-24">🚴 Commute Versatility</h3>
                  <p className="text-muted-foreground">A summary of commute versatility. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="metro-commute" className="text-xl font-semibold mb-2 scroll-mt-24">🗺️ Commute to Major Metro</h3>
                  <p className="text-muted-foreground">A summary of commute to major metro. (Placeholder text.)</p>
                </div>
                <div>
                  <h3 id="ev-charging" className="text-xl font-semibold mb-2 scroll-mt-24">⚡ EV Charging Access</h3>
                  <p className="text-muted-foreground">A summary of EV charging access. (Placeholder text.)</p>
                </div>
              </div>
            </section>
            <p className="text-muted-foreground mb-6">
              Region: {city.region} <br />
              Country: {city.country} <br />
              Population: {city.population?.toLocaleString() ?? "Unknown"}
            </p>
            {/* Add more city details here as needed */}
          </div>
          <div className="hidden text-sm lg:block">
            <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
              <div className="space-y-4">
                <div className="font-medium">On this page</div>
                <ul className="m-0 list-none">
                  <li className="mt-0 pt-2">
                    <a href="#introduction" className="text-muted-foreground hover:text-foreground">
                      Introduction
                    </a>
                  </li>
                  <li className="mt-0 pt-2">
                    <a href="#lq-score" className="text-muted-foreground hover:text-foreground">
                      LQ Score
                    </a>
                  </li>
                  <li className="mt-0 pt-2">
                    <a href="#affordability-accessibility" className="text-muted-foreground hover:text-foreground">
                      Affordability & Accessibility
                    </a>
                  </li>
                  <li className="mt-0 pt-2">
                    <a href="#family-community" className="text-muted-foreground hover:text-foreground">
                      Family & Community
                    </a>
                  </li>
                  <li className="mt-0 pt-2">
                    <a href="#work-flexibility" className="text-muted-foreground hover:text-foreground">
                      Work & Flexibility
                    </a>
                  </li>
                  <li className="mt-0 pt-2">
                    <a href="#health-longevity" className="text-muted-foreground hover:text-foreground">
                      Health & Longevity
                    </a>
                  </li>
                  <li className="mt-0 pt-2">
                    <a href="#pace-vibe-freedom" className="text-muted-foreground hover:text-foreground">
                      Pace, Vibe, and Freedom
                    </a>
                  </li>
                  <li className="mt-0 pt-2">
                    <a href="#mobility-access" className="text-muted-foreground hover:text-foreground">
                      Mobility & Access
                    </a>
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
