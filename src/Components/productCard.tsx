import { IProduct } from "../interfaces"
import { textSlicer } from "../utils/functions"
import Image from "./Image"
import Button from "./UI/Button"
import ColorCircle from "./ColorCircle"
interface IProps {
  product: IProduct,
  setProductToEdit: (product: IProduct) => void,
  openEditModal: () => void,
}

const ProductCard = ({ product , setProductToEdit , openEditModal }: IProps) => {
  const { title, imageURL, description, category , price ,colors } = product

  /* ___ RENDER ___ */

  const renderProductColors = colors.map(color => <ColorCircle key={color} color={color}/>)

  /*___ HANDLER ___*/
  const onEdit = () => {
    setProductToEdit(product)
    openEditModal() 
  }



  return (
    <div className="w-full mx-auto  border rounded-md p-2 flex flex-col justify-around gap-2">
      <Image imageURL={imageURL} alt="product" className="rounded-md h-[45%] object-cover" />

      <h3 className='font-bold text-black'>{title}</h3>
      <p >{textSlicer(description)}</p>


      <div className="flex gap-2">{renderProductColors}</div>


      <div className="flex justify-between items-center">
        <span>${price}</span>
        <Image className="w-10 h-10 rounded-full object-cover" imageURL={category.imageURL} alt="category" />
      </div>

      <div className="flex gap-2 items-end">
        <Button className="bg-blue-500 hover:bg-blue-700" onClick={onEdit} >Edit</Button>
        <Button className="bg-red-500 hover:bg-red-700 ">Delete</Button>

      </div>

    </div>
  )
}

export default ProductCard