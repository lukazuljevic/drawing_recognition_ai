import { Canvas } from "../../components/Canvas";
import { useEffect, useState } from "react";
import c from "./DrawingPage.module.css";
import { CountDownTimer } from "../../components/Countdown";
import { useGetPrediction } from "../../api/drawing/useGetPrediction";
import { Guesser } from "../../components/Guesser";

export const DrawingPage = () => {
  const [previousLabel, setPreviousLabel] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string>("");
  const [isTimeFinished, setIsTimeFinished] = useState<boolean>(false);

  const { mutate: getPrediction } = useGetPrediction();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getPrediction(
        {
          imageBase64,
          previousLabel,
        },
        {
          onSuccess: (data) => {
            console.log("Prediction successful:", data);
            setPreviousLabel(data.prediction);
          },
          onError: (error) => {
            console.error("Error fetching prediction:", error);
          },
        }
      );
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className={c.drawingPage}>
      <CountDownTimer setIsTimeFinished={setIsTimeFinished} />
      <Canvas setImageBase64={setImageBase64} />
      <Guesser />
    </section>
  );
};
