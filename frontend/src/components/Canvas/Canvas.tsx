import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import c from "./Canvas.module.css";
import { RefObject } from "react";

type CanvasProps = {
  canvasRef?: RefObject<ReactSketchCanvasRef | null>;
};

export const Canvas = ({ canvasRef }: CanvasProps) => {
  return (
    <div className={c.canvasContainer}>
      <ReactSketchCanvas ref={canvasRef} strokeWidth={3} strokeColor="black" />
    </div>
  );
};
