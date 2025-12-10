"use server";

import { prisma } from "@/lib/db";

export async function createProduct(data: {
  name: string;
  price: number;
  description: string;
  images: string[];
}) {
  return prisma.product.create({
    data,
  });
}
