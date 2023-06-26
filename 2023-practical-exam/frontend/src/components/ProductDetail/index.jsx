import { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../contexts";

const ProductDetail = () => {
  const { productToShow, isProductDetailOpen, setIsProductDetailOpen } = useContext(ShoppingCartContext);

  return (
    <aside
      className={`${
        isProductDetailOpen ? "flex" : "hidden"
      } flex-col fixed right-0 border bg-white border-black overflow-y-scroll rounded-lg w-[360px] h-[calc(100vh-68px)] top-17`}
    >
      <div className="flex items-center justify-between p-6">
        <h2 className="text-xl font-medium">Detail</h2>
        <div>
          <XMarkIcon
            onClick={() => setIsProductDetailOpen(false)}
            className="w-6 h-6 text-black"
          />
        </div>
      </div>
      <figure className="px-6">
        <img
          className="w-full h-full rounded-lg"
          src={productToShow.image}
          alt={productToShow.name}
        />
      </figure>
      <p className="flex flex-col p-6">
        <span className="mb-2 text-2xl font-medium">
          {productToShow.price} RWF
        </span>
        <span className="mb-6 font-medium text-md">{productToShow.name}</span>
        <span className="text-sm font-light">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</span>
      </p>
    </aside>
  );
};

export { ProductDetail };
