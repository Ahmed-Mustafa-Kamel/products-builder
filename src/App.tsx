import ProductCard from './Components/productCard'
import { Categories, colors, formInputsList, productList } from './data'
import Modal from './Components/UI/Modal'
import { useState } from 'react'
import Button from './Components/UI/Button'
import Input from './Components/UI/Input'
import { IProduct } from './interfaces'
import { productValidation } from './validation'
import Error from './Components/UI/Error'
import ColorCircle from './Components/ColorCircle'
import { v4 as uuid } from "uuid";
import SelectMenu from './Components/UI/SelectMenu'
import { ProductNameTypes } from './types'

const App = () => {
  
  // product object
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

  /* ___ STATES ___ */

// products state
const [products, setProducts] = useState<IProduct[]>(productList)

  // product state
const [product, setProduct] = useState<IProduct>(productOBJ);

  // open modal state
  const [isOpen, setIsOpen] = useState(false);

  // open edit modal state
  const [isOpenEditModal , setOpenEditModal] = useState(false)

  // errors state
  const [errors , setErrors] = useState({title: "",description: "",imageURL: "",price: "" , });

  //  temporary colors state to store colors before submitting
  const [tempColors , setTempColor ] = useState<string[]>([])
  // selected category state
    const [selectedCategory, setSelectedCategory] = useState(Categories[0])
  // product to edit state
  const [productToEdit , setProductToEdit] = useState<IProduct>(productOBJ)

  console.log("product to edit" , productToEdit)




  /* ___ HANDLERS ___ */
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const openEditModal = () => setOpenEditModal(true)
  const closeEditModal = () => setOpenEditModal(false)
  // cancel handler
  const onCancel = () => {
    setProduct(productOBJ)
    closeModal()  
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
  // changing edit values handler
  const onChangeEditHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // get name and value
    const { name, value } = event.target
    // update product state
    setProductToEdit({...productToEdit,[name]:value})
    // reset error message
    setErrors({...errors ,  [name]:""})
  }
  

  // submit handler
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const errors = productValidation({title: product.title , description: product.description , imageURL: product.imageURL , price: product.price  })
    // update error state
    setErrors(errors)
    
    // ** cheking if any property has a value of "" && chek if all properties have a value of ""
    const hasErrorMsg = Object.values(errors).some(value => value == "") && Object.values(errors).every(value => value == "" && tempColors.length > 0)
    if(!hasErrorMsg){
      setErrors(errors)
      return
    }

    setProducts((prev)=>[{...product , id: uuid() , colors: tempColors ,category: selectedCategory} , ...prev])
    // console.log('send product to api')  
    setProduct(productOBJ)
    setTempColor([])
    close()
    
    // ** if no errors, then send the data to the server
  }
  // submit edit handler
  const submitEditHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const {title , description , imageURL , price} = productToEdit
    const errors = productValidation({title , description , imageURL , price})
    // update error state
    setErrors(errors)
    
    // ** cheking if any property has a value of "" && chek if all properties have a value of ""
    const hasErrorMsg = Object.values(errors).some(value => value == "") && Object.values(errors).every(value => value == "" && tempColors.length > 0)
    if(!hasErrorMsg){
      setErrors(errors)
      return
    }

    // setProducts((prev)=>[{...product , id: uuid() , colors: tempColors ,category: selectedCategory} , ...prev])




    // console.log('send product to api')  
    setProductToEdit(productOBJ)
    setTempColor([])
    closeEditModal()
    
    // ** if no errors, then send the data to the server
  }



  /* ___ RENDERS ___ */
  const renderProductList = products.map(product => <ProductCard key={product.id} product={product} setProductToEdit={setProductToEdit} openEditModal={openEditModal}/>)


  const renderFormInput = formInputsList.map(input => (
  <div className='flex flex-col my-4' key={input.id}>
  <label htmlFor={input.id}>{input.label}</label>
  <Input id={input.id} name={input.name} type={input.type} value={product[input.name]} onChange={onChangeHandler}/>
  <Error message={errors[input.name]} />
  </div>));

  const renderProductColors = colors.map(color => <ColorCircle key={color} color={color} onClick={()=>{
    if(tempColors.includes(color)){
      setTempColor((prev)=>prev.filter((item)=>item !== color))
      return
    }
    setTempColor((prev)=>[...prev , color])
  }} />)



  const renderProductEditWithErrorMsg = (id:string , label:string , name: ProductNameTypes) =>{
    return(
    <div className='flex flex-col my-4' >
    <label htmlFor={id}>{label}</label>
    <Input id={id} name={name} type={"text"} value={productToEdit[name]} onChange={onChangeEditHandler}/>
    <Error message={errors[name]} />
    </div>
    )
  }



  return (
    <main className='container mx-auto xl:px-20 flex flex-col gap-4'>
      <Button className='bg-indigo-600 mx-auto' onClick={openModal}>Add New Product</Button>
    {/* Add Product Modal */}
      <Modal isOpen={isOpen} close={closeModal} title={"Add New Product"}>
        <form  className='flex flex-col space-y-4' onSubmit={submitHandler}>
        {renderFormInput}
        <div className=" relative">
        <SelectMenu selected={selectedCategory} setSelected={setSelectedCategory}/>
        </div>
        <div className="flex gap-2">{renderProductColors}</div>
        <div className="flex gap-2 flex-wrap ">{tempColors.map(color => <span key={color} style={{backgroundColor: color}} className="border border-gray-300 p-1 rounded-lg ">{color}</span>)}</div>
        <div className='flex gap-4'>
          <Button className='bg-indigo-400 flex-1'>Submit</Button>
          <Button className='bg-red-500 transition-colors duration-200 ease-in-out' onClick={onCancel}>Cancel</Button>
        </div>
        </form>
      </Modal>


      {/* Edit Product Modal */}
      <Modal isOpen={isOpenEditModal} close={closeEditModal} title={"Edit Product"} >
        <form  className='flex flex-col space-y-4' onSubmit={submitEditHandler}>
        {renderProductEditWithErrorMsg("title" , "Product Title" , "title")}
        {renderProductEditWithErrorMsg("description" , "Product Description" , "description")}
        {renderProductEditWithErrorMsg("imageURL" , "Product Image URL" , "imageURL")}
        {renderProductEditWithErrorMsg("price" , "Product Price" , "price")}

        <div className=" relative">
        {/* <SelectMenu selected={selectedCategory} setSelected={setSelectedCategory}/> */}
        </div>
        {/* <div className="flex gap-2">{renderProductColors}</div> */}
        {/* <div className="flex gap-2 flex-wrap ">{tempColors.map(color => <span key={color} style={{backgroundColor: color}} className="border border-gray-300 p-1 rounded-lg ">{color}</span>)}</div> */}

        <div className='flex gap-4'>
          <Button className='bg-indigo-400 flex-1'>Submit</Button>
          <Button className='bg-red-500 transition-colors duration-200 ease-in-out' onClick={closeEditModal}>Cancel</Button>
        </div>
        </form>
      </Modal>


      {/* Products List */}
      <div className='m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 '>
        {renderProductList}
      </div>
    </main>

  )
}

export default App