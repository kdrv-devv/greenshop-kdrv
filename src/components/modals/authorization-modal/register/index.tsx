import { Form, Input } from "antd";
import type { RegisterType } from "../../../../@types";
import googleSvg from "../../../../assets/icons/google.svg";
import facebookSvg from "../../../../assets/icons/facebook.svg";
import { LoadingOutlined } from "@ant-design/icons";
import { useReduxDispatch, useReduxSelctor } from "../../../../hooks/useRedux";
import { notificationApi } from "../../../../generic/notification";
import {
  useRegisterMutate,
  useRegisterWithGoogle,
} from "../../../../hooks/useQuery/useQueryAction";
import { setAuthorizationModalVisiblty } from "../../../../redux/modal-slice";

const Register = () => {
  const { authorizationModalVisiblty } = useReduxSelctor(
    (state) => state.modalSlice
  );
  const notify = notificationApi();
  const { mutate } = useRegisterMutate();
  const dispatch = useReduxDispatch();
  const icon_style: string =
    "border h-[40px] rounded-md flex items-center justify-center gap-3 mb-4 cursor-pointer";
  const onFinish = (e: RegisterType) => {
    if (e.confirm_password !== e.password) return notify("passowrd");
    dispatch(setAuthorizationModalVisiblty({ open: true, isLoading: true }));
    const { name, surname, password, email } = e;
    mutate({
      data: {
        name,
        surname,
        password,
        email,
      },
    });
  };
  const { mutate: registerWithGoogle } = useRegisterWithGoogle();
  return (
    <div className="mt-2">
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<RegisterType>
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            className="border-[#eaeaea] h-[40px] hover:border-[#46A358] focus:border-[#46A358]"
            placeholder="Name"
          />
        </Form.Item>
        <Form.Item<RegisterType>
          name="surname"
          rules={[{ required: true, message: "Please input your surname!" }]}
        >
          <Input
            className="border-[#eaeaea] h-[40px] hover:border-[#46A358] focus:border-[#46A358]"
            placeholder="Surname"
          />
        </Form.Item>
        <Form.Item<RegisterType>
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            className="border-[#eaeaea] h-[40px] hover:border-[#46A358] focus:border-[#46A358]"
            placeholder="Enter your email adress"
          />
        </Form.Item>
        <Form.Item<RegisterType>
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            className="border-[#eaeaea] h-[40px] hover:border-[#46A358] focus:border-[#46A358]"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item<RegisterType>
          name="confirm_password"
          rules={[
            { required: true, message: "Please input your confirm password!" },
          ]}
        >
          <Input.Password
            className="border-[#eaeaea] h-[40px] hover:border-[#46A358] focus:border-[#46A358]"
            placeholder="Confirm password"
          />
        </Form.Item>

        <p className="text-end text-[#46a358] text-[15px]">Forgot Password? </p>
        <button
          disabled={authorizationModalVisiblty.isLoading}
          className={`bg-[#46a358] w-full h-[40px] rounded-md text-white mt-5 text-[18px] ${
            authorizationModalVisiblty.isLoading ? "opacity-75" : "opacity-100"
          }`}
          type="submit"
        >
          {authorizationModalVisiblty.isLoading ? (
            <LoadingOutlined />
          ) : (
            "Register"
          )}
        </button>
      </Form>
      <div className="flex items-center justify-center mt-5 mb-5 gap-4">
        <div className="w-[30%] h-[2px] bg-[#EAEAEA]"></div>
        <p className="w-[40%]text-[#3D3D3D] text-[13px]">Or Register with</p>
        <div className="w-[30%] h-[2px] bg-[#EAEAEA]"></div>
      </div>
      <div onClick={() => registerWithGoogle()} className={icon_style}>
        <img src={googleSvg} alt="" />
        Register with Google
      </div>
      <div className={icon_style}>
        <img src={facebookSvg} alt="" />
        Register with Facebook
      </div>
    </div>
  );
};

export default Register;
