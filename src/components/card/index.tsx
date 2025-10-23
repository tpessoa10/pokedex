
import { PokemonsProps } from "@/types/pokemons"
import Image from "next/image"
import Link from "next/link"
import { Chip } from "./components"


export function Card({ name, url, id, types }: PokemonsProps) {

    return (
        <Link className="bg-white rounded mx-2 my-2 h-[40vh] flex flex-col items-center w-[18vw] border-1 border-gray-300 max-sm:w-[80%]" href={`/pokemon/${id}`}>
            <div className="w-full text-xl">
                <h2 className="font-medium mt-3 ml-3">{name}</h2>
            </div>
            <div className="w-[90%] flex items-center justify-center h-[60%] mt-2">
                <div className="w-full h-full relative">
                    <Image alt="" className="transition-transform duration-500 ease-in-out hover:scale-110" fill priority quality={100} src={url as string} />
                </div>
            </div>
            <div className="h-[40%] mt-2 flex flex-row gap-2 justify-center items-center">
                {types?.map((type, index) => (
                    <Chip key={index} type={type}/>
                ))}
            </div>
        </Link>
    )
}