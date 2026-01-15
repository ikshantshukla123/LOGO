"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DataTable from "@/components/admin/DataTable";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import { getProducts, deleteProduct } from "@/actions/admin/products";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  images: string[];
  sizes: string[];
  createdAt: Date;
  updatedAt: Date;
  _count: {
    orderItems: number;
  };
}

export default function ProductsClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const result = await getProducts();
      if (result.success && result.data) {
        setProducts(result.data);
      } else {
        toast.error(result.error || "Failed to load products");
      }
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const confirmed = confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`);
    if (!confirmed) return;

    setDeleting(id);
    try {
      const result = await deleteProduct(id);
      if (result.success) {
        setProducts(products.filter(p => p.id !== id));
        toast.success("Product deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete product");
      }
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setDeleting(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price / 100);
  };

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (_: unknown, row: Product) => (
        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-700">
          {row.images[0] ? (
            <Image
              src={row.images[0]}
              alt={row.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Package className="w-6 h-6 text-zinc-400" />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (value: string, row: Product) => (
        <div>
          <div className="font-medium text-zinc-900 dark:text-white">{value}</div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400 truncate max-w-xs">
            {row.description}
          </div>
        </div>
      ),
    },
    {
      key: "price",
      label: "Price",
      sortable: true,
      render: (value: number) => (
        <span className="font-medium text-zinc-900 dark:text-white">
          {formatPrice(value)}
        </span>
      ),
    },
    {
      key: "sizes",
      label: "Sizes",
      render: (value: string[]) => (
        <div className="flex gap-1 flex-wrap">
          {value.slice(0, 3).map((size) => (
            <span
              key={size}
              className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded"
            >
              {size}
            </span>
          ))}
          {value.length > 3 && (
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 rounded">
              +{value.length - 3}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "orders",
      label: "Orders",
      render: (_: unknown, row: Product) => (
        <span className="text-zinc-700 dark:text-zinc-300">
          {row._count.orderItems}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      render: (value: Date) => (
        <span className="text-zinc-700 dark:text-zinc-300">
          {value.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: unknown, row: Product) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/products/${row.id}`}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => handleDelete(row.id, row.name)}
            disabled={deleting === row.id}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
            title="Delete"
          >
            {deleting === row.id ? (
              <LoadingSpinner size="sm" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-8">
        <div className="flex items-center justify-center">
          <LoadingSpinner size="lg" />
          <span className="ml-3 text-zinc-600 dark:text-zinc-400">Loading products...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          {products.length} product{products.length !== 1 ? "s" : ""} found
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <DataTable
        data={products}
        columns={columns}
        searchable
        searchPlaceholder="Search products..."
        emptyMessage="No products found. Create your first product to get started."
      />
    </div>
  );
}