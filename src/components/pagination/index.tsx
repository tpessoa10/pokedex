"use client";
import { useRouter, useSearchParams } from "next/navigation";

export function Pagination() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  function handlePageChange(newPage: number) {
    if (newPage < 1) return;
    router.push(`/?page=${newPage}`);
  }

  return (
    <div className="flex flex-row justify-center items-center gap-4 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-gray-300 px-4 py-2 rounded cursor-pointer disabled:opacity-50"
      >
         Voltar
      </button>

      <span className="font-semibold">{currentPage}</span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
      >
        Avançar 
      </button>
    </div>
  );
}