import { useQuery } from "react-query";
import { useAxios } from "../useAxios";

interface UserQueryType {
  pathname: string;
  url: string;
  params?: object;
}
const useQueryHandler = ({ pathname, url, params }: UserQueryType) => {
  const axios = useAxios();
  return useQuery([pathname], {
    queryFn: () => axios({ url, params }).then((data) => data),
  });
};

export { useQueryHandler };
