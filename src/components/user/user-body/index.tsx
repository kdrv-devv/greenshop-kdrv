import { user_body_title } from "../../../utils";
import { Tabs } from "antd";

const UserBody = () => {

  return (
    <div className="py-10">
      <Tabs
        defaultActiveKey="1"
        items={user_body_title.map(({ id, title, Component }) => ({
          label: title,
          key: id,
          children: <Component />,
        }))}
      />
    </div>
  );
};

export default UserBody;
