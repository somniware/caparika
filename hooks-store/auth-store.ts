import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    LOGIN: (_curState: object, payload: string) => ({
      isAuth: true,
      token: payload,
    }),
    LOGOUT: (_curState: object) => {
      localStorage.removeItem("token");
      localStorage.removeItem("expiryDate");
      localStorage.removeItem("userId");
      return { isAuth: false, token: null };
    },
  };

  initStore(actions, { isAuth: false, token: null });
};

export default configureStore;
