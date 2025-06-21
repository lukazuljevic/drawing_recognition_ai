import Countdown from "react-countdown";
import c from "./CountDownTimer.module.css";

type CountDownTimerProps = {
  setIsTimeFinished: (value: boolean) => void;
  initialDate: number;
};

export const CountDownTimer = ({
  setIsTimeFinished,
  initialDate,
}: CountDownTimerProps) => {
  return (
    <Countdown
      date={initialDate}
      renderer={({ seconds }) => <div className={c.countdown}>{seconds}</div>}
      onComplete={() => setIsTimeFinished(true)}
    />
  );
};
