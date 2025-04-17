import { useReduxSelctor } from "../../hooks/useRedux";
import AuthorizartionModal from "./authorization-modal";
import OrderDetail from "./order-details";

const Modals = () => {
  const { orderDetailVisiblty, authorizationModalVisiblty } = useReduxSelctor(
    (state) => state.modalSlice
  );
  return (
    <>
      {authorizationModalVisiblty.open && <AuthorizartionModal />}
      {orderDetailVisiblty && <OrderDetail />}
    </>
  );
};

export default Modals;
