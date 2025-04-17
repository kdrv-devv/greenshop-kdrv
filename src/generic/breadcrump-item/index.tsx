import { Breadcrumb } from "antd";
import type { FC } from "react";
import { Link } from "react-router-dom";

interface BreadcrumbItemType {
  pathTitle: string;
}
const BreadcrumbItem: FC<BreadcrumbItemType> = ({ pathTitle }) => {
  return (
    <Breadcrumb
      className="my-[10px]"
      items={[
        {
          title: <Link to={"/"}>Home</Link>,
        },
        {
          title: pathTitle,
        },
      ]}
    />
  );
};

export default BreadcrumbItem;
