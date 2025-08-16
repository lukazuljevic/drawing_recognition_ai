import toast from "react-hot-toast";
import { REGISTER_PATH } from "../../constants/paths";
import { api } from "../base";
import { useMutation } from "react-query";

type RegisterDto = {
  username: string;
  password: string;
};

type RegisterResponseDto = {
  access_token: string;
};

const registerUser = async ({ username, password }: RegisterDto) => {
  return api.post<RegisterDto, RegisterResponseDto>(REGISTER_PATH, {
    username,
    password,
  });
};

export const useUserRegister = (navigate: () => void) => {
  return useMutation(["register"], registerUser, {
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      localStorage.setItem("accessToken", data.access_token);
      navigate();
    },
    onError: (error: string) => {
      toast.error("Registration failed");
      console.error("Register error:", error);
    },
  });
};
