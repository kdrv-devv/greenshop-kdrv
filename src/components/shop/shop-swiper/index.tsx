import { useState, type FC } from "react";
import { DataType } from "../../../@types";
import { Image, Skeleton } from "antd";
import { useLoader } from "../../../generic/loading";

const ShopSwiper: FC<DataType> = ({ data, isLoading, isError }) => {
  const [imgSrc, setImgSrc] = useState<string>("");
  const { image_loading } = useLoader();
  return (
    <div className="flex items-center gap-5">
      <div className="flex flex-col gap-5 justify-between h-full">
        {isLoading || isError
          ? image_loading()
          : data?.detailed_images.map((value, idx) => (
              <div
                key={idx}
                onClick={() => setImgSrc(value)}
                className="w-[100px] h-[100px] bg-[#e5e5e5] cursor-pointer border-2 hover:border-[#46A358] transition-colors"
              >
                <img className="w-full h-full" src={value} alt="img" />
              </div>
            ))}
      </div>
      <div className="cursor-pointer flex justify-center items-center w-full order-1">
        {isLoading || isError ? (
          <Skeleton.Image className="!w-full !h-[300px]" active />
        ) : (
          <Image
            className="w-full h-full"
            src={imgSrc ? imgSrc : data?.main_image}
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default ShopSwiper;
