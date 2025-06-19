import { Canvas } from "../../components/Canvas";
import { useRef } from "react";
import c from "./Homepage.module.css";
import { Header } from "../../components/Header";
import { ReactSketchCanvasRef } from "react-sketch-canvas";
import { DrawingInfo } from "../../components/DrawingInfo";

export const Homepage = () => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  return (
    <section className={c.homepage}>
      {/* <Header canvasRef={canvasRef} /> */}
      {/* <Canvas canvasRef={canvasRef} /> */}
      <DrawingInfo />
    </section>
  );
};
