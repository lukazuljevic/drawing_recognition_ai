import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import c from "./Canvas.module.css";
import { useRef } from "react";

type CanvasProps = {
  setImageBase64: (value: string) => void;
};

const cropImage = (base64: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64;

    img.onload = () => {
      const tempCanvas = document.createElement("canvas");
      const ctx = tempCanvas.getContext("2d", { willReadFrequently: true });

      if (!ctx) {
        reject("Failed to get canvas context");
        return;
      }

      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const { data, width, height } = ctx.getImageData(
        0,
        0,
        img.width,
        img.height
      );

      let top = height,
        bottom = 0,
        left = width,
        right = 0;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];

          if (a > 0 && (r > 0 || g > 0 || b > 0)) {
            if (x < left) left = x;
            if (x > right) right = x;
            if (y < top) top = y;
            if (y > bottom) bottom = y;
          }
        }
      }

      const cropWidth = right - left + 1;
      const cropHeight = bottom - top + 1;

      const finalCanvas = document.createElement("canvas");
      finalCanvas.width = cropWidth;
      finalCanvas.height = cropHeight;
      const finalCtx = finalCanvas.getContext("2d", {
        willReadFrequently: true,
      });

      if (!finalCtx) {
        reject("Failed to get final canvas context");
        return;
      }

      finalCtx.fillStyle = "#000000";
      finalCtx.fillRect(0, 0, cropWidth, cropHeight);

      const croppedImageData = ctx.getImageData(
        left,
        top,
        cropWidth,
        cropHeight
      );
      const croppedPixels = croppedImageData.data;
      const finalImageData = finalCtx.getImageData(0, 0, cropWidth, cropHeight);
      const finalPixels = finalImageData.data;

      for (let y = 0; y < cropHeight; y++) {
        for (let x = 0; x < cropWidth; x++) {
          const idx = (y * cropWidth + x) * 4;
          const [r, g, b, a] = [
            croppedPixels[idx],
            croppedPixels[idx + 1],
            croppedPixels[idx + 2],
            croppedPixels[idx + 3],
          ];

          const finalIdx = idx;

          if (a > 0 && (r > 0 || g > 0 || b > 0)) {
            finalPixels[finalIdx] = 255;
            finalPixels[finalIdx + 1] = 255;
            finalPixels[finalIdx + 2] = 255;
            finalPixels[finalIdx + 3] = 255;
          } else {
            finalPixels[finalIdx] = 0;
            finalPixels[finalIdx + 1] = 0;
            finalPixels[finalIdx + 2] = 0;
            finalPixels[finalIdx + 3] = 255;
          }
        }
      }

      finalCtx.putImageData(finalImageData, 0, 0);
      resolve(finalCanvas.toDataURL("image/png"));
    };
  });
};

export const Canvas = ({ setImageBase64 }: CanvasProps) => {
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);

  const handleChange = async () => {
    const base64 = await canvasRef.current?.exportImage("png");
    if (!base64) return;

    const croppedBase64 = await cropImage(base64);
    setImageBase64(croppedBase64);
  };

  return (
    <div className={c.canvasContainer}>
      <ReactSketchCanvas
        ref={canvasRef}
        strokeWidth={3}
        strokeColor="white"
        canvasColor="black"
        onChange={handleChange}
      />
    </div>
  );
};
