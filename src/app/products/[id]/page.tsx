import { supabase } from "@/lib/supabaseClient"

interface ProductDetailsProps {
  params: {
    id: string
  }
}

export default async function ProductDetailsPage({ params }: ProductDetailsProps) {
  const { id } = params

  // Merr produktin sipas ID
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex items-center justify-center">
        <p className="text-red-400 text-lg font-semibold bg-white p-6 rounded-xl shadow-lg">
          Error: {error.message}
        </p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex items-center justify-center">
        <p className="text-gray-400 text-lg font-semibold bg-white p-6 rounded-xl shadow-lg">
          Produkti nuk u gjet.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 transform transition-all hover:scale-105 duration-300">
        <h1 className="text-4xl font-bold text-pink-600 mb-4 font-cute drop-shadow-sm">
          {product.name}
        </h1>
        <p className="text-gray-600 mb-6 text-lg font-light leading-relaxed">
          {product.description || "Pa përshkrim"}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold text-purple-700 drop-shadow-sm">
            {product.price} €
          </p>
          {product.color && (
            <span className="inline-block px-5 py-2 text-sm rounded-full bg-pink-100 text-pink-600 font-semibold transform hover:rotate-3 transition-transform">
              {product.color}
            </span>
          )}
        </div>
        <div className="mt-8 flex justify-center">
          <button className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors duration-200 font-semibold text-lg shadow-md">
            Shto në Shportë
          </button>
        </div>
      </div>
    </div>
  )
}