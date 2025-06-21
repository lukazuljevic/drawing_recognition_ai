import c from "./Homepage.module.css";
import { DrawingInfo } from "../../components/DrawingInfo";


export const Homepage = () => {
  return (
    <section className={c.homepage}>
      <DrawingInfo />
    </section>
  );
};
