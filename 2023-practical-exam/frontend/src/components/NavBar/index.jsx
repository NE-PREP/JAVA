import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { ShoppingCartContext } from "../../contexts";
import { ShoppingCart } from "../ShoppingCart";

const Navbar = () => {
  const {signOut, account, saveSignOut, setCartProducts, setIsCheckoutSideMenuOpen, setSearchByTitle, setIsProductDetailOpen } =
    useContext(ShoppingCartContext);
  const activeStyle = "underline underline-offset-4";

  const isUserSignOut = signOut;

  const handleSignOut = () => {
    setCartProducts([]);
    setIsCheckoutSideMenuOpen();
    setIsProductDetailOpen(false);
    setSearchByTitle('');
    saveSignOut(true);
  };

  const renderView = () => {
    if (!isUserSignOut) {
      return (
        <>
          <li className="hidden text-black/60 tablet:hidden laptop:block desktop:block ">
            { account?.email }
          </li>
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={() => handleSignOut()}
            >
              Sign out
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => handleSignOut()}
          >
            Sign In
          </NavLink>
        </li>
      );
    }
  };

  return (
    <nav className="fixed top-0 z-10 flex items-center justify-between w-full px-8 py-5 text-sm font-light bg-white shadow-sm">
      <ul className="flex items-center gap-3">
        <li className="text-lg font-semibold">
          <NavLink to={`${isUserSignOut ? "/sign-in" : "/"}`}>Binary Supermarket</NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        {renderView()}
        <li className="flex items-center">
          <ShoppingCart />
        </li>
      </ul>
    </nav>
  );
};

export { Navbar };
