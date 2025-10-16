"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { FiSearch } from "react-icons/fi"
import { useState } from "react"

export function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("query") || "")

  const handleSearch = () => {
    if (query.trim() === "") {
      router.push("/") // limpa busca
    } else {
      router.push(`/?query=${query}`)
    }
  }

  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Pesquise por um Pokémon"
        className="border rounded p-1.5 w-[200px] bg-gray-100"
        type="text"
      />
      <button
        onClick={handleSearch}
        className="border p-1.5 rounded cursor-pointer bg-blue-500 text-white"
      >
        <FiSearch size={22} />
      </button>
    </div>
  )
}