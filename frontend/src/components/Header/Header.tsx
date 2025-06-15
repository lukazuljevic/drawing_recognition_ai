import { ReactSketchCanvasRef } from "react-sketch-canvas";
import c from "./Header.module.css";
import { RefObject } from "react";

type HeaderProps = {
  canvasRef?: RefObject<ReactSketchCanvasRef | null>;
};

export const Header = ({ canvasRef }: HeaderProps) => {
  const handleResetCanvas = () => {
    canvasRef?.current?.resetCanvas();
  };

  return (
    <header className={c.header}>
      <h1>Welcome to the Sketch App</h1>
      <div onClick={handleResetCanvas}>Eraser</div>
    </header>
  );
};
