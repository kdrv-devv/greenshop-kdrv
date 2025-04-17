import { useReduxSelctor } from "../../../hooks/useRedux";
import PricesTotal from "../../products-shop/card-total/prices";
import CheckData from "./card";

const OrdersProduct = () => {
  const { shop } = useReduxSelctor((state) => state.shopSlice);
  return (
    <div>
      {shop.map((value) => (
        <CheckData key={value._id} {...value} />
      ))}
      <PricesTotal />
    </div>
  );
};

export default OrdersProduct;
