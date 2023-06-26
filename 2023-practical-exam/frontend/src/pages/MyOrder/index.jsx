import { useContext } from "react";
import { Link } from "react-router-dom";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../contexts";
import { OrderCard } from "../../components/OrderCard";
import AppServices from "../../services";
import toast from "react-hot-toast";

function MyOrder() {
  const { order } = useContext(ShoppingCartContext);

  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  if (index === "last") index = order?.length - 1;

  const handleBuy = (code, quantity) => {
    toast.promise(AppServices.purchaseProduct({ code, quantity }), {
      loading: "Purchasing...",
      success: (response) => {
        if (response.data) {
          console.log(response.data.data);
        }
        return "Purchased successfully";
      },
      error: (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return message;
      },
    });
  };

  return (
    <>
      <div className="relative flex items-center justify-center mb-6 w-80">
        <Link to="/my-orders" className="absolute left-0">
          <ChevronLeftIcon className="w-6 h-6 text-black cursor-pointer" />
        </Link>
        <h1>My Order</h1>
      </div>
      <div className="flex flex-col w-80">
        {order?.[index]?.products.map((product) => (
          <OrderCard
            handleBuy={handleBuy}
            key={product.code}
            id={product.code}
            title={product.name}
            imageUrl={product.image}
            price={product.price}
            code={product.code}
            quantity ={product.quantity}
          />
        ))}
      </div>
    </>
  );
}
export { MyOrder };
