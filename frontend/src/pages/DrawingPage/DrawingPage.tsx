import { Canvas } from "../../components/Canvas";
import { useState } from "react";
import c from "./DrawingPage.module.css";
import { CountDownTimer } from "../../components/Countdown";

export const DrawingPage = () => {
  const [previousLabel, setPreviousLabel] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string>("");

  return (
    <section className={c.drawingPage}>
      <CountDownTimer />
      <Canvas setImageBase64={setImageBase64} />
    </section>
  );
};
