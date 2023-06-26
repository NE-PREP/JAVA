import { useContext } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../contexts";
import { OrderCard } from "../OrderCard";
import { totalPrice } from "../../utils";

const CheckoutSideMenu = () => {
  const {
    isCheckoutSideMenuOpen,
    setIsCheckoutSideMenuOpen,
    cartProducts,
    setCartProducts,
    order,
    setOrder,
    setSearchByTitle,
  } = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const filteredProducts = cartProducts.filter((product) => product.code != id);
    setCartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    const orderToAdd = {
      date: "26.06.23",
      products: cartProducts,
      totalProducts: cartProducts.length,
      totalPrice: totalPrice(cartProducts),
    };

    setOrder([...order, orderToAdd]);
    setCartProducts([]);
    setIsCheckoutSideMenuOpen(false);
    setSearchByTitle('');
  };

  return (
    <aside
      className={`${
        isCheckoutSideMenuOpen ? "flex" : "hidden"
      } flex-col fixed right-0 border border-black rounded-lg bg-white w-[360px] h-[calc(100vh-82px)] top-17`}
    >
      <div className="flex items-center justify-between p-6">
        <h2 className="text-xl font-medium">My Order</h2>
        <div>
          <XMarkIcon
            className="w-6 h-6 text-black cursor-pointer"
            onClick={() => setIsCheckoutSideMenuOpen(false)}
          ></XMarkIcon>
        </div>
      </div>
      <div className="flex-1 px-6 overflow-y-scroll">
        {cartProducts.map((product) => (
          <OrderCard
            key={product.code}
            id={product.code}
            title={product.name}
            imageUrl={product.image}
            price={product.price}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="px-6 mb-2">
        <p className="flex items-center justify-between mb-2">
          <span className="font-light">Total:</span>
          <span className="text-2xl font-medium">
            {totalPrice(cartProducts)} RWF
          </span>
        </p>
        <Link to="/my-orders/last">
          <button
            className="w-full py-3 text-white bg-black rounded-lg"
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
};

export { CheckoutSideMenu };
