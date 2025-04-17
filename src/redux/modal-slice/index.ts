import { createSlice } from "@reduxjs/toolkit";

interface ModalAuthorizationType {
  open: boolean;
  isLoading: boolean;
}
interface OrderModalTtpe {
  open: boolean;
  isLoading: boolean;
}

interface InitialStateType {
  authorizationModalVisiblty: ModalAuthorizationType;
  orderModalVisiblty: OrderModalTtpe;
  orderDetailVisiblty: boolean;
}

const initialState: InitialStateType = {
  authorizationModalVisiblty: {
    open: false,
    isLoading: false,
  },
  orderModalVisiblty: {
    open: false,
    isLoading: false,
  },
  orderDetailVisiblty: false,
};
const modalSlice = createSlice({
  initialState,
  name: "Modal",
  reducers: {
    setAuthorizationModalVisiblty(state, { payload }) {
      state.authorizationModalVisiblty = payload;
    },
    setOrderModalVisiblty(state, { payload }) {
      state.orderModalVisiblty = payload;
    },
    setOrderDetailsVisiblty(state) {
      state.orderDetailVisiblty = !state.orderDetailVisiblty;
    },
  },
});

export const {
  setAuthorizationModalVisiblty,
  setOrderModalVisiblty,
  setOrderDetailsVisiblty,
} = modalSlice.actions;
export default modalSlice.reducer;
