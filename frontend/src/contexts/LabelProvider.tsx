import { FC, PropsWithChildren, useState } from "react";
import { LabelContext } from "./LabelContext";

export const LabelProvider: FC<PropsWithChildren> = ({ children }) => {
  const [label, setLabel] = useState<string>("");

  const updateLabel = (newLabel: string) => {
    setLabel(newLabel);
  };

  return (
    <LabelContext.Provider
      value={{
        label,
        updateLabel,
      }}
    >
      {children}
    </LabelContext.Provider>
  );
};
