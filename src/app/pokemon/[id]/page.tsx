"use client"

import { Chip } from "@/components/card/components"
import { Pokemon } from "@/types/pokemon"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { StatBar } from "../components"

export default function DetalhePokemon() {
    const [data, setData] = useState<Pokemon>()
    const params = useParams()
    const id = params.id as string

    async function getPokemon() {
        try {
            if (id) {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                if (!res.ok) {
                    throw new Error("Failed to fetch")
                }
                const data = await res.json()
                console.log('data ', data)
                setData(data)
            }
        } catch (error) {
            throw new Error("Failed to fetch")
        }
    }

    useEffect(() => {
        getPokemon()
    }, [])

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="flex flex-col  items-center w-10/12 h-10/12 ">
                <div className="flex mb-4 justify-around items-center flex-row w-full h-[30%]">
                    <div className="w-[20%] h-[70%] relative">
                        <Image alt="" priority quality={100} fill src={`https://projectpokemon.org/images/normal-sprite/${data?.name}.gif`} />
                    </div>
                    <div className="">
                        <h1 className="text-6xl">{data?.name}</h1>
                        <div className="flex flex-row gap-2 mt-4">
                            {data && data!.types.map((t) => (
                                <Chip key={t.slot} type={t.type.name} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-[90%] mt-4 rounded-2xl bg-gray-100">
                    <h1 className="text-3xl ml-2 mt-2">Estatísticas</h1>
                    <div className="flex mt-2 flex-col items-center mb-4">
                        {data?.stats.map((stat) => (
                            <div className="flex w-[95%] flex-row items-center justify-between">
                                <p>{stat.stat.name}</p>
                                <div className="flex flex-row gap-4 items-center justify-center w-[30%]">
                                    <p className="inline-block w-10 text-right">{stat.base_stat}</p>
                                    <StatBar value={stat.base_stat}  />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}