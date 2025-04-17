import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "../../useAxios";
import { useDispatch } from "react-redux";
import {
  setAuthorizationModalVisiblty,
  setOrderDetailsVisiblty,
  setOrderModalVisiblty,
} from "../../../redux/modal-slice";
import { notificationApi } from "../../../generic/notification";
import { signInWithGoogle } from "../../../config";
import { useReduxDispatch } from "../../useRedux";
import { AuthUser, CouponType, OrderType } from "../../../@types";
import { setCoupon, setIsLoading } from "../../../redux/coupon-slice";
import { useSignIn } from "react-auth-kit";
import { useHandler } from "../../../generic/handler";

const useLoginMutate = () => {
  const dispatch = useDispatch();
  const axios = useAxios();
  const notify = notificationApi();
  const sigIn = useSignIn();
  return useMutation({
    mutationFn: ({ data }: { data: object }) =>
      axios({ url: "/user/sign-in", body: data, method: "POST" }),
    onSuccess: (data: { token: string; user: AuthUser }): void => {
      const { token, user } = data;
      sigIn({
        token,
        tokenType: "Bearer",
        expiresIn: 3600,
        authState: user,
      });
      dispatch(
        setAuthorizationModalVisiblty({ open: false, isLoading: false })
      );
      localStorage.setItem("token", token);

      notify("login");
    },
    onError: (error: { status: number }) => {
      if (error.status === 409) notify(409);
      dispatch(setAuthorizationModalVisiblty({ open: true, isLoading: false }));
    },
  });
};

const useLoginWithGoogle = () => {
  const axios = useAxios();
  const dispatch = useDispatch();
  const notify = notificationApi();
  const signIn = useSignIn();
  return useMutation({
    mutationFn: async () => {
      const response = await signInWithGoogle();
      return await axios({
        url: "/user/sign-in/google",
        method: "POST",
        body: { email: response.user.email },
      });
    },
    onSuccess: ({ data }: { data: { token: string; user: AuthUser } }) => {
      const { token, user } = data;
      signIn({
        token,
        tokenType: "Bearer",
        expiresIn: 3600,
        authState: user,
      });
      localStorage.setItem("token", token);
      dispatch(
        setAuthorizationModalVisiblty({ open: false, isLoading: false })
      );
      notify("login");
    },
    onError: (error: { status: number }) => {
      if (error.status === 409) notify(409);
      dispatch(setAuthorizationModalVisiblty({ open: true, isLoading: false }));
    },
  });
};

const useRegisterMutate = () => {
  const axios = useAxios();
  const dispatch = useReduxDispatch();
  const notify = notificationApi();
  const signIn = useSignIn();

  return useMutation({
    mutationFn: ({ data }: { data: object }) =>
      axios({ url: "/user/sign-up", method: "POST", body: data }),
    onSuccess: (data: { token: string; user: AuthUser }) => {
      console.log(data);
      const { token, user } = data;
      signIn({
        token,
        tokenType: "Bearer",
        expiresIn: 3600,
        authState: user,
      });
      localStorage.setItem("token", token);
      dispatch(
        setAuthorizationModalVisiblty({ open: false, isLoading: false })
      );
      notify("register");
    },
    onError: (error: { status: number }) => {
      if (error.status === 406) notify(406);
      dispatch(setAuthorizationModalVisiblty({ open: true, isLoading: false }));
    },
  });
};

