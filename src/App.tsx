import ProductCard from './Components/productCard'
import { formInputsList, productList } from './data'
import Modal from './Components/UI/Modal'
import { useState } from 'react'
import Button from './Components/UI/Button'
import Input from './Components/UI/Input'
import { IProduct } from './interfaces'
import { productValidation } from './validation'
import Error from './Components/UI/Error'

const App = () => {
  
  const productOBJ = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  }

  /* ___ STATE ___ */

const [product, setProduct] = useState<IProduct>(productOBJ)

  const [isOpen, setIsOpen] = useState(false)

  const [errors , setErrors] = useState({title: "",description: "",imageURL: "",price: ""})

  /* ___ HANDLER ___ */
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  // cancel handler
  const onCancel = () => {
    setProduct(productOBJ)
    close()
  }

  // changing values handler
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // get name and value
    const { name, value } = event.target
    // update product state
    setProduct({...product,[name]:value})
    // reset error message
    setErrors({...errors ,  [name]:""})
  }
  

  // submit handler
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const errors = productValidation({title: product.title , description: product.description , imageURL: product.imageURL , price: product.price })
    // update error state
    setErrors(errors)
    
    // ** cheking if any property has a value of "" && chek if all properties have a value of ""
    const hasErrorMsg = Object.values(errors).some(value => value == "") && Object.values(errors).every(value => value == "")
    if(!hasErrorMsg){
      setErrors(errors)
      return
    }
    console.log('send product to api')
    setProduct(productOBJ)
    close()
    
    // ** if no errors, then send the data to the server
  }



  /* ___ RENDER ___ */
  const renderProductList = productList.map(product => < ProductCard key={product.id} product={product} />)


  const renderFormInput = formInputsList.map(input => (
  <div className='flex flex-col my-4' key={input.id}>
  <label htmlFor={input.id}>{input.label}</label>
  <Input id={input.id} name={input.name} type={input.type} value={product[input.name]} onChange={onChangeHandler}/>
  <Error message={errors[input.name]} />
  </div>))



  return (
    <main className='container mx-auto xl:px-20 flex flex-col gap-4'>
      <Button className='bg-indigo-600 flex-1  mx-auto' onClick={open}>Add</Button>
      <Modal isOpen={isOpen} close={close} title={"Add New Product"}>
        <form  className='flex flex-col space-y-4' onSubmit={submitHandler}>
        {renderFormInput}
        <div className='flex gap-4'>
          <Button className='bg-indigo-400 flex-1'>Submit</Button>
          <Button className='bg-gray-500 flex-1 hover:bg-red-500 transition-colors duration-200 ease-in-out' onClick={onCancel}>Cancel</Button>
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