import { LoaderFunctionArgs } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { Products as ProductType } from "~/types/types"

export const loader = async({ params }:LoaderFunctionArgs)=>{
const response = await fetch(`https://fakestoreapi.com/products/${params.productid}`)
const data:ProductType = await response.json()
return Response.json({data})
}

const Products = () => {
  const { data } = useLoaderData<typeof loader>();
  console.log(data);
  
  return (
    <div className="w-full max-w-screen-lg mx-auto min-h-screen my-6 px-3">
      <Link to={'/'}>Back</Link>
      <h1 className="text-4xl my-3 font-bold">Product Details</h1>
      <div className="w-full flex sm:flex-row flex-col items-start justify-between gap-5 mt-6">
<div className="">

      <h1 className="text-2xl my-3 font-bold">{data.title}</h1>
      <p>{data.description}</p>
      <span className="bg-indigo-700 flex rounded-md h-7 items-center justify-center w-fit px-3">$ {data.price}</span>
</div>
      <img src={data.image} alt={data.title} className="w-full max-w-80 flex justify-end" />
      </div>
    </div>
  );
};

export default Products;
