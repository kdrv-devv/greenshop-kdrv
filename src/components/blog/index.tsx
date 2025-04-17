import { useIsAuthenticated } from "react-auth-kit";
import type { BlogTypeApi } from "../../@types";
import { useLoader } from "../../generic/loading";
import { useQueryHandler } from "../../hooks/useQuery";
import BlogCard from "./blog-card";
import BlogHeader from "./blog-header";
import BlogSearch from "./blog-search";
import { useSearchParamsHandler } from "../../generic/searchParams";

const BlogComponent = () => {
  const { getParam } = useSearchParamsHandler();
  const { data, isError, isLoading }: BlogTypeApi = useQueryHandler({
    pathname: `blog?search=${getParam("search")}`,
    url: "/user/blog",
    params: {
      search: getParam("search") || "",
    },
  });
  const { blog_card_loading } = useLoader();
  const isAuth: boolean = useIsAuthenticated()();

  return (
    <section className="w-[90%] m-auto">
      {isAuth ? <BlogSearch /> : <BlogHeader />}

      <div className="grid grid-cols-3 gap-5 my-10">
        {isLoading || isError
          ? blog_card_loading()
          : data?.map((value) => <BlogCard key={value._id} {...value} />)}
      </div>
    </section>
  );
};

export default BlogComponent;
