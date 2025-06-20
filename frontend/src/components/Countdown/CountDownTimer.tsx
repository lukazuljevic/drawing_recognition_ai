import Countdown from "react-countdown";
import c from "./CountDownTimer.module.css";

export const CountDownTimer = () => {
  return (
    <Countdown
      date={Date.now() + 20000}
      renderer={({ seconds }) => <div className={c.countdown}>{seconds}</div>}
      onComplete={() => console.log("Countdown completed")}
    />
  );
};
