import { Avatar, Tooltip } from "antd";
import { useQueryHandler } from "../../../hooks/useQuery";

const AvatarItem = ({ created_by }: { created_by: string }) => {
  const { data } = useQueryHandler({
    pathname: "user",
    url: `/user/by_id/${created_by}`,
  });
  return (
    <Tooltip
      title={`${data?.name} ${data?.surname}`}
      className="cursor-pointer"
    >
      <Avatar src={data?.profile_photo} className="!w-[60px] !h-[60px]" />
    </Tooltip>
  );
};

export default AvatarItem;
