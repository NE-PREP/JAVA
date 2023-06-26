import { useContext } from "react";

import { Card } from "../../components/Card";
import { ProductDetail } from "../../components/ProductDetail";
import { ShoppingCartContext } from "../../contexts";

function Products() {
  const { setSearchByTitle, filteredItems } = useContext(ShoppingCartContext);

  const renderView = () => {
    return filteredItems?.map((item) => <Card key={item.id} {...item} />);
  };

  return (
    <>
      <div className="relative flex items-center justify-center mb-4 w-80">
        <h1 className="text-xl font-medium">Products</h1>
      </div>
      <input
        type="text"
        placeholder="Search a product"
        className="p-4 mb-4 border border-black rounded-lg w-80 focus:outline-none"
        onChange={(event) => setSearchByTitle(event.target.value)}
      />
      <div className="grid max-w-screen-lg grid-cols-1 gap-6 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 min-w-max">
        {renderView()}
      </div>
      <ProductDetail />
    </>
  );
}

export { Products };
