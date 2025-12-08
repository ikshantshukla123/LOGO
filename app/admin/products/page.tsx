import Link from "next/link";

export default function AdminProductsPage() {
  const products = [
    { id: "1", name: "Classic Black Tee", price: 799 },
    { id: "2", name: "Classic White Tee", price: 799 },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Product
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-zinc-700 text-left">
              <th className="py-2">Name</th>
              <th className="py-2">Price</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b dark:border-zinc-700">
                <td className="py-2">{p.name}</td>
                <td className="py-2">₹{p.price}</td>
                <td className="py-2">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
