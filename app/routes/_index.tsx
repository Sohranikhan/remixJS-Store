import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Products } from "~/types/types";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
    { name: "keywords", content: "Akdevz, Remix" },
  ];
};


export const loader = async() =>{
const response = await fetch('https://fakestoreapi.com/products')
const data: Products = await response.json() 
return Response.json({data});
}

export default function Index() {
  const {data} = useLoaderData<typeof loader>()
  return (
    <div className="flex flex-col gap-3 h-auto items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to Remix!</h1>
      <p>This is a simple example of a Remix app.</p>
      <Link to="/page">About</Link>
      <div className="mt-4">
        <h2>Products</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
          {data.map((product:Products) => (
            <li key={product.id} className="p-3 shadow-md rounded-lg max-w-80">
              <img src={product.image} alt={product.title} className="w-full max-w-96 h-56 object-cover align-top rounded-lg" />
              <Link to={`/product/${product.id}`}>{product.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}