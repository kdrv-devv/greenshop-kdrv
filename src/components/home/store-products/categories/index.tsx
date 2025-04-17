import { CategoryType } from "../../../../@types";
import { useLoader } from "../../../../generic/loading";
import { useQueryHandler } from "../../../../hooks/useQuery";
import CategoriesItem from "./categories-item";
import Discount from "./discount";
import PriceParam from "./price";

const Categories = () => {
  const {
    data,
    isLoading,
    isError,
  }: { isLoading: boolean; isError: boolean; data?: CategoryType[] } =
    useQueryHandler({
      pathname: "categories",
      url: "/flower/category",
    });
  const { category_loader } = useLoader();
  return (
    <div className="w-[350px] max-[861px]:w-full bg-[#f5f5f5]">
      <div className="p-4">
        <h2 className="text-[#3D3D3D] font-bold text-[18px]">Categories</h2>
        {isLoading || isError
          ? category_loader()
          : data?.map((value: CategoryType) => (
              <CategoriesItem key={value._id} {...value} />
            ))}

        <PriceParam />
      </div>
      <Discount />
    </div>
  );
};

export default Categories;
