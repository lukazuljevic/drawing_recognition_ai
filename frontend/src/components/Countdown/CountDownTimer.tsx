import Countdown from "react-countdown";
import c from "./CountDownTimer.module.css";

type CountDownTimerProps = {
  setIsTimeFinished: (value: boolean) => void;
};

export const CountDownTimer = ({ setIsTimeFinished }: CountDownTimerProps) => {
  return (
    <Countdown
      date={Date.now() + 20000}
      renderer={({ seconds }) => <div className={c.countdown}>{seconds}</div>}
      onComplete={() => setIsTimeFinished(true)}
    />
  );
};
