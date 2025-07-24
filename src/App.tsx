import ProductCard from './Components/productCard'
import { formInputsList, productList } from './data'
import Modal from './Components/UI/Modal'
import { useState } from 'react'
import Button from './Components/UI/Button'
import Input from './Components/UI/Input'
import { IProduct } from './interfaces'

const App = () => {

  /* ___ STATE ___ */

const [product, setProduct] = useState<IProduct>({
  title: "",
  description: "",
  imageURL: "",
  price: "",
  colors: [],
  category: {
    name: "",
    imageURL: "",
  },
})

  const [isOpen, setIsOpen] = useState(false)

  /* ___ HANDLER ___ */
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    console.log(value)
    setProduct({...product,[name]:value})
    
  }
  console.log(product)

  /* ___ RENDER ___ */
  const renderProductList = productList.map(product => < ProductCard key={product.id} product={product} />)


const renderFormInput = formInputsList.map(input => (
<div className='flex flex-col my-4'>
<label htmlFor={input.id}>{input.label}</label>
<Input id={input.id} name={input.name} type={input.type} value={product[input.name]} onChange={onChangeHandler}/>
</div>))



  return (
    <main className='container mx-auto xl:px-20 flex flex-col gap-4'>
      <Button className='bg-green-600 flex-1  mx-auto' onClick={open}>Add</Button>
      <Modal isOpen={isOpen} close={close} title={"Add New Product"}>
        <form  className='flex flex-col space-y-4'>
        {renderFormInput}
        <div className='flex gap-4'>
          <Button className='bg-blue-400 flex-1'>Submit</Button>
          <Button className='bg-gray-500 flex-1 hover:bg-red-500 transition-colors duration-200 ease-in-out' onClick={()=>close()}>Cancel</Button>
        </div>
        </form>
      </Modal>
      <div className='m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 '>
        {renderProductList}

      </div>
    </main>

  )
}

export default App