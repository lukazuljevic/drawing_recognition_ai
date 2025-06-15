import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import c from "./Canvas.module.css";
import { RefObject } from "react";

type CanvasProps = {
  canvasRef?: RefObject<ReactSketchCanvasRef | null>;
};

export const Canvas = ({ canvasRef }: CanvasProps) => {
  const handleSubmitClick = () => {
    canvasRef?.current?.exportImage("png").then((data) => {
      console.log("Exported Image Data:", data);
    });
  };
  return (
    <div className={c.canvasContainer}>
      <ReactSketchCanvas ref={canvasRef} strokeWidth={3} strokeColor="black" />

      <div onClick={handleSubmitClick}>Submit</div>
    </div>
  );
};
