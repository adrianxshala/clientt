"use client"

import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Lista e Produkteve
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            Nuk ka produkte për momentin.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    <Link href={`/products/${p.id}`} className="hover:underline">
                      {p.name}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {p.description || "Pa përshkrim"}
                  </p>
                </div>

                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {p.price} €
                  </p>
                  {p.color && (
                    <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
                      {p.color}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
