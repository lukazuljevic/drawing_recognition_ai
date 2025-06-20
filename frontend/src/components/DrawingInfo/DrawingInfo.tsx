import { Labels } from "../../constants/labels";
import c from "./DrawingInfo.module.css";
import { useContext, useEffect, useState } from "react";
import { LabelContext } from "../../contexts/LabelContext";

type DrawingInfoProps = {
  setShowCanvas: (show: boolean) => void;
  setShowDrawingInfo: (show: boolean) => void;
};

export const DrawingInfo = ({
  setShowCanvas,
  setShowDrawingInfo,
}: DrawingInfoProps) => {
  const { updateLabel, label } = useContext(LabelContext);
  const [choosenLabel, setChosenLabel] = useState<string>("");

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 25);

    setChosenLabel(Labels[randomNumber]);
    updateLabel(Labels[randomNumber]);
  }, []);

  const handleStartDrawing = () => {
    setShowCanvas(true);
    setShowDrawingInfo(false);
  };

  return (
    <div className={c.drawingInfo}>
      <h2>Draw the following:</h2>
      <h1>{choosenLabel}</h1>
      <div className={c.buttonContainer}>
        <p>You have 20 seconds, good luck!</p>
        <button className={c.startButton} onClick={handleStartDrawing}>
          Start Drawing
        </button>
      </div>
    </div>
  );
};
