import { Labels } from "../../constants/labels";
import c from "./DrawingInfo.module.css";

export const DrawingInfo = () => {
  const randomNumber = Math.floor(Math.random() * 25);

  return (
    <div className={c.drawingInfo}>
      <h2>Draw the following:</h2>
      <h1>{Labels[randomNumber]}</h1>
      <div className={c.buttonContainer}>
        <p>You have 20 seconds, good luck!</p>
        <button className={c.startButton}>Start Drawing</button>
      </div>
    </div>
  );
};
