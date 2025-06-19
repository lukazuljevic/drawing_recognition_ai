import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import c from "./Canvas.module.css";
import { RefObject } from "react";

type CanvasProps = {
  canvasRef?: RefObject<ReactSketchCanvasRef | null>;
};

const cropImage = (base64: string) => {
  const img = new Image();
  img.src = base64;

  img.onload = () => {
    const tempCanvas = document.createElement("canvas");
    const ctx = tempCanvas.getContext("2d", { willReadFrequently: true });

    if (!ctx) {
      console.error("Failed to get canvas context");
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
        const r = data[i],
          g = data[i + 1],
          b = data[i + 2],
          a = data[i + 3];

        const isDrawn = a > 0 && (r > 0 || g > 0 || b > 0);
        if (isDrawn) {
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
      console.error("Failed to get canvas context");
      return;
    }

    finalCtx.fillStyle = "#000000";
    finalCtx.fillRect(0, 0, cropWidth, cropHeight);

    const croppedImageData = ctx.getImageData(left, top, cropWidth, cropHeight);
    const croppedPixels = croppedImageData.data;

    const finalImageData = finalCtx.getImageData(0, 0, cropWidth, cropHeight);
    const finalPixels = finalImageData.data;

    for (let y = 0; y < cropHeight; y++) {
      for (let x = 0; x < cropWidth; x++) {
        const croppedIndex = (y * cropWidth + x) * 4;
        const r = croppedPixels[croppedIndex];
        const g = croppedPixels[croppedIndex + 1];
        const b = croppedPixels[croppedIndex + 2];
        const a = croppedPixels[croppedIndex + 3];

        const finalX = x + 1;
        const finalY = y + 1;
        const finalIndex = (finalY * cropWidth + finalX) * 4;

        if (a > 0 && (r > 0 || g > 0 || b > 0)) {
          finalPixels[finalIndex] = 255;
          finalPixels[finalIndex + 1] = 255;
          finalPixels[finalIndex + 2] = 255;
          finalPixels[finalIndex + 3] = 255;
        } else {
          finalPixels[finalIndex] = 0;
          finalPixels[finalIndex + 1] = 0;
          finalPixels[finalIndex + 2] = 0;
          finalPixels[finalIndex + 3] = 255;
        }
      }
    }

    finalCtx.putImageData(finalImageData, 0, 0);

    const finalCroppedImg = new Image();
    finalCroppedImg.src = finalCanvas.toDataURL("image/png");

    console.log("Final Cropped image data:", finalCroppedImg.src);
  };
};

export const Canvas = ({ canvasRef }: CanvasProps) => {
  const handleSubmitClick = () => {
    canvasRef?.current?.exportImage("png").then((base64) => {
      cropImage(base64);
    });
  };

  return (
    <div className={c.canvasContainer}>
      <ReactSketchCanvas
        ref={canvasRef}
        strokeWidth={3}
        strokeColor="#FFFFFF"
        canvasColor="#000000"
      />
      <div onClick={handleSubmitClick}>Submit</div>
    </div>
  );
};
