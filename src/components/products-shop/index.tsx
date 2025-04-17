import BreadcrumbItem from "../../generic/breadcrump-item";
import CardTotal from "./card-total";
import Shopping from "./shopping";

const ProductsShopComponent = () => {
  return (
    <section className="w-[90%] m-auto">
      <BreadcrumbItem pathTitle="Shopping Card" />
      <div className="grid grid-cols-[3fr_1.5fr] my-7 gap-5">
        <Shopping />
        <CardTotal />
      </div>
    </section>
  );
};

export default ProductsShopComponent;
