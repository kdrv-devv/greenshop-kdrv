import { Modal } from "antd";
import { useReduxDispatch, useReduxSelctor } from "../../../hooks/useRedux";
import { setAuthorizationModalVisiblty } from "../../../redux/modal-slice";
import Login from "./login";
import Register from "./register";
import { useState } from "react";

const AuthorizartionModal = () => {
  const { authorizationModalVisiblty } = useReduxSelctor(
    (state) => state.modalSlice
  );
  const dispatch = useReduxDispatch();
  const [login, setLogin] = useState<boolean>(true);
  return (
    <Modal
      open={authorizationModalVisiblty.open}
      onCancel={() =>
        dispatch(
          setAuthorizationModalVisiblty({ open: false, isLoading: false })
        )
      }
      footer={false}
    >
      <div className="flex items-center justify-center gap-7 mt-7 ">
        <h3
          onClick={() => setLogin(true)}
          className={`text-[20px] font-medium cursor-pointer ${
            login && "text-[#46a358]"
          }`}
        >
          Login
        </h3>
        <div className="w-[1px] h-[20px] bg-[#000]"></div>
        <h3
          onClick={() => setLogin(false)}
          className={`text-[20px] font-medium cursor-pointer ${
            !login && "text-[#46a358]"
          }`}
        >
          Register
        </h3>
      </div>
      <div className="w-[90%] m-auto mt-5">
        <p>Enter your username and password to login.</p>
        {login ? <Login /> : <Register />}
      </div>
    </Modal>
  );
};

export default AuthorizartionModal;
