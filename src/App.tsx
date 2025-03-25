import ProductCard from "./components/ProductCard";
import { productList } from "./data";

function App() {
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <>
      <section className="grid grid-cols-1 gap-4 p-8 md:p-16 lg:p-24 md:grid-cols-2 lg:grid-cols-4 ">
        {renderProductList}
      </section>
    </>
  );
}

export default App;
