"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { FaAnglesRight, FaAnglesLeft, FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export function Pagination() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition()
  const currentPage = Number(searchParams.get("page")) || 1;

  function handlePageChange(newPage: number) {
    if (newPage < 1) return;
    startTransition(() => {
      router.push(`/?page=${newPage}`)
    })
  }

  return (
    <div className="flex flex-row justify-center items-center mt-4 max-xl:mb-2">

      {isPending && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      <button
        onClick={() => handlePageChange(currentPage - 5)}
        disabled={currentPage <= 5}
        className="bg-gray-300 mr-2 px-4 py-2 rounded cursor-pointer disabled:opacity-50"
      >
        <FaAnglesLeft />
      </button>
      
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-gray-300 mr-4 px-4 py-2 rounded cursor-pointer disabled:opacity-50"
      >
        <FaAngleLeft />
      </button>

      <span className="font-semibold">{currentPage}</span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="bg-gray-300 ml-4 mr-2 px-4 py-2 rounded cursor-pointer"
      >
        <FaAngleRight />
      </button>

      <button
        onClick={() => handlePageChange(currentPage + 5)}
        className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
      >
        <FaAnglesRight />
      </button>
    </div>
  );
}