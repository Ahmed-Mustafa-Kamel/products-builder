import { IProduct } from "../interfaces"
import { textSlicer } from "../utils/functions"
import Image from "./Image"
import Button from "./UI/Button"

interface IProps {
  product: IProduct
}

const ProductCard = ({ product: { title, imageURL, description, category } }: IProps) => {

  return (
    <div className="max-w-2xs md:max-w-xs mx-auto  border rounded-md p-2 flex flex-col justify-around gap-2">
      <Image imageURL={imageURL} alt="product" className="rounded-md h-[45%] object-cover" />

      <h3 className='font-bold text-black'>{title}</h3>
      <p >{textSlicer(description)}</p>

      <div className="flex gap-2 items-center">
        <span className="w-5 h-5 bg-blue-600 rounded-full cursor-pointer"></span>
        <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer"></span>
        <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer"></span>
      </div>

      <div className="flex justify-between items-center">
        <span>$500,000</span>
        <Image className="w-10 h-10 rounded-full object-cover" imageURL={category.imageURL} alt="category" />
      </div>

      <div className="flex gap-2 items-end">
        <Button className="bg-blue-500 hover:bg-blue-700"  >Edit</Button>
        <Button className="bg-red-500 hover:bg-red-700 ">Delete</Button>

      </div>

    </div>
  )
}

export default ProductCard