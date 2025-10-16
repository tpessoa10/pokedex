import { PokemonsProps } from "@/types/pokemons"
import Image from "next/image"

export function Card({ name, url }: PokemonsProps) {
    return (
        <div className="bg-pink-100 rounded mx-2 my-2 h-[35vh] flex flex-col items-center w-[15vw] border-1 max-sm:w-[80%]">
            <div className="w-[90%] flex items-center justify-center h-[60%] mt-2">
                <div className="w-full h-full relative">
                    <Image alt="" className="transition-transform duration-500 ease-in-out hover:scale-125" fill priority quality={100} src={url as string} />
                </div>
            </div>
            <div className="h-[40%] mt-2 flex flex-col gap-2 justify-center items-center">
                <p>{name}</p>
            </div>
        </div>
    )
}