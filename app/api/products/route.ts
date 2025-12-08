import {prisma} from "@/lib/db";

export async function GET(){
  const products = await prisma.product.findMany();
  return Response.json(products);
}



export async function POST(req: Request) {
  const data = await req.json();

  const product = await prisma.product.create({
    data,
  });

  return Response.json(product);
}