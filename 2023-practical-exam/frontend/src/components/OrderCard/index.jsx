import { XMarkIcon } from "@heroicons/react/24/solid";

const OrderCard = (props) => {
  const { id, title, imageUrl, price, handleDelete } = props;

  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <figure className="w-20 h-20">
          <img
            className="object-cover w-full h-full rounded-lg"
            src={imageUrl}
            alt={title}
          />
        </figure>
        <p className="text-sm font-light">{title}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium">{price} RWF</p>
        {handleDelete && (
          <XMarkIcon
            onClick={() => handleDelete(id)}
            className="w-6 h-6 text-black cursor-pointer"
          />
        )}
      </div>
      <div className="flex items-center w-20 gap-24">
        <button
          onClick={() => props.handleBuy(props.code, props.quantity)}
          className="w-full p-2 text-white bg-black rounded-lg cursor-pointer disabled:bg-black/40"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export { OrderCard };
