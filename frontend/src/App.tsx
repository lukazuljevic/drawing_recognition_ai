import "./App.css";
import { AppRouter } from "./AppRouter";
import { LabelProvider } from "./contexts/LabelProvider";

function App() {
  return (
    <LabelProvider>
      <AppRouter />
    </LabelProvider>
  );
}

export default App;
