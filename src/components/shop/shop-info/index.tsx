import type { FC } from "react";
import type { DataType } from "../../../@types";
import { Rate, Skeleton } from "antd";
import AvatarItem from "../avatar";
import { HeartOutlined } from "@ant-design/icons";

const ShopInfo: FC<DataType> = ({ data, isLoading, isError }) => {
  const loader = isLoading || isError;
  const size_style =
    "w-[28px] h-[28px] border border-[#EAEAEA] rounded-full hover:border-[#46A358] hover:text-[#46A358] transition-colors font-mediu";

  console.log(data);
  return (
    <section>
      <div className="border-b-2 pb-5  border-[#A6D1AC] flex items-end justify-between">
        {isLoading || isError ? (
          "loading"
        ) : (
          <div className="flex items-center gap-5">
            <AvatarItem created_by={data?.created_by as string} />
            <div>
              <h3 className="text-[#3D3D3D] text-[28px] font-bold">
                {data?.title}
              </h3>
              <p className="font-bold text-[#46A358] text-[22px]">
                ${data?.price}
              </p>
            </div>
          </div>
        )}
        <div>
          <Rate />
          <p>{data?.comments.length} Customer Review</p>
        </div>
      </div>
      <div>
        <h3>Short Description:</h3>
        <p>{data?.short_description}</p>
      </div>
      <h2 className="text-[#3D3D3D] text-[22px]  pt-3 pb-2 font-[500]">
        Size:
      </h2>
      <div className="flex gap-2">
        <button className={`${size_style}`}>S</button>
        <button className={`${size_style}`}>M</button>
        <button className={`${size_style}`}>L</button>
        <button className={`${size_style}`}>XL</button>
      </div>
      <div className="flex items-center gap-3 mt-5">
        <button className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white w-[130px] h-[40px]">
          BUY NOW
        </button>
        <button className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-[#46A358] w-[130px] h-[40px] border border-[#46A358] bg-transparent">
          ADD TO CARD
        </button>
        <button className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base w-[40px] h-[40px] bg-transparent border border-[#46A358] text-[20px] ">
          <HeartOutlined />
        </button>
      </div>
      <div className="text-[#727272;] text-[15px] font-normal my-3">
        <span className="text-[#A5A5A5] pr-2">SKU:</span>
        {loader ? <Skeleton.Input active={true} /> : data?._id}
      </div>
      <div className="text-[#727272;] text-[15px] font-normal my-3">
        <span className="text-[#A5A5A5] pr-2">Categories:</span>
        {loader ? (
          <Skeleton.Input active={true} />
        ) : (
          data?.category.toUpperCase()
        )}
      </div>
      <div className="text-[#727272;] text-[15px] font-normal my-3">
        <span className="text-[#A5A5A5] pr-2">Tags:</span>
        {loader ? <Skeleton.Input active={true} /> : "Home, Garden, Plants "}
      </div>
    </section>
  );
};

export default ShopInfo;
//   dangerouslySetInnerHTML={{ __html: data?.description as string }}
