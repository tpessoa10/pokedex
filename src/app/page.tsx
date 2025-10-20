import { Card } from "@/components/card/index";
import { PokemonsProps } from "@/types/pokemons";
import { Search } from "@/components/search";
import { Pagination } from "@/components/pagination";

async function getPokemons(page = 1, query?: string) {
  const offset = (page - 1) * 10;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);

  if (!res.ok) throw new Error("Erro ao buscar pokémons");

  const data = await res.json();

  // Para cada Pokémon, buscar os detalhes (incluindo tipos)
  const detailedPokemons = await Promise.all(
    data.results.map(async (p: PokemonsProps) => {
      const id = p.url!.split("/").filter(Boolean).pop();
      const details = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemonData = await details.json();

      const types = pokemonData.types.map((t: any) => t.type.name);

      return {
        id,
        name: p.name,
        url: p.url,
        image: pokemonData.sprites.front_default,
        types,
      };
    })
  );

  // Caso tenha uma query, filtra localmente
  const filteredPokemons = query
    ? detailedPokemons.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    : detailedPokemons;

  return filteredPokemons;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string; query?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const query = searchParams.query;
  const pokemons = await getPokemons(currentPage, query);

  return (
    <main className="flex flex-col items-center min-h-[100vh]">
      <section className="mt-4 w-10/12 flex flex-row justify-between max-md:flex-col max-md:gap-2">
        <h1 className="text-black text-center text-4xl">Pokedex</h1>
        {/*<Search />*/}
      </section>

      <section className="bg-gray-50 grid grid-cols-5 grid-rows-2 border-gray-950 rounded mt-4 min-w-[90vw] min-h-[80vh] 
      max-md:grid-cols-4 max-sm:grid-cols-1 max-sm:place-items-center">

        {pokemons.map((p) => (
          <Card key={p.id} id={p.id} url={p.image} name={p.name} types={p.types} />
        ))}
      </section>

      <Pagination />
    </main>
  );
}
