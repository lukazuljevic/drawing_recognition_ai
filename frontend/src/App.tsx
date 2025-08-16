import { Toaster } from "react-hot-toast";
import "./App.css";
import { AppRouter } from "./AppRouter";
import { LabelProvider } from "./contexts/LabelProvider";

function App() {
  return (
    <LabelProvider>
      <AppRouter />
      <Toaster />
    </LabelProvider>
  );
}

export default App;
