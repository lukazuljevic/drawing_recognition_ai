import { createContext } from "react";

type LabelContextType = {
  label: string;
  updateLabel: (label: string) => void;
};

export const LabelContext = createContext<LabelContextType>({
  label: "",
  updateLabel: () => {},
});
