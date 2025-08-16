import c from "./Homepage.module.css";
import { DrawingInfo } from "../../components/DrawingInfo";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) navigate(ROUTES.LOGIN);
  }, []);

  return (
    <section className={c.homepage}>
      <DrawingInfo />
    </section>
  );
};
