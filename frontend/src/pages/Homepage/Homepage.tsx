import { useState } from "react";
import c from "./Homepage.module.css";
import { DrawingInfo } from "../../components/DrawingInfo";
import { DrawingPage } from "../DrawingPage";

export const Homepage = () => {
  const [showDrawingInfo, setShowDrawingInfo] = useState<boolean>(true);
  const [showCanvas, setShowCanvas] = useState<boolean>(false);

  return (
    <section className={c.homepage}>
      {showCanvas ? <DrawingPage /> : null}
      {showDrawingInfo ? (
        <DrawingInfo
          setShowCanvas={setShowCanvas}
          setShowDrawingInfo={setShowDrawingInfo}
        />
      ) : null}
    </section>
  );
};
