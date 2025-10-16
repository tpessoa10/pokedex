import { Card } from "@/components/card";
import { Pagination } from "@/components/pagination";
import { Search } from "@/components/search";
import { PokemonsProps } from "@/types/pokemons";
import Image from "next/image";

async function getPokemons(page = 1, query?: string) {
  const offset = (page - 1) * 10;

  try {
    if (query) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${1000}&offset=${offset}`);
      if (!res.ok) {
        throw new Error("Erro ao buscar pokémons");
      }
      const data = await res.json();
      const filtered = data.results.filter((p: PokemonsProps) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )

      return filtered
    } else {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${10}&offset=${offset}`);
      if (!res.ok) {
        throw new Error("Erro ao buscar pokémons");
      }
      const data = await res.json();
      return data.results;
    }
  } catch (error) {
    console.error('Failed to fetch');
    return [];
  }
}

export default async function Home({ searchParams }: { searchParams: { page?: string, query?: string }, }) {
  const query = searchParams.query
  const currentPage = Number(searchParams.page) || 1;
  const pokemons = await getPokemons(currentPage, query);

  return (
    <main className="flex flex-col bg-blue-100 items-center min-h-[100vh]">
      <section className="mt-4 w-10/12 flex flex-row justify-between max-md:flex-col max-md:gap-2">
        <h1 className="text-black text-center text-4xl">Pokedex</h1>
        <Search />
      </section>

      <section className="bg-gray-50 grid grid-cols-5 grid-rows-2 border-gray-950 rounded mt-4 min-w-[90vw] min-h-[80vh] 
      max-md:grid-cols-4 max-sm:grid-cols-1 max-sm:place-items-center">



        {pokemons.map((p: PokemonsProps) => {
          const id = p.url!.split("/").filter(Boolean).pop();
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return <Card key={id} url={imageUrl} name={p.name} />;
        })}
      </section>

      <Pagination />
    </main>
  );
}