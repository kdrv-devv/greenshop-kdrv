import { Input } from "antd";
import { useSearchParamsHandler } from "../../../generic/searchParams";

const BlogSearch = () => {
  const { Search } = Input;
  const { setParam } = useSearchParamsHandler();
  const onSearch = (e: string) => {
    setParam({ search: e });
  };
  return (
    <div className="w-[70%] m-auto">
      <h1 className="text-center text-[30px] font-[700] my-[30px]">My Feed</h1>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
    </div>
  );
};

export default BlogSearch;
