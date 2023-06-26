import { useContext } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { CheckIcon } from "@heroicons/react/24/solid";

import { ShoppingCartContext } from "../../contexts";

const Card = (data) => {
  const {
    setIsProductDetailOpen,
    setProductToShow,
    cartProducts,
    setCartProducts,
    setIsCheckoutSideMenuOpen,
  } = useContext(ShoppingCartContext);

  const showProduct = (productDetail) => {
    setIsCheckoutSideMenuOpen(false);
    setIsProductDetailOpen(true);
    setProductToShow(productDetail);
  };

  const addProductsToCart = (event, productData) => {
    event.stopPropagation();
    setCartProducts([...cartProducts, productData]);
    setIsCheckoutSideMenuOpen(true);
    setIsProductDetailOpen(false);
  };

  const renderIcon = (id) => {
    const isInCart = cartProducts?.filter(product => product.code === id).length > 0;

    if (isInCart) {
      return (
        <button
          className='absolute top-0 right-0 flex items-center justify-center w-6 h-6 p-1 m-2 bg-black rounded-full'>
          <CheckIcon className='w-6 h-6 text-white'/>
        </button>
      )
    } else {
      return (
        <button
          className='absolute top-0 right-0 flex items-center justify-center p-1 m-2 bg-white rounded-full'
          onClick={(event) => addProductsToCart(event, data)}>
          <PlusIcon className='w-6 h-6 text-black'/>
          <small>
          Add to Cart or Buy
          </small>
        </button>
      )
    }
  }
  return (
    <div
      className="w-56 mb-12 bg-white rounded-lg cursor-pointer h-60"
      onClick={() => showProduct(data)}
    >
      <figure className="relative w-full mb-2 h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">
          {data.type}
        </span>
        <img
          className="object-cover w-full h-full rounded-lg"
          src={data.image}
          alt={data.name}
        />
        {renderIcon(data.code)}
      </figure>
      <p className="flex items-center justify-between">
        <span className="text-sm font-light">{data.name}</span>
        <span className="text-lg font-medium">{data.price} RWF</span>
      </p>
    </div>
  );
};

export { Card };
