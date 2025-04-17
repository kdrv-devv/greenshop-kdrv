import { FC, useState } from "react";
import { DataType } from "../../../@types";

const ShopDescription: FC<DataType> = ({ data }) => {
  const [state, setState] = useState<boolean>(true);

  return (
    <div>
      <div className="border-b-2 border-[#46A358] mt-20 flex gap-5 pb-5 ">
        <h3
          onClick={() => setState(true)}
          className={`text-[18px] cursor-pointer ${state && "text-[#46A358]"}`}
        >
          Product Description
        </h3>
        <h3
          onClick={() => setState(false)}
          className={`text-[18px] cursor-pointer ${!state && "text-[#46A358]"}`}
        >
          Reviews (0)
        </h3>
      </div>
      <div>
        {state ? (
          <div
            dangerouslySetInnerHTML={{ __html: data?.description as string }}
          ></div>
        ) : (
          <div>Reviews</div>
        )}
      </div>
    </div>
  );
};

export default ShopDescription;
