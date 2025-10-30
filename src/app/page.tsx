import { Card } from "@/components/card/index";
import { PokemonsProps } from "@/types/pokemons";
import { Search } from "@/components/search";
import { Pagination } from "@/components/pagination";
import { cache } from "react";
import Image from "next/image";

const getPokemonDetails = cache(async (id: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    next: { revalidate: 86400 }, // 24h de cache
  });
  if (!res.ok) return null;
  return res.json();
});

async function getPokemons(page = 1, query?: string) {
  const offset = (page - 1) * 10;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) throw new Error("Erro ao buscar pokémons");

  const data = await res.json();

  const detailedPokemons = await Promise.all(
    data.results.map(async (p: any) => {
      const id = p.url.split("/").filter(Boolean).pop()!;
      const details = await getPokemonDetails(id);

      return {
        id,
        name: p.name,
        image: `https://img.pokemondb.net/sprites/home/normal/${p.name}.png`,
        types: details?.types.map((t: any) => t.type.name) ?? [],
      };
    })
  );

  return query
    ? detailedPokemons.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    )
    : detailedPokemons;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const currentPage = Number((await searchParams).page) || 1;
  const query = (await searchParams).query || "";
  const pokemons = await getPokemons(currentPage, query);

  return (
    <main className="mb-1 flex flex-col items-center min-h-[100vh]">
      <section className="mt-1 w-12/12 flex flex-row justify-between max-sm:flex-col max-sm:gap-2">
        <h1 className="text-black text-center text-4xl max-sm:hidden">Pokedex</h1>
        <Image
            className="max-sm:mx-auto"
            src="/Poké_Ball_icon.svg.png"
            alt="Pokedex Logo"
            width={50}
            height={50}
            priority
          />
        {/*<Search />*/}
      </section>

      <section className="bg-gray-50 grid grid-cols-5 grid-rows-2 max-lg:grid-cols-4 border-gray-950 rounded mt-2 min-w-[85vw] min-h-[80vh] 
      max-md:grid-cols-4 max-sm:grid-cols-1 max-sm:place-items-center">

        {pokemons.map((p) => (
          <Card key={p.id} id={p.id} url={p.image} name={p.name} types={p.types} />
        ))}
      </section>

      <Pagination />
    </main>
  );
}
