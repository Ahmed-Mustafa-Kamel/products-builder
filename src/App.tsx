import ProductCard from './Components/productCard'
import { productList } from './data'
import Modal from './Components/UI/Modal'
import { useState } from 'react'
import Button from './Components/UI/Button'

const App = () => {

  /* ___ STATE ___ */

  const [isOpen, setIsOpen] = useState(false)

  /* ___ HANDLER ___ */

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  /* ___ RENDER ___ */



  const renderProductList = productList.map(product => < ProductCard key={product.id} product={product} />)
  return (
    <main className='container mx-auto xl:px-20'>
      <Button className='bg-green-600 flex-1' onClick={open}>Add</Button>
      <Modal isOpen={isOpen} close={close} title={"Add New Product"} >
        <div className='flex gap-4'>

          <Button className='bg-red-600 flex-1'>Cancel</Button>
          <Button className='bg-blue-400 flex-1'>Submit</Button>
        </div>
      </Modal>
      <div className='m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 '>
        {renderProductList}

      </div>
    </main>

  )
}

export default App