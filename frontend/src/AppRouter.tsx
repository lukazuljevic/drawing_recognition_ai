import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { ROUTES } from "./constants/routes";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOMEPAGE} element={<Homepage />} />
        <Route path={ROUTES.NOT_FOUND} element={<h1>Page not found</h1>} />
      </Routes>
    </Router>
  );
};
