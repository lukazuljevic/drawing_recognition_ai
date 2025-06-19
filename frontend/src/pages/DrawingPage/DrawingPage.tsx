import { Canvas } from "../../components/Canvas";
import { Header } from "../../components/Header";
import { ReactSketchCanvasRef } from "react-sketch-canvas";
import { useRef } from "react";
import c from "./DrawingPage.module.css";

export const DrawingPage = () => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  return (
    <section className={c.drawingPage}>
      <Header/>
      <Canvas canvasRef={canvasRef} />
    </section>
  );
};
