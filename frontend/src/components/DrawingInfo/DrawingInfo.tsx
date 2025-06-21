import { Labels } from "../../constants/labels";
import c from "./DrawingInfo.module.css";
import { useContext, useEffect, useState } from "react";
import { LabelContext } from "../../contexts/LabelContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export const DrawingInfo = () => {
  const { updateLabel, label } = useContext(LabelContext);
  const [choosenLabel, setChosenLabel] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 25);

    setChosenLabel(Labels[randomNumber]);
    updateLabel(Labels[randomNumber]);
  }, []);

  return (
    <div className={c.drawingInfo}>
      <h2>Draw the following:</h2>
      <h1>{choosenLabel}</h1>
      <div className={c.buttonContainer}>
        <p>You have 20 seconds, good luck!</p>
        <button
          className={c.startButton}
          onClick={() => navigate(ROUTES.DRAWING)}
        >
          Start Drawing
        </button>
      </div>
    </div>
  );
};
