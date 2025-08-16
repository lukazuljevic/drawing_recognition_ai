import toast from "react-hot-toast";
import { LOGIN_PATH } from "../../constants/paths";
import { api } from "../base";
import { useMutation } from "react-query";

type LoginDto = {
  username: string;
  password: string;
};

type JwtResponseDto = {
  accessToken: string;
};

const loginUser = async ({ username, password }: LoginDto) => {
  return api.post<LoginDto, JwtResponseDto>(LOGIN_PATH, {
    username,
    password,
  });
};

export const useUserLogin = (navigate: () => void) => {
  return useMutation(["login"], loginUser, {
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      navigate();
    },
    onError: (error: string) => {
      toast.error("Incorrect username or password");
      console.error("Login error:", error);
    },
  });
};
