import { getXataClient } from "@/lib/xata";
import { notFound } from "next/navigation";

const xata = getXataClient();

export const dynamicParams = true;

export async function generateStaticParams() {
  const cities = await xata.db.cities.getAll();
  return cities.map((city) => ({ slug: city.slug }));
}

export default async function CityPage({ params }: { params: { slug: string } }) {
  const city = await xata.db.cities.filter({ slug: params.slug }).getFirst();

  if (!city) return notFound();

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">Living in {city.name}</h1>
      <p className="text-lg text-muted-foreground">
        Country: {city.country} <br />
        Region: {city.region} <br />
        Population: {city.population?.toLocaleString() ?? "Unknown"}
      </p>
    </div>
  );
}