const useRegisterWithGoogle = () => {
  const axios = useAxios();
  const notify = notificationApi();
  const dispatch = useReduxDispatch();
  const signIn = useSignIn();

  return useMutation({
    mutationFn: async () => {
      const response = await signInWithGoogle();
      return axios({
        url: "/user/sign-up/google",
        method: "POST",
        body: { email: response.user.email },
      });
    },
    onSuccess: ({ data }: { data: { token: string; user: AuthUser } }) => {
      const { token, user } = data;
      signIn({
        token,
        tokenType: "Bearer",
        expiresIn: 3600,
        authState: user,
      });
      localStorage.setItem("token", token);
      dispatch(
        setAuthorizationModalVisiblty({ open: false, isLoading: false })
      );
      notify("register");
      dispatch(
        setAuthorizationModalVisiblty({ open: false, isLoading: false })
      );
    },
    onError: (error) => {
      setAuthorizationModalVisiblty({ open: true, isLoading: false });
      notify(406);
      console.log(error);
    },
  });
};

const useGetCoupon = () => {
  const axios = useAxios();
  const notify = notificationApi();
  const dispatch = useReduxDispatch();
  return useMutation({
    mutationFn: (data: object) => {
      dispatch(setIsLoading(true));
      return axios({
        url: "/features/coupon",
        params: data,
      });
    },
    onSuccess: (data: CouponType) => {
      notify("succses_coupon");
      dispatch(setIsLoading(false));
      dispatch(setCoupon(data.discount_for));
    },
    onError: () => {
      notify("coupon_404");
      dispatch(setIsLoading(false));
    },
  });
};

const useMakeOrderQuery = () => {
  const axios = useAxios();
  const dispatch = useReduxDispatch();
  return useMutation({
    mutationFn: (data: object) => {
      dispatch(setOrderModalVisiblty({ open: false, isLoading: true }));
      return axios({
        url: "/order/make-order",
        method: "POST",
        body: { ...data },
      });
    },
    onSuccess: () => {
      dispatch(setOrderModalVisiblty({ open: true, isLoading: false }));
    },
  });
};

const useDeleteOrderForCashe = () => {
  const queryClient = useQueryClient();
  return ({ _id }: { _id: string }) => {
    queryClient.setQueryData("order", (oldData: OrderType[] | undefined) => {
      if (oldData) {
        return oldData.filter((value: OrderType) => value._id !== _id);
      } else {
        return [];
      }
    });
  };
};

const useDeleteOrderMutate = () => {
  const axios = useAxios();
  const dispatch = useReduxDispatch();
  const deleteCashe = useDeleteOrderForCashe();
  const notify = notificationApi();
  return useMutation({
    mutationFn: ({ _id }: { _id: string }) => {
      dispatch(setOrderDetailsVisiblty());
      deleteCashe({ _id });
      return axios({
        url: "/order/delete-order",
        method: "DELETE",
        body: { _id },
      });
    },
    onSuccess: () => {
      notify("delete");
    },
  });
};

const useFollwerUser = () => {
  const axios = useAxios();
  const notify = notificationApi();
  const { useUpdateFollowerCashe } = useHandler();
  return useMutation({
    mutationFn: (_id: string) => {
      useUpdateFollowerCashe(_id);
      return axios({ url: "/user/follow", method: "POST", body: { _id } }).then(
        () => notify("follow")
      );
    },
  });
};
const useUnFollowerUser = () => {
  const axios = useAxios();
  const notify = notificationApi();
  const { useUpdateUnFollowerCashe } = useHandler();
  return useMutation({
    mutationFn: (_id: string) => {
      useUpdateUnFollowerCashe(_id);
      return axios({
        url: "/user/unfollow",
        method: "POST",
        body: { _id },
      }).then(() => notify("un-follow"));
    },
  });
};
export {
  useDeleteOrderMutate,
  useDeleteOrderForCashe,
  useLoginMutate,
  useLoginWithGoogle,
  useRegisterMutate,
  useRegisterWithGoogle,
  useGetCoupon,
  useMakeOrderQuery,
  useFollwerUser,
  useUnFollowerUser,
};

//https://beckend-n14.onrender.com/api/user/account-details?access_token=64bebc1e2c6d3f056a8c85b7
//https://beckend-n14.onrender.com/api/user/account-details?access_token=64bebc1e2c6d3f056a8c85b7
