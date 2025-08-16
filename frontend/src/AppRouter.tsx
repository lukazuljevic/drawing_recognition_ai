import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { DrawingPage } from "./pages/DrawingPage";
import { AuthPage } from "./pages/AuthPage";
import { ROUTES } from "./constants/routes";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReloadRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const navEntries = performance.getEntriesByType("navigation");
    const isReload =
      navEntries.length &&
      (navEntries[0] as PerformanceNavigationTiming).type === "reload";

    if (isReload && location.pathname !== "/") {
      navigate(ROUTES.HOMEPAGE);
    }
  }, []);

  return null;
};

export const AppRouter = () => {
  return (
    <Router>
      <ReloadRedirect />
      <Routes>
        <Route path={ROUTES.HOMEPAGE} element={<Homepage />} />
        <Route path={ROUTES.DRAWING} element={<DrawingPage />} />
        <Route path={ROUTES.LOGIN} element={<AuthPage pageType="login" />} />
        <Route
          path={ROUTES.REGISTER}
          element={<AuthPage pageType="register" />}
        />
        <Route path={ROUTES.NOT_FOUND} element={<h1>Page not found</h1>} />
      </Routes>
    </Router>
  );
};
