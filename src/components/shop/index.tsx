import { useParams } from "react-router-dom";
import { useQueryHandler } from "../../hooks/useQuery";
import type { DataType } from "../../@types";
import ShopSwiper from "./shop-swiper";
import ShopInfo from "./shop-info";
import ShopDescription from "./shop-description";

interface ParamsType {
  category?: string;
  id?: string;
}

const ShopComponent = () => {
  const { category, id }: ParamsType = useParams();
  const { data, isLoading, isError }: DataType = useQueryHandler({
    pathname: "id_card",
    url: `/flower/category/${category}/${id}`,
  });

  return (
    <section className="w-[90%] m-auto">
      <div className="grid grid-cols-2 gap-5">
        <ShopSwiper data={data} isLoading={isLoading} isError={isError} />
        <ShopInfo data={data} isLoading={isLoading} isError={isError} />
      </div>
      <ShopDescription data={data} isLoading={isLoading} isError={isError} />
    </section>
  );
};

export default ShopComponent;
