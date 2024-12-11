import { ActionFunction, MetaFunction } from "@remix-run/node"
import { Form } from "@remix-run/react"
import { PenIcon } from "lucide-react"

export const meta: MetaFunction = () =>{
      return [
        {title: "About Page"},
        { name: "description", content: "Welcome to About Page!" },
      ]
}

export const action: ActionFunction = async({request, params})=>{
  const formData = await request.formData()
  const title = formData.get('title')
  const description = formData.get('description')
  const price = formData.get('price')
  const category = formData.get('category')
  const image = formData.get('image')
  const updateData = await fetch(`https://fakestoreapi.com/products/${params.productid}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title, description, price, category, image})
  })  
  const data = await updateData.json()
  console.log(data);
  return Response.json({data})
}


const updateProduct = () => {
  return (
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold flex gap-2 items-center justify-center"> Update Produt  <PenIcon size={25} /></h1>
      <Form method="patch" className="w-full max-w-[500px]">
        <div className="flex flex-col gap-3 p-3 my-5 w-full">
          <input type="text" name="title" className="input input-bordered " placeholder="Enter Tite of Product" />
          <textarea name="description" id="description" className="textarea textarea-bordered " placeholder="Enter Project Description"></textarea>
          <input type="number" name="price" className="input input-bordered " placeholder="Enter Product Price" />
          <input type="text" name="category" className="input input-bordered " placeholder="Enter Product Category" />
          <input type="text" name="image" className="input input-bordered " placeholder="Enter Product Image URL" />
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </Form>
    </div>
  )
}

export default updateProduct