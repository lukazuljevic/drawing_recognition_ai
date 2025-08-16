import { Login, Register } from "../../components/Auth";

type AuthPageProps = {
  pageType: "login" | "register";
};

export const AuthPage = ({ pageType }: AuthPageProps) => {
  return (
    <div>
      <div>{pageType === "login" ? <Login /> : <Register />}</div>
    </div>
  );
};
