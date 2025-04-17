import { Select } from "antd";
import { title_category } from "../../../../../utils";
import { useSearchParamsHandler } from "../../../../../generic/searchParams";

const ProductsTitle = () => {
  const { setParam, getParam } = useSearchParamsHandler();
  const typeParam: string = getParam("type") || "all-plants";
  const categoryPath: string = getParam("category") || "house-plants";
  const typePrice: string = getParam("sort") || "default-sorting";
  const range_min: number = Number(getParam("range_min")) || 0;
  const range_max: number = Number(getParam("range_max")) || 1000;
  const setSelectValueParam = (e: string) => {
    setParam({
      category: categoryPath,
      type: typeParam,
      sort: e,
      range_min,
      range_max,
    });
  };
  const setTitle = (type: string) => {
    setParam({
      category: categoryPath,
      type,
    });
  };
  return (
    <div className="flex category-titel items-center justify-between max-[380px]:!flex-col">
      <div className="flex items-center gap-4 max-[517px]:grid max-[517px]:grid-cols-1">
        {title_category.map((value) => (
          <h3
            key={value.id}
            onClick={() => setTitle(value.label)}
            className={`cursor-pointer ${
              value.label === typeParam &&
              "text-[#45A358] font-semibold underline"
            }`}
          >
            {value.title}
          </h3>
        ))}
      </div>
      <div className="flex items-center gap-6 max-[1018px]:gap-2">
        <p>Sort By:</p>
        <Select
          defaultValue={typePrice}
          onChange={(e) => setSelectValueParam(e)}
          options={[
            { value: "default-sorting", label: "Default Sorting" },
            { value: "the-cheapest", label: "The Chepaest" },
            { value: "most-expensive", label: "Most Expensive" },
          ]}
        />
      </div>
    </div>
  );
};

export default ProductsTitle;
