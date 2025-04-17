import BreadcrumbItem from "../../generic/breadcrump-item";
import OrdersForms from "./oders-forms";
import OrdersProduct from "./orders-product";

const ProductCheckoutComponent = () => {
  return (
    <section className="w-[90%] m-auto py-5">
      <BreadcrumbItem pathTitle="Checkout" />
      <div className="grid grid-cols-[2.5fr_2fr] gap-20">
        <OrdersForms />
        <OrdersProduct />
      </div>
    </section>
  );
};

export default ProductCheckoutComponent;
