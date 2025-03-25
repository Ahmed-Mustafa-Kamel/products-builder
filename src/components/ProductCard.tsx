import Button from "./ui/Button";
import Image from "./Image";
import { IProduct } from "../interfaces";
import { textSlicer } from "./functions";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const { description, imageURL, price, title, category } = product;
  return (
    <div className="border p-2 rounded-md flex flex-col max-w-sm">
      {/* product image */}

      <Image
        imgURL={imageURL}
        alt={"product image"}
        className={"rounded-md mb-2"}
      />

      {/* product titile */}
      <h2 className="text-lg font-bold text-gray-700 mt-2">{title}</h2>

      {/* product description */}
      <p className="text-sm">{textSlicer(description)}</p>

      {/* colors */}
      <div className="flex flex-wrap mt-2 gap-2 my-4">
        <span className="w-5 h-5 rounded-full cursor-pointer bg-red-600"></span>
        <span className="w-5 h-5 rounded-full cursor-pointer bg-blue-600"></span>
        <span className="w-5 h-5 rounded-full cursor-pointer bg-yellow-300"></span>
      </div>

      {/* price and category*/}
      <div className="flex items-center my-4 justify-between">
        <span>
          $<span className="text-lg font-bold">{price}</span>
        </span>
        <Image
          imgURL={category.imageURL}
          alt={"Product img"}
          className={"w-10 h-10 rounded-full object-cover"}
        />
      </div>

      {/* buttons */}
      <div className="flex justify-around mt-4 gap-2">
        <Button className={"bg-indigo-500 hover:bg-indigo-700 flex-1"}>
          Edit
        </Button>

        <Button className={"bg-orange-500 hover:bg-orange-700 flex-1"}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
