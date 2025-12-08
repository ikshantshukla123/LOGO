"use server";

import { prisma } from "@/lib/db";

export async function prismaCreateProduct(data: {
  name: string;
  description?: string;
  price: number;
  images: string[];
  sizes: string[];
}) {
  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      images: data.images,
      sizes: data.sizes,
    },
  });

  return product;
}
